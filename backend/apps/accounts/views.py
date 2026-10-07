import secrets

from django.contrib.auth import authenticate, get_user_model, login, logout
from django.middleware.csrf import get_token
from django.utils import timezone
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from datetime import timedelta
from rest_framework import generics, permissions, status
from rest_framework.views import APIView

from apps.common.responses import failure, success
from apps.common.throttling import AuthThrottle
from apps.notifications.services import EmailService

from .models import EmailVerificationToken, PasswordResetToken
from .serializers import (
    EmailVerificationConfirmSerializer,
    LoginSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetRequestSerializer,
    RegisterSerializer,
    UserSerializer,
)

User = get_user_model()
TOKEN_TTL_HOURS = 24


def _issue_token(model, user):
    token = secrets.token_urlsafe(48)
    model.objects.create(
        user=user, token=token, expires_at=timezone.now() + timedelta(hours=TOKEN_TTL_HOURS)
    )
    return token


@method_decorator(ensure_csrf_cookie, name="get")
class CSRFCookieView(APIView):
    """Sets the csrftoken cookie for the SPA before any unsafe requests."""

    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return success(data={"csrfToken": get_token(request)})


class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer
    throttle_classes = [AuthThrottle]
    throttle_scope = "auth"

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        token = _issue_token(EmailVerificationToken, user)
        EmailService.send_email_verification(user, token)

        return success(
            message="Account created. Please check your email to verify your address.",
            data=UserSerializer(user).data,
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AuthThrottle]
    throttle_scope = "auth"

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            request,
            username=serializer.validated_data["email"].strip().lower(),
            password=serializer.validated_data["password"],
        )
        if user is None or not user.is_active:
            return failure(message="Invalid email or password.", status=401)

        login(request, user)  # secure, HttpOnly session cookie
        return success(message="Logged in successfully.", data=UserSerializer(user).data)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        logout(request)
        return success(message="Logged out successfully.")


class MeView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        return success(data=UserSerializer(request.user).data)


class PasswordResetRequestView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AuthThrottle]
    throttle_scope = "auth"

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"].strip().lower()

        user = User.objects.filter(email=email, is_active=True).first()
        if user:
            token = _issue_token(PasswordResetToken, user)
            EmailService.send_password_reset(user, token)

        # Always return the same response to avoid leaking account existence.
        return success(message="If that email exists, a reset link has been sent.")


class PasswordResetConfirmView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AuthThrottle]
    throttle_scope = "auth"

    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        record = PasswordResetToken.objects.filter(
            token=serializer.validated_data["token"]
        ).select_related("user").first()
        if not record or not record.is_valid():
            return failure(message="This reset link is invalid or has expired.", status=400)

        user = record.user
        user.set_password(serializer.validated_data["new_password"])
        user.save(update_fields=["password"])
        record.used_at = timezone.now()
        record.save(update_fields=["used_at"])

        return success(message="Password has been reset. You can now log in.")


class EmailVerificationConfirmView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = EmailVerificationConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        record = EmailVerificationToken.objects.filter(
            token=serializer.validated_data["token"]
        ).select_related("user").first()
        if not record or not record.is_valid():
            return failure(message="This verification link is invalid or has expired.", status=400)

        user = record.user
        user.is_email_verified = True
        user.save(update_fields=["is_email_verified"])
        record.used_at = timezone.now()
        record.save(update_fields=["used_at"])

        return success(message="Email verified successfully.")

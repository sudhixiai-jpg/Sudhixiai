from django.utils import timezone
from rest_framework import permissions
from rest_framework.views import APIView

from apps.common.responses import failure, success
from apps.common.throttling import NewsletterThrottle
from apps.notifications.services import EmailService

from .models import NewsletterSubscriber
from .serializers import NewsletterSubscribeSerializer


class NewsletterSubscribeView(APIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [NewsletterThrottle]
    throttle_scope = "newsletter"

    def post(self, request):
        serializer = NewsletterSubscribeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data["email"]
        source = serializer.validated_data.get("source", "")

        existing = NewsletterSubscriber.objects.filter(email=email).first()
        if existing:
            if existing.status == NewsletterSubscriber.Status.SUBSCRIBED:
                # Duplicate prevention: same safe response, no state change, no error leak.
                return success(message="You're already subscribed.")
            existing.status = NewsletterSubscriber.Status.SUBSCRIBED
            existing.subscribed_at = timezone.now()
            existing.unsubscribed_at = None
            existing.save(update_fields=["status", "subscribed_at", "unsubscribed_at"])
            EmailService.send_newsletter_confirmation(existing)
            return success(message="You're subscribed.")

        subscriber = NewsletterSubscriber.objects.create(email=email, source=source)
        EmailService.send_newsletter_confirmation(subscriber)
        return success(message="You're subscribed.", status=201)


class NewsletterUnsubscribeView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = (request.data.get("email") or "").strip().lower()
        if not email:
            return failure(message="Email is required.", status=400)

        subscriber = NewsletterSubscriber.objects.filter(email=email).first()
        if subscriber and subscriber.status != NewsletterSubscriber.Status.UNSUBSCRIBED:
            subscriber.status = NewsletterSubscriber.Status.UNSUBSCRIBED
            subscriber.unsubscribed_at = timezone.now()
            subscriber.save(update_fields=["status", "unsubscribed_at"])

        # Same safe response whether or not the email was ever subscribed.
        return success(message="You have been unsubscribed.")

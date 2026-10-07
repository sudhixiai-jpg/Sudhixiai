import time

from rest_framework import permissions
from rest_framework.views import APIView

from apps.common.responses import failure, success
from apps.common.throttling import AIThrottle

from .models import AIUsageRecord
from .providers import AIProviderError, get_active_provider
from .serializers import AIChatRequestSerializer, AIEmbedRequestSerializer, AIGenerateRequestSerializer


class BaseAIView(APIView):
    """
    Shared foundation for AI endpoints: authenticated + rate limited by
    design (see spec section 25) even though no vendor is wired in yet.
    Every call, successful or not, is recorded in AIUsageRecord for
    organization-level usage tracking.
    """

    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [AIThrottle]
    throttle_scope = "ai"
    operation = "generate"

    def _record(self, *, status, request_id="", error_code="", latency_ms=0):
        provider = get_active_provider()
        AIUsageRecord.objects.create(
            user=self.request.user,
            provider=getattr(provider, "name", ""),
            model=getattr(provider, "model", ""),
            operation=self.operation,
            request_id=request_id,
            status=status,
            error_code=error_code,
            latency_ms=latency_ms,
        )

    def run(self, fn):
        started = time.monotonic()
        try:
            result = fn()
        except AIProviderError as exc:
            self._record(status="ERROR", error_code=exc.code, latency_ms=int((time.monotonic() - started) * 1000))
            return failure(message=exc.message, errors={"code": exc.code}, status=503)
        self._record(
            status="SUCCESS",
            request_id=result.request_id,
            latency_ms=int((time.monotonic() - started) * 1000),
        )
        return success(data={"text": result.text, "request_id": result.request_id})


class AIGenerateView(BaseAIView):
    operation = "generate"

    def post(self, request):
        serializer = AIGenerateRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        provider = get_active_provider()
        return self.run(lambda: provider.generate(serializer.validated_data["prompt"]))


class AIChatView(BaseAIView):
    operation = "chat"

    def post(self, request):
        serializer = AIChatRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        provider = get_active_provider()
        return self.run(lambda: provider.chat(serializer.validated_data["messages"]))


class AIEmbedView(BaseAIView):
    operation = "embed"

    def post(self, request):
        serializer = AIEmbedRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        provider = get_active_provider()
        return self.run(lambda: provider.embed(serializer.validated_data["text"]))

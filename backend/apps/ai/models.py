from django.conf import settings
from django.db import models

from apps.common.models import UUIDTimeStampedModel
from apps.organizations.models import Organization


class AIProviderConfig(UUIDTimeStampedModel):
    """
    Admin-managed configuration for an AI provider. The actual secret lives
    in an environment variable (see apps.ai.providers) -- this model never
    stores raw API keys, only which provider/model is active and non-secret
    metadata (timeouts, rate limits, feature flags).
    """

    class Provider(models.TextChoices):
        OPENAI = "openai", "OpenAI"
        ANTHROPIC = "anthropic", "Anthropic"
        GOOGLE = "google", "Google"
        LOCAL = "local", "Local"

    provider = models.CharField(max_length=20, choices=Provider.choices)
    model_name = models.CharField(max_length=150)
    is_active = models.BooleanField(default=False)
    timeout_seconds = models.PositiveIntegerField(default=30)
    max_retries = models.PositiveIntegerField(default=2)
    config = models.JSONField(default=dict, blank=True, help_text="Non-secret provider configuration only.")

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["provider", "model_name"], name="unique_provider_model"),
        ]

    def __str__(self):
        return f"{self.provider}:{self.model_name}"


class AIUsageRecord(UUIDTimeStampedModel):
    class Status(models.TextChoices):
        SUCCESS = "SUCCESS", "Success"
        ERROR = "ERROR", "Error"
        TIMEOUT = "TIMEOUT", "Timeout"
        RATE_LIMITED = "RATE_LIMITED", "Rate limited"

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, blank=True)
    provider = models.CharField(max_length=20)
    model = models.CharField(max_length=150)
    operation = models.CharField(max_length=50, help_text="generate | chat | embed | classify | summarize")
    request_id = models.CharField(max_length=64, blank=True)

    input_tokens = models.PositiveIntegerField(default=0)
    output_tokens = models.PositiveIntegerField(default=0)
    total_tokens = models.PositiveIntegerField(default=0)
    latency_ms = models.PositiveIntegerField(default=0)

    status = models.CharField(max_length=20, choices=Status.choices)
    error_code = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["organization", "-created_at"])]

    def __str__(self):
        return f"{self.provider}/{self.model} {self.operation} ({self.status})"

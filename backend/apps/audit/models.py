from django.conf import settings
from django.db import models

from apps.common.models import UUIDTimeStampedModel


class AuditLog(UUIDTimeStampedModel):
    """
    Append-only record of administrative/security-relevant events.
    Never store secrets (API keys, passwords, tokens) in `metadata`.
    """

    actor = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="audit_events"
    )
    action = models.CharField(max_length=100)
    resource_type = models.CharField(max_length=100)
    resource_id = models.CharField(max_length=64, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["resource_type", "resource_id"])]

    def __str__(self):
        return f"{self.action} on {self.resource_type}:{self.resource_id}"

    @classmethod
    def record(cls, *, actor, action, resource_type, resource_id="", metadata=None, ip_address=None):
        return cls.objects.create(
            actor=actor,
            action=action,
            resource_type=resource_type,
            resource_id=str(resource_id),
            metadata=metadata or {},
            ip_address=ip_address,
        )

from django.conf import settings
from django.db import models

from apps.common.models import UUIDTimeStampedModel


class ContactSubmission(UUIDTimeStampedModel):
    class Status(models.TextChoices):
        NEW = "NEW", "New"
        CONTACTED = "CONTACTED", "Contacted"
        QUALIFIED = "QUALIFIED", "Qualified"
        IN_PROGRESS = "IN_PROGRESS", "In progress"
        CLOSED = "CLOSED", "Closed"
        SPAM = "SPAM", "Spam"

    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    company = models.CharField(max_length=200, blank=True)
    service = models.CharField(max_length=150, blank=True)
    project_details = models.TextField()
    source = models.CharField(max_length=100, blank=True, help_text="Page or campaign the lead came from.")

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_leads"
    )
    notes = models.TextField(blank=True)

    # Minimal, privacy-conscious abuse signals only -- never more than needed.
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=300, blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["status", "-created_at"])]

    def __str__(self):
        return f"{self.name} <{self.email}>"

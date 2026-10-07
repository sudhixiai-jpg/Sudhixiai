from django.db import models
from django.utils import timezone

from apps.common.models import UUIDTimeStampedModel


class NewsletterSubscriber(UUIDTimeStampedModel):
    class Status(models.TextChoices):
        SUBSCRIBED = "SUBSCRIBED", "Subscribed"
        UNSUBSCRIBED = "UNSUBSCRIBED", "Unsubscribed"
        BOUNCED = "BOUNCED", "Bounced"

    email = models.EmailField(unique=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.SUBSCRIBED)
    source = models.CharField(max_length=100, blank=True)
    subscribed_at = models.DateTimeField(default=timezone.now)
    unsubscribed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.email

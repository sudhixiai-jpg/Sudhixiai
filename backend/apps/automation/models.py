from django.conf import settings
from django.db import models

from apps.common.models import UUIDTimeStampedModel
from apps.organizations.models import Organization


class AutomationWorkflow(UUIDTimeStampedModel):
    """
    Foundation model only (per spec: no visual workflow engine yet).
    Trigger -> Condition -> AI/Processing -> Action -> Result.
    """

    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        ACTIVE = "ACTIVE", "Active"
        PAUSED = "PAUSED", "Paused"
        ARCHIVED = "ARCHIVED", "Archived"

    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name="workflows")
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name="+")
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    version = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.name} (v{self.version})"


class AutomationTrigger(UUIDTimeStampedModel):
    class TriggerType(models.TextChoices):
        WEBHOOK = "WEBHOOK", "Webhook"
        SCHEDULE = "SCHEDULE", "Schedule"
        EVENT = "EVENT", "Internal event"

    workflow = models.ForeignKey(AutomationWorkflow, on_delete=models.CASCADE, related_name="triggers")
    trigger_type = models.CharField(max_length=20, choices=TriggerType.choices)
    config = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return f"{self.trigger_type} for {self.workflow}"


class AutomationStep(UUIDTimeStampedModel):
    class StepType(models.TextChoices):
        CONDITION = "CONDITION", "Condition"
        AI = "AI", "AI / processing"
        ACTION = "ACTION", "Action"

    workflow = models.ForeignKey(AutomationWorkflow, on_delete=models.CASCADE, related_name="steps")
    step_type = models.CharField(max_length=20, choices=StepType.choices)
    order = models.PositiveIntegerField(default=0)
    config = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"Step {self.order}: {self.step_type}"


class AutomationExecution(UUIDTimeStampedModel):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        RUNNING = "RUNNING", "Running"
        SUCCEEDED = "SUCCEEDED", "Succeeded"
        FAILED = "FAILED", "Failed"

    workflow = models.ForeignKey(AutomationWorkflow, on_delete=models.CASCADE, related_name="executions")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    started_at = models.DateTimeField(null=True, blank=True)
    finished_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True)
    result = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.workflow} - {self.status}"

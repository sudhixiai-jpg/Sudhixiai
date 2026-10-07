import os
import uuid

from django.core.exceptions import ValidationError
from django.db import models
from django.utils import timezone

from apps.common.models import SEOFieldsModel, UUIDTimeStampedModel
from apps.file_storage.storages import private_storage

ALLOWED_RESUME_EXTENSIONS = {".pdf", ".doc", ".docx"}
MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024  # 5MB


def validate_resume_file(f):
    ext = os.path.splitext(f.name)[1].lower()
    if ext not in ALLOWED_RESUME_EXTENSIONS:
        raise ValidationError("Resume must be a PDF or Word document.")
    if f.size > MAX_RESUME_SIZE_BYTES:
        raise ValidationError("Resume must be smaller than 5MB.")


def resume_upload_path(instance, filename):
    ext = os.path.splitext(filename)[1].lower()
    safe_name = f"{uuid.uuid4().hex}{ext}"
    # Private storage location -- never served through a public media URL.
    return f"private/resumes/{safe_name}"


class Job(UUIDTimeStampedModel, SEOFieldsModel):
    class EmploymentType(models.TextChoices):
        FULL_TIME = "FULL_TIME", "Full-time"
        PART_TIME = "PART_TIME", "Part-time"
        CONTRACT = "CONTRACT", "Contract"
        INTERNSHIP = "INTERNSHIP", "Internship"

    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        OPEN = "OPEN", "Open"
        CLOSED = "CLOSED", "Closed"

    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    department = models.CharField(max_length=150, blank=True)
    location = models.CharField(max_length=150, blank=True)
    employment_type = models.CharField(max_length=20, choices=EmploymentType.choices, default=EmploymentType.FULL_TIME)

    description = models.TextField()
    requirements = models.TextField(blank=True)
    responsibilities = models.TextField(blank=True)
    benefits = models.TextField(blank=True)

    status = models.CharField(max_length=10, choices=Status.choices, default=Status.DRAFT)
    published_at = models.DateTimeField(null=True, blank=True)
    closing_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.status == self.Status.OPEN and self.published_at is None:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    @property
    def is_accepting_applications(self):
        if self.status != self.Status.OPEN:
            return False
        if self.closing_date and self.closing_date < timezone.now().date():
            return False
        return True


class JobApplication(UUIDTimeStampedModel):
    class Status(models.TextChoices):
        RECEIVED = "RECEIVED", "Received"
        REVIEWING = "REVIEWING", "Reviewing"
        SHORTLISTED = "SHORTLISTED", "Shortlisted"
        REJECTED = "REJECTED", "Rejected"
        HIRED = "HIRED", "Hired"

    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=32, blank=True)
    resume = models.FileField(
        upload_to=resume_upload_path, storage=private_storage, validators=[validate_resume_file]
    )
    cover_letter = models.TextField(blank=True)
    portfolio_url = models.URLField(blank=True)

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.RECEIVED)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} -> {self.job.title}"

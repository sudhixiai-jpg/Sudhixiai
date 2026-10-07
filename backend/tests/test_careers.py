import io

import pytest
from django.core.files.uploadedfile import SimpleUploadedFile

from apps.careers.models import Job

pytestmark = pytest.mark.django_db


def _resume():
    return SimpleUploadedFile("resume.pdf", b"%PDF-1.4 fake content", content_type="application/pdf")


def test_closed_job_rejects_applications(api_client):
    job = Job.objects.create(title="Closed Role", slug="closed-role", description="desc", status=Job.Status.CLOSED)

    response = api_client.post(
        f"/api/v1/careers/jobs/{job.slug}/apply/",
        {"name": "Applicant", "email": "a@example.com", "resume": _resume()},
        format="multipart",
    )

    assert response.status_code == 404  # queryset for apply only resolves OPEN jobs


def test_open_job_accepts_a_valid_application(api_client):
    job = Job.objects.create(title="Open Role", slug="open-role", description="desc", status=Job.Status.OPEN)

    response = api_client.post(
        f"/api/v1/careers/jobs/{job.slug}/apply/",
        {"name": "Applicant", "email": "a@example.com", "resume": _resume()},
        format="multipart",
    )

    assert response.status_code == 201
    assert job.applications.count() == 1


def test_jobs_list_is_empty_when_no_open_positions(api_client):
    Job.objects.create(title="Draft Role", slug="draft-role", description="desc", status=Job.Status.DRAFT)

    response = api_client.get("/api/v1/careers/jobs/")

    assert response.status_code == 200
    assert response.data["results"] == []

import pytest

from apps.contact.models import ContactSubmission
from apps.newsletter.models import NewsletterSubscriber

pytestmark = pytest.mark.django_db


def test_contact_endpoint_validates_short_messages(api_client):
    response = api_client.post(
        "/api/v1/contact/",
        {"name": "A", "email": "a@example.com", "project_details": "too short"},
    )
    assert response.status_code == 400


def test_contact_endpoint_rejects_honeypot_fill(api_client):
    response = api_client.post(
        "/api/v1/contact/",
        {
            "name": "A",
            "email": "a@example.com",
            "project_details": "This is a sufficiently long project description.",
            "website": "http://spam.example.com",
        },
    )
    assert response.status_code == 400
    assert ContactSubmission.objects.count() == 0


def test_contact_submissions_are_never_publicly_readable(api_client):
    response = api_client.get("/api/v1/contact/submissions/")
    assert response.status_code in (401, 403)


def test_newsletter_prevents_duplicate_active_subscriptions(api_client):
    NewsletterSubscriber.objects.create(email="dup@example.com")

    response = api_client.post("/api/v1/newsletter/subscribe/", {"email": "dup@example.com"})

    assert response.status_code == 200
    assert NewsletterSubscriber.objects.filter(email="dup@example.com").count() == 1

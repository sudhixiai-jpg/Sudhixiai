from django.conf import settings

from .providers import get_email_provider
from .tasks import send_email_task


class EmailService:
    """
    High-level, template-aware email operations used by the rest of the
    codebase. Every call is dispatched to Celery so a slow provider never
    blocks the HTTP request/response cycle.
    """

    @staticmethod
    def _dispatch(to, subject, text_body, html_body=None):
        send_email_task.delay(to=to, subject=subject, text_body=text_body, html_body=html_body)

    @classmethod
    def send_email_verification(cls, user, token: str):
        link = f"{settings.FRONTEND_URL}/verify-email?token={token}"
        cls._dispatch(
            to=[user.email],
            subject="Verify your SUDHIXAI account",
            text_body=f"Confirm your email address: {link}",
        )

    @classmethod
    def send_password_reset(cls, user, token: str):
        link = f"{settings.FRONTEND_URL}/reset-password?token={token}"
        cls._dispatch(
            to=[user.email],
            subject="Reset your SUDHIXAI password",
            text_body=f"Reset your password: {link}\nIf you did not request this, ignore this email.",
        )

    @classmethod
    def send_contact_notification(cls, submission):
        internal_recipient = settings.CONTACT_NOTIFICATION_EMAIL
        if not internal_recipient:
            return
        cls._dispatch(
            to=[internal_recipient],
            subject=f"New contact submission from {submission.name}",
            text_body=(
                f"Name: {submission.name}\nEmail: {submission.email}\n"
                f"Company: {submission.company}\nService: {submission.service}\n\n"
                f"{submission.project_details}"
            ),
        )

    @classmethod
    def send_newsletter_confirmation(cls, subscriber):
        cls._dispatch(
            to=[subscriber.email],
            subject="You're subscribed to SUDHIXAI insights",
            text_body="Thanks for subscribing. You can unsubscribe at any time from any newsletter email.",
        )

    @classmethod
    def send_job_application_notification(cls, application):
        internal_recipient = settings.CONTACT_NOTIFICATION_EMAIL
        if not internal_recipient:
            return
        cls._dispatch(
            to=[internal_recipient],
            subject=f"New application: {application.job.title}",
            text_body=f"{application.name} ({application.email}) applied for {application.job.title}.",
        )

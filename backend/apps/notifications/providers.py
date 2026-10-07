"""
Email provider abstraction.

Business logic (EmailService) never talks to SendGrid/Mailchimp/SES/etc
directly. It calls an EmailProvider interface, and the concrete
implementation is chosen via the EMAIL_PROVIDER environment variable.
"""

from __future__ import annotations

import abc
import logging

from django.conf import settings
from django.core.mail import EmailMultiAlternatives

logger = logging.getLogger("sudhixai.notifications")


class EmailProvider(abc.ABC):
    """Interface every concrete email backend must implement."""

    @abc.abstractmethod
    def send(self, *, to: list[str], subject: str, text_body: str, html_body: str | None = None) -> bool:
        """Send an email. Returns True on success, False on failure. Must never raise."""
        raise NotImplementedError


class DjangoBackendEmailProvider(EmailProvider):
    """
    Default provider: delegates to Django's configured EMAIL_BACKEND.
    In development this is the console backend; in production it can be
    swapped (SMTP, SES, SendGrid's SMTP relay, etc.) purely via settings,
    with no code changes required here.
    """

    def send(self, *, to, subject, text_body, html_body=None) -> bool:
        try:
            message = EmailMultiAlternatives(
                subject=subject,
                body=text_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=to,
            )
            if html_body:
                message.attach_alternative(html_body, "text/html")
            message.send(fail_silently=False)
            return True
        except Exception:  # noqa: BLE001 - a failed notification must never break the request
            logger.exception("Failed to send email to %s", to)
            return False


def get_email_provider() -> EmailProvider:
    """
    Provider factory. EMAIL_PROVIDER selects the implementation; only the
    Django-backend-delegating provider is implemented today, matching the
    project rule against pretending unbuilt integrations exist.
    """
    provider_name = getattr(settings, "EMAIL_PROVIDER", "django") or "django"
    providers = {
        "django": DjangoBackendEmailProvider,
    }
    provider_cls = providers.get(provider_name, DjangoBackendEmailProvider)
    return provider_cls()

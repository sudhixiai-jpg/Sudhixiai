from celery import shared_task


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def send_email_task(self, *, to, subject, text_body, html_body=None):
    """Async email delivery so no HTTP request ever blocks on SMTP/provider latency."""
    from .providers import get_email_provider

    provider = get_email_provider()
    sent = provider.send(to=to, subject=subject, text_body=text_body, html_body=html_body)
    if not sent:
        raise self.retry(exc=RuntimeError(f"Email provider failed to send to {to}"))

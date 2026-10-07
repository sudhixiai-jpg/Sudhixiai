"""
Admin helpers for django-unfold.

- environment_callback  → shows DEV / PROD badge in the sidebar header
- dashboard_callback    → injects stat cards into the admin dashboard template context
"""

from __future__ import annotations

from django.http import HttpRequest
from django.utils.translation import gettext_lazy as _


# ---------------------------------------------------------------------------
# Environment badge
# ---------------------------------------------------------------------------

def environment_callback(request: HttpRequest) -> list[str]:
    """Return [label, css-classes] shown as a badge in the sidebar header."""
    from django.conf import settings
    if settings.DEBUG:
        return [_("Development"), "font-medium text-sky-600 bg-sky-50 border border-sky-200"]
    return [_("Production"), "font-medium text-rose-600 bg-rose-50 border border-rose-200"]


# ---------------------------------------------------------------------------
# Dashboard stat cards
# ---------------------------------------------------------------------------

def dashboard_callback(request: HttpRequest, context: dict) -> dict:
    """
    Inject summary statistics into the admin dashboard context.
    Each card follows the Unfold KPI widget structure.
    """
    # Lazy imports so this helper doesn't break if a model hasn't migrated yet
    try:
        from apps.contact.models import ContactSubmission
        contacts_total = ContactSubmission.objects.count()
        contacts_new = ContactSubmission.objects.filter(status="NEW").count()
    except Exception:
        contacts_total = contacts_new = 0

    try:
        from apps.newsletter.models import NewsletterSubscriber
        subs_total = NewsletterSubscriber.objects.count()
        subs_active = NewsletterSubscriber.objects.filter(status="ACTIVE").count()
    except Exception:
        subs_total = subs_active = 0

    try:
        from apps.insights.models import Insight
        insights_total = Insight.objects.count()
        insights_published = Insight.objects.filter(status="PUBLISHED").count()
    except Exception:
        insights_total = insights_published = 0

    try:
        from apps.products.models import Product
        products_total = Product.objects.count()
        products_active = Product.objects.filter(is_active=True, is_public=True).count()
    except Exception:
        products_total = products_active = 0

    try:
        from apps.services.models import Service
        services_total = Service.objects.count()
        services_active = Service.objects.filter(is_active=True).count()
    except Exception:
        services_total = services_active = 0

    try:
        from apps.accounts.models import User
        users_total = User.objects.count()
        users_active = User.objects.filter(is_active=True).count()
    except Exception:
        users_total = users_active = 0

    context["kpi"] = [
        {
            "title": _("Contact Submissions"),
            "metric": str(contacts_total),
            "footer": f"{contacts_new} unread",
            "icon": "mail",
            "url": "/admin/contact/contactsubmission/",
            "color": "cyan",
        },
        {
            "title": _("Newsletter Subscribers"),
            "metric": str(subs_total),
            "footer": f"{subs_active} active",
            "icon": "rss_feed",
            "url": "/admin/newsletter/newslettersubscriber/",
            "color": "blue",
        },
        {
            "title": _("Published Insights"),
            "metric": str(insights_published),
            "footer": f"{insights_total} total",
            "icon": "article",
            "url": "/admin/insights/insight/",
            "color": "violet",
        },
        {
            "title": _("Active Products"),
            "metric": str(products_active),
            "footer": f"{products_total} total",
            "icon": "inventory_2",
            "url": "/admin/products/product/",
            "color": "green",
        },
        {
            "title": _("Services"),
            "metric": str(services_active),
            "footer": f"{services_total} total",
            "icon": "layers",
            "url": "/admin/services/service/",
            "color": "orange",
        },
        {
            "title": _("Users"),
            "metric": str(users_active),
            "footer": f"{users_total} total",
            "icon": "group",
            "url": "/admin/accounts/user/",
            "color": "pink",
        },
    ]

    return context

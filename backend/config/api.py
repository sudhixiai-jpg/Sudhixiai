"""Aggregates every app's DRF routes under /api/v1/."""

from django.urls import include, path

urlpatterns = [
    path("services/", include("apps.services.urls")),
    path("products/", include("apps.products.urls")),
    path("insights/", include("apps.insights.urls")),
    path("industries/", include("apps.industries.urls")),
    path("technology/", include("apps.technology.urls")),
    path("careers/", include("apps.careers.urls")),
    path("contact/", include("apps.contact.urls")),
    path("newsletter/", include("apps.newsletter.urls")),
    path("auth/", include("apps.accounts.urls")),
    path("organizations/", include("apps.organizations.urls")),
    path("ai/", include("apps.ai.urls")),
    path("company/", include("apps.company.urls")),
]

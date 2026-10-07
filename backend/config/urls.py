from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView


def health_view(request):
    return JsonResponse({"status": "ok"})


def readiness_view(request):
    from django.db import connections
    from django.db.utils import OperationalError

    checks = {"database": "ok", "cache": "ok"}
    try:
        connections["default"].cursor()
    except OperationalError:
        checks["database"] = "error"

    try:
        from django.core.cache import cache
        cache.set("readiness_probe", "1", timeout=5)
    except Exception:
        checks["cache"] = "error"

    healthy = all(v == "ok" for v in checks.values())
    return JsonResponse({"status": "ok" if healthy else "degraded", "checks": checks}, status=200 if healthy else 503)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("config.api")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    path("health/", health_view, name="health"),
    path("ready/", readiness_view, name="ready"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from rest_framework.routers import DefaultRouter
from django.urls import include, path

from .views import ContactSubmissionAdminViewSet, ContactSubmissionCreateView

app_name = "contact"

router = DefaultRouter()
router.register("submissions", ContactSubmissionAdminViewSet, basename="contact-submission")

urlpatterns = [
    path("", ContactSubmissionCreateView.as_view(), name="contact-create"),
    path("", include(router.urls)),
]

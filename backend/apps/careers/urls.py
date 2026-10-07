from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import JobApplicationCreateView, JobViewSet

app_name = "careers"

router = DefaultRouter()
router.register("jobs", JobViewSet, basename="job")

urlpatterns = router.urls + [
    path("jobs/<slug:slug>/apply/", JobApplicationCreateView.as_view(), name="job-apply"),
]

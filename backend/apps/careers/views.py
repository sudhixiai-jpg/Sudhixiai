from django.shortcuts import get_object_or_404
from rest_framework import generics, viewsets
from rest_framework.permissions import AllowAny

from apps.common.pagination import StandardResultsPagination
from apps.common.responses import success
from apps.common.throttling import JobApplicationThrottle
from apps.notifications.services import EmailService

from .models import Job
from .serializers import JobApplicationCreateSerializer, JobDetailSerializer, JobListSerializer


class JobViewSet(viewsets.ReadOnlyModelViewSet):
    """Public API. Returns an empty collection when there are no open roles."""

    queryset = Job.objects.filter(status=Job.Status.OPEN)
    permission_classes = [AllowAny]
    pagination_class = StandardResultsPagination
    lookup_field = "slug"

    def get_serializer_class(self):
        return JobDetailSerializer if self.action == "retrieve" else JobListSerializer


class JobApplicationCreateView(generics.CreateAPIView):
    serializer_class = JobApplicationCreateSerializer
    permission_classes = [AllowAny]
    throttle_classes = [JobApplicationThrottle]
    throttle_scope = "job_application"

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["job"] = get_object_or_404(Job, slug=self.kwargs["slug"], status=Job.Status.OPEN)
        return context

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        job = serializer.context["job"]
        application = serializer.save(job=job)
        EmailService.send_job_application_notification(application)
        return success(message="Your application has been received.", status=201)

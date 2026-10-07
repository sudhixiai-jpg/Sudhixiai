from rest_framework import serializers

from .models import Job, JobApplication


class JobListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ["slug", "title", "department", "location", "employment_type", "published_at"]


class JobDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            "slug", "title", "department", "location", "employment_type",
            "description", "requirements", "responsibilities", "benefits",
            "published_at", "closing_date",
            "seo_title", "seo_description",
        ]


class JobApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ["name", "email", "phone", "resume", "cover_letter", "portfolio_url"]

    def validate(self, attrs):
        job = self.context["job"]
        if not job.is_accepting_applications:
            raise serializers.ValidationError("This position is no longer accepting applications.")
        return attrs

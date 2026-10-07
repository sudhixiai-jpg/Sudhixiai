from django.conf import settings
from rest_framework import serializers

from .models import ContactSubmission


class ContactSubmissionCreateSerializer(serializers.ModelSerializer):
    # Honeypot field: real users never fill this in; bots that autofill every
    # field will trip it. Never rendered/required on the visible form.
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = ContactSubmission
        fields = ["name", "email", "phone", "company", "service", "project_details", "source", "website"]

    def validate_project_details(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("Please share a few more details about your project.")
        if len(value) > settings.CONTACT_MAX_MESSAGE_LENGTH:
            raise serializers.ValidationError("Message is too long.")
        return value

    def validate_website(self, value):
        if value:
            raise serializers.ValidationError("Spam detected.")
        return value

    def validate(self, attrs):
        attrs.pop("website", None)
        return attrs


class ContactSubmissionAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSubmission
        fields = "__all__"
        read_only_fields = ["id", "name", "email", "phone", "company", "service", "project_details",
                             "source", "ip_address", "user_agent", "created_at", "updated_at"]

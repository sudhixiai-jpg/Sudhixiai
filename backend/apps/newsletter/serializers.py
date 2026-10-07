from rest_framework import serializers

from .models import NewsletterSubscriber


class NewsletterSubscribeSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ["email", "source"]
        # The view -- not this serializer -- decides what to do with a
        # duplicate email (re-subscribe / already-subscribed / new), so the
        # auto-generated UniqueValidator on this unique model field must be
        # disabled here, or every duplicate would 400 before that logic runs.
        extra_kwargs = {"email": {"validators": []}}

    def validate_email(self, value):
        return value.strip().lower()

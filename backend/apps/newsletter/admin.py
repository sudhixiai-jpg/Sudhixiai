from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import NewsletterSubscriber


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(UnfoldModelAdmin):
    list_display = ["email", "status", "source", "subscribed_at"]
    list_filter = ["status", "source"]
    search_fields = ["email"]
    compressed_fields = True

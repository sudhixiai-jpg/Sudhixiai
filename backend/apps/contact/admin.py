from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import ContactSubmission


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(UnfoldModelAdmin):
    list_display = ["name", "email", "phone", "company", "service", "status", "created_at"]
    list_filter = ["status", "service"]
    search_fields = ["name", "email", "phone", "company"]
    readonly_fields = [
        "name", "email", "phone", "company", "service", "project_details",
        "source", "ip_address", "user_agent", "created_at", "updated_at",
    ]
    date_hierarchy = "created_at"
    compressed_fields = True

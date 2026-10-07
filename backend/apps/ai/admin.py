from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import AIProviderConfig, AIUsageRecord


@admin.register(AIProviderConfig)
class AIProviderConfigAdmin(UnfoldModelAdmin):
    list_display = ["provider", "model_name", "is_active", "timeout_seconds", "max_retries"]
    list_filter = ["provider", "is_active"]
    # API keys are never stored here (see apps.ai.providers) so there is
    # nothing secret to accidentally expose via this admin.


@admin.register(AIUsageRecord)
class AIUsageRecordAdmin(UnfoldModelAdmin):
    list_display = ["provider", "model", "operation", "status", "organization", "user", "created_at"]
    list_filter = ["provider", "operation", "status"]
    date_hierarchy = "created_at"
    readonly_fields = [f.name for f in AIUsageRecord._meta.fields]

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

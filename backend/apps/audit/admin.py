from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import AuditLog


@admin.register(AuditLog)
class AuditLogAdmin(UnfoldModelAdmin):
    list_display = ["action", "resource_type", "resource_id", "actor", "created_at"]
    list_filter = ["action", "resource_type"]
    search_fields = ["resource_id", "actor__email"]
    date_hierarchy = "created_at"
    readonly_fields = [f.name for f in AuditLog._meta.fields]

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

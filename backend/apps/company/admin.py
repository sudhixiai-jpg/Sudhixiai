from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import SiteConfiguration


@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(UnfoldModelAdmin):
    list_display = ["brand_name", "legal_name", "contact_email", "updated_at"]

    def has_add_permission(self, request):
        # Singleton: block creating a second row once one exists.
        return not SiteConfiguration.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import Industry


@admin.register(Industry)
class IndustryAdmin(UnfoldModelAdmin):
    list_display = ["name", "slug", "is_active", "sort_order"]
    search_fields = ["name"]
    prepopulated_fields = {"slug": ("name",)}

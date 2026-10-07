from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import Technology, TechnologyCategory


@admin.register(TechnologyCategory)
class TechnologyCategoryAdmin(UnfoldModelAdmin):
    list_display = ["name", "slug", "is_active", "sort_order"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Technology)
class TechnologyAdmin(UnfoldModelAdmin):
    list_display = ["name", "slug", "category", "is_active", "sort_order"]
    list_filter = ["category", "is_active"]
    search_fields = ["name"]
    prepopulated_fields = {"slug": ("name",)}

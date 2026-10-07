from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import FAQ, FAQCategory, Service, ServiceCategory


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(UnfoldModelAdmin):
    list_display = ["name", "slug", "is_active", "sort_order"]
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ["name"]
    compressed_fields = True


@admin.register(Service)
class ServiceAdmin(UnfoldModelAdmin):
    list_display = ["title", "slug", "category", "accent", "is_active", "is_featured", "sort_order"]
    list_filter = ["category", "accent", "is_active", "is_featured"]
    search_fields = ["title", "slug", "short_description"]
    prepopulated_fields = {"slug": ("title",)}
    compressed_fields = True


@admin.register(FAQCategory)
class FAQCategoryAdmin(UnfoldModelAdmin):
    list_display = ["name", "slug", "is_active", "sort_order"]
    prepopulated_fields = {"slug": ("name",)}
    compressed_fields = True


@admin.register(FAQ)
class FAQAdmin(UnfoldModelAdmin):
    list_display = ["question", "category", "service", "is_active", "sort_order"]
    list_filter = ["category", "service", "is_active"]
    search_fields = ["question", "answer"]
    compressed_fields = True

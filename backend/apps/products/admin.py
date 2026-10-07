from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import Product, ProductFeature


from unfold.admin import TabularInline

class ProductFeatureInline(TabularInline):
    model = ProductFeature
    extra = 1


@admin.register(Product)
class ProductAdmin(UnfoldModelAdmin):
    list_display = ["name", "slug", "status", "is_active", "is_public", "is_featured", "sort_order"]
    list_filter = ["status", "is_active", "is_public", "is_featured"]
    search_fields = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}
    inlines = [ProductFeatureInline]
    compressed_fields = True
    fieldsets = (
        (None, {"fields": ("name", "slug", "category", "status", "build_tag")}),
        ("Content", {"fields": ("short_description", "description", "hero_content", "image")}),
        ("Links", {"fields": ("website_url", "documentation_url", "cta_label")}),
        ("Visibility", {"fields": ("is_active", "is_public", "is_featured", "sort_order")}),
        ("SEO", {"fields": ("seo_title", "seo_description"), "classes": ("collapse",)}),
    )

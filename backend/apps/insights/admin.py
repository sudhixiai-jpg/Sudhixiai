from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import Insight, InsightAuthor, InsightCategory, InsightTag


@admin.register(InsightCategory)
class InsightCategoryAdmin(UnfoldModelAdmin):
    list_display = ["name", "slug", "sort_order"]
    prepopulated_fields = {"slug": ("name",)}
    compressed_fields = True


@admin.register(InsightTag)
class InsightTagAdmin(UnfoldModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}
    compressed_fields = True


@admin.register(InsightAuthor)
class InsightAuthorAdmin(UnfoldModelAdmin):
    list_display = ["name", "title"]
    prepopulated_fields = {"slug": ("name",)}
    compressed_fields = True


@admin.register(Insight)
class InsightAdmin(UnfoldModelAdmin):
    list_display = ["title", "status", "category", "author", "featured", "published_at"]
    list_filter = ["status", "category", "featured"]
    search_fields = ["title", "excerpt", "content"]
    prepopulated_fields = {"slug": ("title",)}
    date_hierarchy = "published_at"
    filter_horizontal = ["tags"]
    readonly_fields = ["created_at", "updated_at"]
    compressed_fields = True

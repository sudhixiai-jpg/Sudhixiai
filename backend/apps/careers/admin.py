from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import Job, JobApplication


from unfold.admin import StackedInline

class JobApplicationInline(StackedInline):
    model = JobApplication
    extra = 0
    readonly_fields = ["name", "email", "phone", "resume", "cover_letter", "portfolio_url", "created_at"]
    can_delete = False


@admin.register(Job)
class JobAdmin(UnfoldModelAdmin):
    list_display = ["title", "department", "location", "status", "published_at", "closing_date"]
    list_filter = ["status", "department", "employment_type"]
    search_fields = ["title", "department"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [JobApplicationInline]


@admin.register(JobApplication)
class JobApplicationAdmin(UnfoldModelAdmin):
    list_display = ["name", "email", "job", "status", "created_at"]
    list_filter = ["status", "job"]
    search_fields = ["name", "email"]
    readonly_fields = ["name", "email", "phone", "resume", "cover_letter", "portfolio_url", "created_at"]

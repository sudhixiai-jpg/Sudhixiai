from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import Organization, OrganizationMember


from unfold.admin import TabularInline

class OrganizationMemberInline(TabularInline):
    model = OrganizationMember
    extra = 0


@admin.register(Organization)
class OrganizationAdmin(UnfoldModelAdmin):
    list_display = ["name", "slug", "owner", "status", "created_at"]
    list_filter = ["status"]
    search_fields = ["name", "owner__email"]
    inlines = [OrganizationMemberInline]


@admin.register(OrganizationMember)
class OrganizationMemberAdmin(UnfoldModelAdmin):
    list_display = ["organization", "user", "role", "status", "joined_at"]
    list_filter = ["role", "status"]

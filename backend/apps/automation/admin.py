from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from .models import AutomationExecution, AutomationStep, AutomationTrigger, AutomationWorkflow


from unfold.admin import TabularInline

class AutomationTriggerInline(TabularInline):
    model = AutomationTrigger
    extra = 0

class AutomationStepInline(TabularInline):
    model = AutomationStep
    extra = 0


@admin.register(AutomationWorkflow)
class AutomationWorkflowAdmin(UnfoldModelAdmin):
    list_display = ["name", "organization", "status", "version", "owner"]
    list_filter = ["status", "organization"]
    inlines = [AutomationTriggerInline, AutomationStepInline]


@admin.register(AutomationExecution)
class AutomationExecutionAdmin(UnfoldModelAdmin):
    list_display = ["workflow", "status", "started_at", "finished_at"]
    list_filter = ["status"]
    readonly_fields = [f.name for f in AutomationExecution._meta.fields]

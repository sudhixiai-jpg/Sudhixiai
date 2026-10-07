from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from unfold.admin import ModelAdmin as UnfoldModelAdmin
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm

from .models import EmailVerificationToken, PasswordResetToken, User


@admin.register(User)
class UserAdmin(DjangoUserAdmin, UnfoldModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm
    ordering = ["-date_joined"]
    list_display = ["email", "first_name", "last_name", "is_staff", "is_active", "is_email_verified", "date_joined"]
    list_filter = ["is_staff", "is_active", "is_email_verified"]
    search_fields = ["email", "first_name", "last_name"]
    readonly_fields = ["id", "date_joined", "created_at", "updated_at", "last_login"]
    compressed_fields = True
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name")}),
        (
            "Permissions",
            {"fields": ("is_active", "is_staff", "is_superuser", "is_email_verified", "groups", "user_permissions")},
        ),
        ("Important dates", {"fields": ("last_login", "date_joined", "created_at", "updated_at")}),
    )
    add_fieldsets = (
        (None, {"classes": ("wide",), "fields": ("email", "password1", "password2", "is_staff", "is_active")}),
    )


@admin.register(EmailVerificationToken)
class EmailVerificationTokenAdmin(UnfoldModelAdmin):
    list_display = ["user", "created_at", "expires_at", "used_at"]
    readonly_fields = ["token", "created_at"]
    search_fields = ["user__email"]
    compressed_fields = True


@admin.register(PasswordResetToken)
class PasswordResetTokenAdmin(UnfoldModelAdmin):
    list_display = ["user", "created_at", "expires_at", "used_at"]
    readonly_fields = ["token", "created_at"]
    search_fields = ["user__email"]
    compressed_fields = True

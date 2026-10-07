from rest_framework.permissions import BasePermission, SAFE_METHODS


class ReadOnly(BasePermission):
    """Allow only safe (GET/HEAD/OPTIONS) methods."""

    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class IsStaffUser(BasePermission):
    """Restrict access to authenticated staff/admin users (private endpoints)."""

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)


class IsOrganizationMember(BasePermission):
    """
    Object-level permission ensuring a user can only touch resources that belong
    to an organization they are an active member of. Expects the object to expose
    an `organization` attribute (directly or via `.organization_id`).
    """

    def has_object_permission(self, request, view, obj):
        organization = getattr(obj, "organization", None)
        if organization is None:
            return False
        if not request.user or not request.user.is_authenticated:
            return False
        return organization.members.filter(user=request.user, status="ACTIVE").exists()

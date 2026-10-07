"""
Centralized tenant-isolation helpers. Any view touching organization-scoped
data should filter through `organizations_for_user` / `assert_member` rather
than re-implementing membership checks ad hoc -- this is the single place
that guarantees "Organization A user can never access Organization B data".
"""

from rest_framework.exceptions import PermissionDenied

from .models import Organization, OrganizationMember


def organizations_for_user(user):
    return Organization.objects.filter(
        members__user=user, members__status=OrganizationMember.Status.ACTIVE
    )


def assert_member(user, organization, roles=None):
    qs = OrganizationMember.objects.filter(
        organization=organization, user=user, status=OrganizationMember.Status.ACTIVE
    )
    if roles:
        qs = qs.filter(role__in=roles)
    if not qs.exists():
        raise PermissionDenied("You do not have access to this organization.")

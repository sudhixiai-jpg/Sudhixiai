import pytest

from apps.organizations.models import Organization, OrganizationMember

pytestmark = pytest.mark.django_db


def test_user_cannot_access_another_organization(api_client, user, other_user):
    org = Organization.objects.create(name="Org A", slug="org-a", owner=user)
    OrganizationMember.objects.create(organization=org, user=user, role="OWNER", status="ACTIVE")

    api_client.force_authenticate(other_user)
    response = api_client.get(f"/api/v1/organizations/{org.id}/")

    assert response.status_code == 404  # filtered out of the outsider's queryset entirely


def test_creating_an_organization_makes_the_creator_owner(api_client, user):
    api_client.force_authenticate(user)
    response = api_client.post("/api/v1/organizations/", {"name": "New Org", "slug": "new-org"})

    assert response.status_code == 201
    membership = OrganizationMember.objects.get(organization__slug="new-org", user=user)
    assert membership.role == "OWNER"


def test_unauthenticated_user_cannot_list_organizations(api_client):
    response = api_client.get("/api/v1/organizations/")
    assert response.status_code == 401 or response.status_code == 403

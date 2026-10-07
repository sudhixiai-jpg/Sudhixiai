import pytest

from apps.ai.models import AIProviderConfig

pytestmark = pytest.mark.django_db


def test_ai_endpoints_require_authentication(api_client):
    response = api_client.post("/api/v1/ai/generate/", {"prompt": "hello"})
    assert response.status_code in (401, 403)


def test_ai_provider_config_never_stores_a_raw_api_key():
    config = AIProviderConfig.objects.create(provider="openai", model_name="gpt-test", is_active=True)
    field_names = {f.name for f in AIProviderConfig._meta.fields}
    assert "api_key" not in field_names
    assert "config" in field_names  # non-secret metadata only


def test_unauthenticated_admin_apis_are_protected(api_client):
    response = api_client.get("/api/v1/organizations/")
    assert response.status_code in (401, 403)

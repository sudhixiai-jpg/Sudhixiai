import pytest

from apps.insights.models import Insight
from apps.products.models import Product

pytestmark = pytest.mark.django_db


def test_draft_insight_is_not_publicly_visible(api_client):
    Insight.objects.create(slug="draft-post", title="Draft", status=Insight.Status.DRAFT)
    Insight.objects.create(slug="published-post", title="Published", status=Insight.Status.PUBLISHED)

    response = api_client.get("/api/v1/insights/")
    slugs = [item["slug"] for item in response.data["results"]]

    assert "draft-post" not in slugs
    assert "published-post" in slugs


def test_non_public_product_is_hidden_even_if_active(api_client):
    Product.objects.create(name="Internal Tool", slug="internal-tool", is_active=True, is_public=False)
    Product.objects.create(name="Public Tool", slug="public-tool", is_active=True, is_public=True)

    response = api_client.get("/api/v1/products/")
    slugs = [item["slug"] for item in response.data["results"]]

    assert "internal-tool" not in slugs
    assert "public-tool" in slugs

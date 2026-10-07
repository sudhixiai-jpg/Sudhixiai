import pytest
from rest_framework.test import APIClient


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user(django_user_model):
    return django_user_model.objects.create_user(email="member@example.com", password="StrongPass123!")


@pytest.fixture
def other_user(django_user_model):
    return django_user_model.objects.create_user(email="outsider@example.com", password="StrongPass123!")


@pytest.fixture
def staff_user(django_user_model):
    return django_user_model.objects.create_user(
        email="staff@example.com", password="StrongPass123!", is_staff=True
    )

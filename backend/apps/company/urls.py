from django.urls import path

from .views import SiteConfigurationView

app_name = "company"

urlpatterns = [
    path("", SiteConfigurationView.as_view(), name="site-configuration"),
]

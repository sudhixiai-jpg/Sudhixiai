from rest_framework.routers import DefaultRouter

from .views import IndustryViewSet

app_name = "industries"

router = DefaultRouter()
router.register("", IndustryViewSet, basename="industry")

urlpatterns = router.urls

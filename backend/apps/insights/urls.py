from rest_framework.routers import DefaultRouter

from .views import InsightCategoryViewSet, InsightViewSet

app_name = "insights"

router = DefaultRouter()
router.register("categories", InsightCategoryViewSet, basename="insight-category")
router.register("", InsightViewSet, basename="insight")

urlpatterns = router.urls

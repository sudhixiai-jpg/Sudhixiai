from rest_framework.routers import DefaultRouter

from .views import TechnologyCategoryViewSet, TechnologyViewSet

app_name = "technology"

router = DefaultRouter()
router.register("categories", TechnologyCategoryViewSet, basename="technology-category")
router.register("", TechnologyViewSet, basename="technology")

urlpatterns = router.urls

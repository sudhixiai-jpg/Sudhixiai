from rest_framework.routers import DefaultRouter

from .views import FAQViewSet, ServiceCategoryViewSet, ServiceViewSet

app_name = "services"

router = DefaultRouter()
router.register("categories", ServiceCategoryViewSet, basename="service-category")
router.register("faqs", FAQViewSet, basename="faq")
router.register("", ServiceViewSet, basename="service")

urlpatterns = router.urls

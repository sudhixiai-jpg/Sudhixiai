from rest_framework.permissions import AllowAny
from rest_framework.views import APIView

from apps.common.responses import success

from .models import SiteConfiguration
from .serializers import SiteConfigurationSerializer


class SiteConfigurationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        config = SiteConfiguration.load()
        return success(data=SiteConfigurationSerializer(config, context={"request": request}).data)

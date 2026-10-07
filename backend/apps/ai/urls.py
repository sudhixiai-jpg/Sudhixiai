from django.urls import path

from .views import AIChatView, AIEmbedView, AIGenerateView

app_name = "ai_platform"

urlpatterns = [
    path("generate/", AIGenerateView.as_view(), name="generate"),
    path("chat/", AIChatView.as_view(), name="chat"),
    path("embed/", AIEmbedView.as_view(), name="embed"),
]

from rest_framework import serializers


class AIGenerateRequestSerializer(serializers.Serializer):
    prompt = serializers.CharField(max_length=8000)


class AIChatRequestSerializer(serializers.Serializer):
    messages = serializers.ListField(child=serializers.DictField(), min_length=1)


class AIEmbedRequestSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=8000)

from rest_framework import serializers

from .models import Organization, OrganizationMember


class OrganizationMemberSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = OrganizationMember
        fields = ["id", "email", "role", "status", "joined_at"]


class OrganizationSerializer(serializers.ModelSerializer):
    members = OrganizationMemberSerializer(many=True, read_only=True)

    class Meta:
        model = Organization
        fields = ["id", "name", "slug", "status", "members", "created_at"]
        read_only_fields = ["id", "status", "members", "created_at"]


class OrganizationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ["name", "slug"]

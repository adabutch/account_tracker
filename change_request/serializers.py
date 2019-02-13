from rest_framework import serializers
from .models import ChangeRequest


class ChangeRequestSerializer(serializers.ModelSerializer):
    requester = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = ChangeRequest
        fields = '__all__'

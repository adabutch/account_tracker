from rest_framework import serializers
from .models import TerminationRequest


class TerminationRequestSerializer(serializers.ModelSerializer):
    requester = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = TerminationRequest
        fields = '__all__'

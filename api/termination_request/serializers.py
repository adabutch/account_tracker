from rest_framework import serializers
from .models import TerminationRequest


class TerminationRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = TerminationRequest
        fields = '__all__'

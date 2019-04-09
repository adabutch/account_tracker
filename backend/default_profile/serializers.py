from rest_framework import serializers
from .models import DefaultProfile
from service.serializers import ServiceSerializer

class DefaultProfileSerializer(serializers.ModelSerializer):

    services = ServiceSerializer(many=True, read_only=True)

    class Meta:
        model = DefaultProfile
        fields = '__all__'

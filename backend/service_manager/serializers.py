from rest_framework import serializers
from .models import ServiceManager


class ServiceManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceManager
        fields = '__all__'

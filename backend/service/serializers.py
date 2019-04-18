from rest_framework import serializers
from .models import Service
from employee.serializers import UserSerializer


class ServiceSerializer(serializers.ModelSerializer):

    managers = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = '__all__'

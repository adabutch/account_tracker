from rest_framework import serializers
from .models import DefaultProfile


class DefaultProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefaultProfile
        fields = '__all__'

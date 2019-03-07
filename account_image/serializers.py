from rest_framework import serializers
from .models import AccountImage


class AccountImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountImage
        fields = '__all__'

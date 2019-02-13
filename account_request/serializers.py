# from rest_framework.fields import CurrentUserDefault
from rest_framework import serializers
from .models import AccountRequest


# https://stackoverflow.com/questions/30203652/how-to-get-request-user-in-django-rest-framework-serializer
class AccountRequestSerializer(serializers.ModelSerializer):
    requester = serializers.PrimaryKeyRelatedField(
        read_only=True, default=serializers.CurrentUserDefault())

    class Meta:
        model = AccountRequest
        fields = '__all__'

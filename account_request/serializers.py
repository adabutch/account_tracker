from rest_framework import serializers
from .models import AccountRequest


# https://stackoverflow.com/questions/30203652/how-to-get-request-user-in-django-rest-framework-serializer
# couldn't get that approach to work
# going with manual specification for now
class AccountRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = AccountRequest
        fields = '__all__'

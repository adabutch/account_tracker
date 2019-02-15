from django.contrib.auth.models import User, Group
from rest_framework import serializers


# https://docs.djangoproject.com/en/2.1/ref/contrib/auth/
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'groups')


class GroupSerializer(serializers.Serializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

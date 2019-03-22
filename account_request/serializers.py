from rest_framework import serializers
from rest_framework_friendly_errors.mixins import FriendlyErrorMessagesMixin
from .models import AccountRequest


# https://stackoverflow.com/questions/30203652/how-to-get-request-user-in-django-rest-framework-serializer
# couldn't get that approach to work
# going with manual specification for now
class AccountRequestSerializer(FriendlyErrorMessagesMixin,
                               serializers.ModelSerializer):

    full_name = serializers.SerializerMethodField()

    class Meta:
        model = AccountRequest
        fields = '__all__'

    def get_full_name(self, obj):

        if obj.nickname:
            beginning = "%s (%s)" % (obj.first_name, obj.nickname)
        else:
            beginning = obj.first_name

        if obj.middle_name:
            fn = "%s %s %s" % (beginning, obj.middle_name, obj.last_name)
        else:
            fn = "%s %s" % (beginning, obj.last_name)

        if obj.suffix:
            fn += " " + obj.suffix
        return fn

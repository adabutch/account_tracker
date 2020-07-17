from django.db import models
from django.contrib.auth.models import User
from account_request.models import AccountRequest
from service_request.models import ServiceRequest


class Action(models.Model):
    """
    Track activity on AccountRequests and ServiceRequests
    """
    # Who is taking the action?
    user = models.ForeignKey(User, on_delete=models.SET_NULL,
                             blank=True, null=True)

    # making this required for now --
    # are there cases where we wouldn't have an account_request associated?
    account = models.ForeignKey(AccountRequest, on_delete=models.CASCADE)
    service = models.ForeignKey(ServiceRequest, on_delete=models.SET_NULL,
                                blank=True, null=True)

    # what was done?
    action = models.CharField(max_length=150)

    # any other details?
    comment = models.TextField(default='', blank=True, null=True)

    created = models.DateTimeField(auto_now_add=True)
    # any associated logged actions could trigger an update to updated
    updated = models.DateTimeField(auto_now=True)

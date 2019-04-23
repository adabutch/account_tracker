from django.db import models
from django.contrib.auth.models import User
from service.models import Service
from account_request.models import AccountRequest


class ServiceRequest(models.Model):
    """
    A request for a change in access to a specific service

    An account request may generate many ServiceRequests

    Once the Request is complete, this could be considered an account
    Accounts associate a user with a service
    """
    service = models.ForeignKey(Service, on_delete=models.CASCADE)

    # Optional way to specify what permission level the user needs. 
    permission_level = models.CharField(max_length=50, blank=True, null=True)

    # who will have access to the Service
    # e.g. who is the account for?
    user = models.ForeignKey(
        User, related_name='services', on_delete=models.SET_NULL,
        blank=True, null=True)

    requester = models.ForeignKey(
        User, related_name='requested_services', on_delete=models.SET_NULL,
        blank=True, null=True)

    # TODO: optionally link back to the parent request?
    # only applies to AccountRequest or TerminationRequest
    account_request = models.ForeignKey(AccountRequest,
                                        on_delete=models.SET_NULL,
                                        blank=True, null=True)

    # grant access? revoke access?
    type_of_change = models.CharField(max_length=50)

    # is it new? pending? approved? active? denied? inactive?
    request_status = models.CharField(max_length=50)

    requested = models.DateTimeField(auto_now_add=True)
    # any associated logged actions could trigger an update to updated
    updated = models.DateTimeField(auto_now=True)
    # when the account was created -- job's finished
    created = models.DateTimeField(blank=True, null=True)

from django.db import models
from django.contrib.auth.models import User


class TerminationRequest(models.Model):
    """
    When an employee leaves the organization
    remove access to the different services that were previously requested
    """
    requester = models.ForeignKey(
        User, related_name='requested_terminations', on_delete=models.SET_NULL,
        blank=True, null=True)

    # who is leaving?
    user = models.ForeignKey(User, related_name='terminations',
                             on_delete=models.SET_NULL, blank=True, null=True)

    # is it new? approved? completed? denied?
    request_status = models.CharField(max_length=50)

    requested = models.DateTimeField(auto_now_add=True)
    # any associated logged actions could trigger an update to updated
    updated = models.DateTimeField(auto_now=True)
    # when the account was created -- job's finished
    created = models.DateTimeField(blank=True, null=True)

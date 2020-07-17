from django.db import models
from django.contrib.auth.models import User


class ChangeRequest(models.Model):
    """
    Used if an account requires a change
    like a name change, job change, department change, etc.
    """
    requester = models.ForeignKey(
        User, related_name='requested_changes', on_delete=models.SET_NULL,
        blank=True, null=True)

    # who is the change for?
    user = models.ForeignKey(User, related_name='changes',
                             on_delete=models.SET_NULL, blank=True, null=True)

    # what type of change?
    description = models.TextField()

    # is it new? pending? approved? completed? denied? inactive?
    request_status = models.CharField(max_length=50)

    requested = models.DateTimeField(auto_now_add=True)
    # any associated logged actions could trigger an update to updated
    updated = models.DateTimeField(auto_now=True)
    # job's finished
    completed = models.DateTimeField(blank=True, null=True)

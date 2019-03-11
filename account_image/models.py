from django.db import models
from django.contrib.auth.models import User


class AccountImage(models.Model):
    full_image = models.FileField(upload_to='%Y/%m/%d')
    cropped_image = models.FileField(upload_to='%Y/%m/%d')

    creator = models.ForeignKey(
        User, on_delete=models.SET_NULL, blank=True, null=True)

    created = models.DateTimeField(auto_now_add=True)
    # any associated logged actions could trigger an update to updated
    updated = models.DateTimeField(auto_now=True)

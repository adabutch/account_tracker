from django.db import models
from django.contrib.auth.models import User


class AccountImage(models.Model):
    image = models.ImageField(upload_to='%Y/%m/%d')

    creator = models.ForeignKey(
        User, on_delete=models.SET_NULL, blank=True, null=True)

    # is it the full size version? cropped?
    image_type = models.CharField(max_length=50)

    created = models.DateTimeField(auto_now_add=True)
    # any associated logged actions could trigger an update to updated
    updated = models.DateTimeField(auto_now=True)

from django.db import models
from django.contrib.auth.models import User

# from service.models import Service


class Account(models.Model):
    """
    Accounts associate a user with a system
    """
    user = models.ForeignKey(User, on_delete=models.SET_NULL,
                             blank=True, null=True)
    # service = models.ForeignKey(Service, on_delete=models.CASCADE)
    # is it pending, active, inactive?
    status = models.CharField(max_length=50)

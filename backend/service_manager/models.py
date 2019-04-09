from django.db import models
from django.contrib.auth.models import User
from service.models import Service


class ServiceManager(models.Model):
    """
    Someone in charge of administering a Service
    """
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    manager = models.ForeignKey(User, on_delete=models.SET_NULL,
                                blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

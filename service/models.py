from django.db import models


class Service(models.Model):
    """
    An application, system or web service that an employee may need access to
    """
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    url = models.URLField(blank=True, null=True)

    active = models.BooleanField(default=True)
    # cloud, desktop, server
    deployment = models.CharField(max_length=50, blank=True, null=True)

    # when?
    deployed = models.DateField(auto_now_add=True)

    standard_build = models.BooleanField(default=False)
    public = models.BooleanField(default=False)

    # point of contact (PoC)
    # internal support will be tracked via ServiceManager

    # TODO: this could be its own model / foreignkey
    # who develops / maintains the software?
    # e.g. external support
    developer = models.CharField(max_length=50, default='COB')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

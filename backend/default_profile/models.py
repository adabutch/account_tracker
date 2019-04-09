from django.db import models
from service.models import Service


class DefaultProfile(models.Model):
    """
    A way to describe a set of services and questions
    that apply to a given set of users.
    Typically, this is based on department and possibly group.
    """
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    services = models.ManyToManyField(Service)

    # this one is required
    # driven by Timetrack, so not an explicit foreignkey
    department_id = models.IntegerField()
    group_id = models.IntegerField(blank=True, null=True)

    # comma separated list of additional questions to ask this group
    questions = models.TextField(blank=True, null=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

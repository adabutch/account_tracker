from django.db import models


class Request(models.Model):
    """
    A request is what triggers a number of actions to modify accounts

    associations with software / services / accounts
    will be tracked elsewhere with ForeignKeys
    """
    # TODO
    # user =
    # system = models.ForeignKey(System, on_delete=models.CASCADE)

    first_name = models.CharField(max_length=50)
    middle_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    suffix = models.CharField(max_length=50)

    # strip out dashes and periods
    employee_phone = models.CharField(max_length=10)

    supervisor = models.CharField(max_length=50)
    supervisor_phone = models.CharField(max_length=50)

    department = models.CharField(max_length=50)
    division = models.CharField(max_length=50)
    group = models.CharField(max_length=50)
    facility = models.CharField(max_length=50)

    job = models.CharField(max_length=50)
    #temp, full-time
    employee_status = models.CharField(max_length=50)
    start_date = models.DateField()

    # is it new? approved? completed?
    request_status = models.CharField(max_length=50)

# Generated by Django 2.1.5 on 2019-02-22 14:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_request', '0005_remove_accountrequest_requested_services'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountrequest',
            name='employee_phone',
            field=models.CharField(max_length=12),
        ),
        migrations.AlterField(
            model_name='accountrequest',
            name='supervisor_phone',
            field=models.CharField(max_length=12),
        ),
    ]

# Generated by Django 2.1.5 on 2019-02-21 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_request', '0003_accountrequest_nickname'),
    ]

    operations = [
        migrations.AddField(
            model_name='accountrequest',
            name='requested_services',
            field=models.TextField(blank=True, null=True),
        ),
    ]

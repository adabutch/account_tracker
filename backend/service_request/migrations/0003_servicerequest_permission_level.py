# Generated by Django 2.1.5 on 2019-04-23 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_request', '0002_servicerequest_account_request'),
    ]

    operations = [
        migrations.AddField(
            model_name='servicerequest',
            name='permission_level',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]

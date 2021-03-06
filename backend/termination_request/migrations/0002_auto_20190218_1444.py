# Generated by Django 2.1.5 on 2019-02-18 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('termination_request', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='terminationrequest',
            old_name='created',
            new_name='terminated',
        ),
        migrations.AddField(
            model_name='terminationrequest',
            name='return_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='terminationrequest',
            name='returning',
            field=models.BooleanField(default=False),
        ),
    ]

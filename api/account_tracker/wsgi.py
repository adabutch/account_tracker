"""
WSGI config for account_tracker project.

This is just for local development.
For production hosting, please use a custom wsgi.py file.
An example is available in ../example.wsgi

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/howto/deployment/wsgi/
"""

import os

# This needs to point to your own configuration file
# os.environ["ACCOUNT_TRACKER_CONF"] = "/path/to/account_tracker.conf"

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'account_tracker.settings')

application = get_wsgi_application()

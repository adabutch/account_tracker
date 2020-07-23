# Account Tracker API

The Account Tracker API leverages [Django Rest Framework](https://www.django-rest-framework.org/)


## About Requirements

The api [Dockerfile](Dockerfile) manages configuration of the image. 

It uses `pip` to install the requirements.txt file:

    pip install -r requirements.txt
    
If you add new requirements to requirements.txt, you'll need to rebuild the `api` docker image. To rebuild the image, use `docker-compose build` or `docker-compose up --build`.

This is handled automatically the first time you run `docker-compose up`. 


## Containers

If you've already run `docker-compose -f docker-compose-admin.yml up -d` from the [top README](../README.md), the API container should be available. 

Connect to the running API container: 

    docker-compose -p account_tracker exec api bash


## Migrations

Run migrations:

  - After a fresh install
  - After making changes to the models
  
Generate new database migrations and then apply them with:

```bash
ACCOUNT_TRACKER_CONF=example.conf python manage.py makemigrations
ACCOUNT_TRACKER_CONF=example.conf python manage.py migrate
```


## Dev Server

Run the dev server with:

```bash
ACCOUNT_TRACKER_CONF=example.conf python manage.py runserver 0.0.0.0:8000
```


## User Accounts

Accounts are configured 

    python manage.py createsuperuser --email admin@example.com --username admin
    
TODO:

Currently getting an error:

``` bash
  File "/srv/account_tracker/api/employee/views.py", line 13, in create_user_profile
    instance.groups.add(Group.objects.get(name='Regular'))
  File "/usr/local/lib/python3.8/site-packages/django/db/models/manager.py", line 82, in manager_method
    return getattr(self.get_queryset(), name)(*args, **kwargs)
  File "/usr/local/lib/python3.8/site-packages/django/db/models/query.py", line 415, in get
    raise self.model.DoesNotExist(
django.contrib.auth.models.DoesNotExist: Group matching query does not exist.
```

Seems to stem from

``` python
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        instance.groups.add(Group.objects.get(name='Regular'))
```

in:
 
    account_tracker/api/employee/views.py

**HOWEVER**

the admin account will still work!

The login form is available:

http://localhost:8000/

TODO:
The redirect after login is broken / hard coded. 

After logging in, manually access the Django Rest Framework API directly: 

http://localhost:8000/api

The Django administration interface is also available:

http://localhost:8000/admin/

It may be possible to add a Group 'Regular' through that interface.
It would be better to add that as part of setup/migration scripts if it is required.


## Settings

The main settings file is available in:

    account_tracker/settings.py

The [docker-compose.yml](../docker-compose.yml) file injects the following as an environment variable:

    ACCOUNT_TRACKER_CONF=example.conf 
    
This way it can be left off of the commands that include it explicitly in this file. 

TODO:
move away from the .ini config file to update values in settings.py
use .env or docker-compose to set environment variables and pull those in to settings.py


## Testing

```bash
ACCOUNT_TRACKER_CONF=/path/to/config.ini python manage.py test
```

## References

https://medium.com/quick-code/crud-app-using-vue-js-and-django-516edf4e4217
https://www.pydanny.com/drf-jwt-axios-vue.html








## Hosting with Apache

Running in production with Apache / MySQL requires a few additional dependencies:

* python3-dev
* libldap3-dev
* libsasl2-dev
* libmysqlclient-dev
* libapache2-mod-wsgi-py3

configparser
mysqlclient
django-auth-ldap


Use the Python3 version of mod_wsgi.

```apache
WSGIProcessGroup  account_tracker
WSGIDaemonProcess account_tracker python-home=/path/to/account_tracker/venv python-path=/path/to/account_tracker/backend
WSGIScriptAlias  /account_tracker /path/to/account_tracker/public/wsgi.py process-group=account_tracker

<Directory "/path/to/account_tracker/backend/account_tracker">
    Options FollowSymLinks
    AllowOverride None
    <Files wsgi.py>
        Require all granted
    </Files>
</Directory>
```
You will need to create your own version of the wsgi file to suit your environment.  In particular, you'll need to declare where you put your config.ini file.



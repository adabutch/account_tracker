# Account Tracker

Account Tracker manages requests for accounts on systems in use at an organization. Tracking these in a central location helps ensure that users have access to all of the resources they need. Administrators can trigger automated routines for account management when available. Manual tasks can be logged to confirm that tasks have been completed.

## Requirements
This is a Python3 application.  It will not run using Python2.

* python3
* python3-dev
* libldap3-dev
* libsasl2-dev
* libapache2-mod-wsgi-py3

```bash
python3 -m venv venv
. venv/bin/activate
pip install --upgrade pip wheel setuptools
pip install -r backend/requirements.txt
```

## Migrations

After making changes to the models, generate new database migrations and then apply them:

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

## Hosting with Apache
As stated above, remember you must use the Python3 version of mod_wsgi

```apache
WSGIProcessGroup  account_tracker
WSGIDaemonProcess account_tracker python-home=/path/to/account_tracker/venv python-path=/path/to/account_tracker/backend
WSGIScriptAlias  /account_tracker /path/to/account_tracker/backend/account_tracker/wsgi.py process-group=account_tracker

<Directory "/path/to/account_tracker/backend/account_tracker">
    Options FollowSymLinks
    AllowOverride None
    <Files wsgi.py>
        Require all granted
    </Files>
</Directory>
```


## Dev Server

Run the dev server with:

```bash
python3 manage.py runserver
```

## Testing

```bash
python3 manage.py test
```


## References
https://medium.com/quick-code/crud-app-using-vue-js-and-django-516edf4e4217
https://www.pydanny.com/drf-jwt-axios-vue.html

# Account Tracker

Account Tracker manages requests for accounts on systems in use at an organization. Tracking these in a central location helps ensure that users have access to all of the resources they need. Administrators can trigger automated routines for account management when available. Manual tasks can be logged to confirm that tasks have been completed.

## Requirements

This is a Python3 application.  

Make sure you have pipenv installed:

    pip3 install pipenv

Add `.local/bin` to the PATH by editing ~/.bashrc

```
PATH="/opt/local/bin:~/.yarn/bin:~/.local/bin:${PATH}"
export PATH
```

    cd backend

    pipenv install


## Configuration

pipenv will load a local .env file for configuration variables. Currently, this is used to point to the ini. (TODO: consolidate to just use django-environ for configuration in .env).

You will need to create your own ini conf file.  The path to this file must be declared as the OS environment variable: "ACCOUNT_TRACKER_CONF".


## Running

    pipenv run python3 manage.py runserver

or you can load the virtual environment and work directly:

    pipenv shell


## Dev Server

Run the dev server with:

```bash
ACCOUNT_TRACKER_CONF=/path/to/config.ini python manage.py runserver
```

## Migrations

After making changes to the models, generate new database migrations and then apply them:

```bash
ACCOUNT_TRACKER_CONF=/path/to/config.ini python manage.py makemigrations
ACCOUNT_TRACKER_CONF=/path/to/config.ini python manage.py migrate
```

## User Accounts

Accounts are configured 

    python manage.py createsuperuser --email admin@example.com --username admin


## Testing

```bash
ACCOUNT_TRACKER_CONF=/path/to/config.ini python manage.py test
```


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


## References
https://medium.com/quick-code/crud-app-using-vue-js-and-django-516edf4e4217
https://www.pydanny.com/drf-jwt-axios-vue.html

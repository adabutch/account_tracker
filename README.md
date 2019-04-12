# Account Tracker

Account Tracker manages requests for accounts on systems in use at an organization. Tracking these in a central location helps ensure that users have access to all of the resources they need. Administrators can trigger automated routines for account management when available. Manual tasks can be logged to confirm that tasks have been completed.

## Requirements

```
pip3 install -r requirements.txt
```

## Migrations

After making changes to the models, generate new database migrations and then apply them:

```
python3 manage.py makemigrations
python3 manage.py migrate
```

## Dev Server

Run the dev server with:

```
python3 manage.py runserver
```

## Testing

```
python3 manage.py test
```


## References
https://medium.com/quick-code/crud-app-using-vue-js-and-django-516edf4e4217
https://www.pydanny.com/drf-jwt-axios-vue.html

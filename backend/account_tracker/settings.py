"""
Django settings for account_tracker project.

Generated by 'django-admin startproject' using Django 2.1.5.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os, configparser
from datetime import timedelta

config = configparser.ConfigParser(strict=True, interpolation=None)
config.read(os.environ["ACCOUNT_TRACKER_CONF"]);

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# Allow for higher-res images
DATA_UPLOAD_MAX_MEMORY_SIZE = int(config['hosting'].get('max_upload_size', 5242880))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config['hosting'].get('secret_key')


# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = config['hosting'].getboolean('debug')
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_filters',
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
    'employee',
    'default_profile',
    'service',
    'service_request',
    'account_request',
    'change_request',
    'termination_request',
    'action',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'account_tracker.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'account_tracker.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases
db_engine = config['database'].get('engine')
db_name   = config['database'].get('name')
db_host   = config['database'].get('host')
db_port   = config['database'].get('port')
db_user   = config['database'].get('user')
db_pass   = config['database'].get('pass')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.' + db_engine,
        'NAME': db_name
    }
}
if db_host: DATABASES['default']['HOST'    ] = db_host
if db_port: DATABASES['default']['PORT'    ] = db_port
if db_user: DATABASES['default']['USER'    ] = db_user
if db_pass: DATABASES['default']['PASSWORD'] = db_pass

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = ['https://dhcp-cityhall-101-164.bloomington.in.gov:9090']

# Adapting from Netbox approach for configuring LDAP
# Attempt to import LDAP configuration if it has been defined
LDAP_IGNORE_CERT_ERRORS = False
try:
    from account_tracker.ldap_config import *
    LDAP_CONFIGURED = True
except ImportError:
    LDAP_CONFIGURED = False

# LDAP configuration (optional)
if LDAP_CONFIGURED:
    try:
        import ldap
        import django_auth_ldap
        # Prepend LDAPBackend to the default ModelBackend
        AUTHENTICATION_BACKENDS = [
            'django_auth_ldap.backend.LDAPBackend',
            'django.contrib.auth.backends.ModelBackend',
        ]
        # Optionally disable strict certificate checking
        if LDAP_IGNORE_CERT_ERRORS:
            ldap.set_option(ldap.OPT_X_TLS_REQUIRE_CERT, ldap.OPT_X_TLS_NEVER)
        # Enable logging for django_auth_ldap
        # ldap_logger = logging.getLogger('django_auth_ldap')
        # ldap_logger.addHandler(logging.StreamHandler())
        # ldap_logger.setLevel(logging.DEBUG)
    except ImportError:
        raise ImproperlyConfigured(
            "LDAP authentication has been configured, but django-auth-ldap is not installed. You can remove "
            "account_tracker/ldap_config.py to disable LDAP."
        )

REST_FRAMEWORK = {
    'TEST_REQUEST_RENDERER_CLASSES': (
        'rest_framework.renderers.MultiPartRenderer',
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.TemplateHTMLRenderer'
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        # 'rest_framework.permissions.IsAuthenticatedOrReadOnly',
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 20,
}


# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

# Be sure code matches one of: https://github.com/django/django/blob/master/django/conf/global_settings.py

LANGUAGE_CODE = config['locale'].get('lang')
TIME_ZONE     = config['locale'].get('tz'  )
USE_I18N = True
USE_L10N = True
USE_TZ   = True

SESSION_EXPIRE_AT_BROWSER_CLOSE = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

LOGIN_REDIRECT_URL = 'https://dhcp-cityhall-101-164.bloomington.in.gov:9090/frontend/'
LOGOUT_REDIRECT_URL = 'https://dhcp-cityhall-101-164.bloomington.in.gov:9090/accounts/login'

STATIC_ROOT = '/static/'
STATIC_URL = '/static/'
STATICFILES_DIRS = os.path.join(BASE_DIR, 'static'),

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

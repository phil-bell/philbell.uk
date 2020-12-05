QB_PASS = "6bU6eXKkxbJ&"

ALLOWED_HOSTS=['*',]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "postgres",
        "USER": "pi",
        "PASSWORD": "postgres",
        "HOST": "localhost",
        "PORT": "5432",
    }
}

SECRET_KEY = "eka^%a4nv2+5p6*gz#rg*xun-p8$e(kn=fi@2%*aow(ow4px@0"

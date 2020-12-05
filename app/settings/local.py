from pathlib import Path

BASE_DIR = Path(__file__).resolve(strict=True).parent.parent.parent

QB_PASS = "6bU6eXKkxbJ&"

DEBUG = True

ALLOWED_HOSTS=['*',]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": "postgres",
        "USER": "postgres",
        "PASSWORD": "postgres",
        "HOST": "localhost",
        "PORT": "5433",
    }
}

STATICFILES_DIRS = [f"{BASE_DIR}/app/static/"]
STATIC_ROOT = f"{BASE_DIR}/app/staticfiles/"


SECRET_KEY = "eka^%a4nv2+5p6*gz#rg*xun-p8$e(kn=fi@2%*aow(ow4px@0"

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url
import certbot_django.server.urls

urlpatterns = [
    path("admin/", admin.site.urls),
    url(r"^\.well-known/", include(certbot_django.server.urls)),
    path("api/", include("api.urls")),
    path("", include("app.urls")),
]

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import url

urlpatterns = [
    url(r"^\.well-known/", include("letsencrypt.urls")),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("", include("app.urls")),
]

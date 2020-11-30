from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    re_path(r'^\.well-known/', include('letsencrypt.urls')),
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    path("", include("app.urls")),
]

from django.contrib import admin
from django.urls import path

from .views import HomePageView, PlexView, NavConfigView, ResumeView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", HomePageView.as_view(), name="home"),
    path("plex/", PlexView.as_view(), name="plex"),
    path("resume", ResumeView.as_view(), name="resume"),
    path("get-nav-config", NavConfigView.as_view(), name="get-nav-config"),
]

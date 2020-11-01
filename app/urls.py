from django.contrib import admin
from django.urls import path, include

from .views import HomePageView, PlexView, NavConfigView, ResumeView, ManageView

app_name = "app"

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("plex/", PlexView.as_view(), name="plex"),
    path("resum/e", ResumeView.as_view(), name="resume"),
    path("manage/", ManageView.as_view(), name="manage"),
    path("get-nav-config", NavConfigView.as_view(), name="get-nav-config"),
]

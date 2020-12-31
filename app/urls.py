from django.contrib import admin
from django.urls import path, include

from .views import HomePageView, PlexView, ResumeView, ManageView, Login, Logout

app_name = "app"

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("plex/", PlexView.as_view(), name="plex"),
    path("resume/", ResumeView.as_view(), name="resume"),
    path("manage/", ManageView.as_view(), name="manage"),
    path("login/", Login.as_view(), name="login"),
    path("logout/", Logout.as_view(), name="logout"),
    
]

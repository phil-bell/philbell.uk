from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.views import LogoutView

from .views import HomePageView, AddView, ResumeView, ProgressView, Login

app_name = "app"

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("add/", AddView.as_view(), name="add"),
    path("resume/", ResumeView.as_view(), name="resume"),
    path("progress/", ProgressView.as_view(), name="progress"),
    path("login/", Login.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
]

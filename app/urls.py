from django.contrib import admin
from django.urls import path, include

from .views import HomePageView, addView, ResumeView, progressView, Login, Logout

app_name = "app"

urlpatterns = [
    path("", HomePageView.as_view(), name="home"),
    path("add/", addView.as_view(), name="add"),
    path("resume/", ResumeView.as_view(), name="resume"),
    path("progress/", progressView.as_view(), name="progress"),
    path("login/", Login.as_view(), name="login"),
    path("logout/", Logout.as_view(), name="logout"),
    
]

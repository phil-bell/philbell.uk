from django.urls import include, path
from rest_framework import routers
from .view import *


app_name = "api"

router = routers.DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path("nav-config/", NavConfig.as_view()),
    path("info/", Info.as_view()),
    path("download/", Download.as_view()),
    path("login/", Login.as_view()),
    path("logout/", Logout.as_view()),
    path("authenticated/", Authenticated.as_view()),
    path("progress-list/", ProgressList.as_view()),
    path("delete-torren/t", DeleteTorrent.as_view()),
    path("pause-torrent/", PauseTorrent.as_view()),
    path("resume-torrent/", ResumeTorrent.as_view()),
]

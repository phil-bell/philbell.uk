from django.urls import include, path
from rest_framework import routers
from .view import Download, Info, Login, Logout


app_name = "api"

router = routers.DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path("info/", Info.as_view()),
    path("download/", Download.as_view()),
    path("login/", Login.as_view()),
    path("logout/", Logout.as_view()),
]


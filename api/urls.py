from django.urls import include, path
from rest_framework import routers
from .view import Download, Info
from rest_framework.urlpatterns import format_suffix_patterns


app_name = "api"

router = routers.DefaultRouter()

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
    path("info/", Info.as_view()),
    path("download/", Download.as_view()),
]

# urlpatterns = format_suffix_patterns(urlpatterns)

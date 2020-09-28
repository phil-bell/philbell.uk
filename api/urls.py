from django.urls import include, path
from rest_framework import routers
from .view import DownloadViewSet

app_name = "api"

router = routers.DefaultRouter()
router.register(r'download', DownloadViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]
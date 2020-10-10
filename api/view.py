from django.conf import settings
from django.http import request
from django.views import generic
from rest_framework import mixins
from rest_framework.views import APIView
from api.serializer import DownloadSerializer
from django.contrib.auth.models import User, Group
from django.http.response import JsonResponse
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from .models import Download
from subprocess import run
from imdb import IMDb
import qbittorrentapi


class DownloadViewSet(
    viewsets.ViewSet,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Download.objects.all()
    serializer_class = DownloadSerializer

    def __init__(self, *args, **kwargs):
        self.client = qbittorrentapi.Client(host='localhost', port=8080, username='admin', password='adminadmin')
        super().__init__(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        print("adding torrent")
        self.client.torrents_add(urls=request.data["magnet"], save_path=f"{settings.DOWNLOAD_PATH}{request.data["locations"]}")
        return super().create(request, *args, **kwargs)


class InfoDetail(APIView):
    def __init__(self, *args, **kwargs):
        self.imdb = IMDb()
        super().__init__(*args, **kwargs)


    def post(self, request, format=None):
        res = self.imdb.search_movie(request.data["name"].split("(")[0])
        print(res[0]["title"])
        print(res[0])
        return JsonResponse({"res": "pass"})

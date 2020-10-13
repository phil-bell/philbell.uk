from django.conf import settings
from django.http import request
from django.views import generic
from rest_framework import mixins
from rest_framework.views import APIView
from django.contrib.auth.models import User, Group
from django.http.response import JsonResponse, HttpResponse
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from subprocess import run
from imdb import IMDb
import qbittorrentapi
from django.contrib.auth import authenticate


class Download(APIView):

    def __init__(self, *args, **kwargs):
        self.client = qbittorrentapi.Client(
            host="localhost", port=8080, username="admin", password="adminadmin"
        )
        super().__init__(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        print("adding torrent")
        print(f"{settings.DOWNLOAD_PATH}{request.data['location']}")
        res = self.client.torrents_add(
            urls=request.data["magnet"],
            save_path=f"{settings.DOWNLOAD_PATH}{request.data['location']}",
        )
        if res == "Ok.":
            return HttpResponse(status=201)
        return HttpResponse(status=400)


class Info(APIView):
    def __init__(self, *args, **kwargs):
        self.imdb = IMDb()
        super().__init__(*args, **kwargs)

    def post(self, request, format=None):
        res = self.imdb.search_movie(request.data["name"].split("(")[0])
        print(res[0]["title"])
        print(res[0])
        return JsonResponse({"res": "pass"})


class Login(APIView):
    def post(self, request):
        print(request.data["username"])
        user = authenticate(username=request.data["username"], password=request.data["password"])
        if user:
           return HttpResponse(status=200) 
        return HttpResponse(status=401)
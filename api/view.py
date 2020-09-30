from django.http import request
from django.views import generic
from rest_framework import mixins
from api.serializer import DownloadSerializer
from django.contrib.auth.models import User, Group
from django.http.response import JsonResponse
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from .models import Download
from subprocess import run


class DownloadViewSet(
    viewsets.ViewSet,
    mixins.RetrieveModelMixin,
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    viewsets.GenericViewSet,
):

    queryset = Download.objects.all()
    serializer_class = DownloadSerializer

    def create(self, request, *args, **kwargs):
        print(request.data["location"])
        print(request.data["magnet"])
        run(
            [
                "transmission-remote",
                "-w",
                request.data["location"],
                "-a",
                request.data["magnet"],
            ]
        )
        return super().create(request, *args, **kwargs)

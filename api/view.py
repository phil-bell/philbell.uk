from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from .models import Download



class DownloadViewSet(viewsets.ViewSet):

    queryset = Download.objects.all()

    def create(self, request):
        magnet = request.data['magnet']
        return Response(data=magnet)
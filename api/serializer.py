

from api.models import Download
from rest_framework import serializers


class DownloadSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=100)
    location = serializers.CharField(max_length=100)
    magnet = serializers.CharField()

    class Meta:
        model = Download
        fields = [
            "name",
            "location",
            "magnet"
        ]
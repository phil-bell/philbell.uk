from django.conf import settings
from rest_framework.views import APIView
from django.http.response import JsonResponse
from subprocess import run
from imdb import IMDb
import qbittorrentapi
from django.contrib.auth import authenticate, logout, login
from django.urls import reverse


class TorrentView(APIView):
    def __init__(self, *args, **kwargs):
        self.client = qbittorrentapi.Client(
            host="localhost", port=8080, username="admin", password=settings.QB_PASS
        )
        super().__init__(*args, **kwargs)


class NavConfig(APIView):
    def get(self, request):
        return JsonResponse(
            {
                "nav": [
                    {"name": "home", "url": reverse("app:home"), "show": True},
                    {
                        "name": "add",
                        "url": reverse("app:plex"),
                        "show": request.user.is_authenticated,
                    },
                    {
                        "name": "progress",
                        "url": reverse("app:manage"),
                        "show": request.user.is_authenticated,
                    },
                ],
                "authenticated": request.user.is_authenticated,  # TODO make a dedicated authenticate api endpoint
            },
            safe=False,
        )


class Download(TorrentView):
    def post(self, request, *args, **kwargs):
        res = self.client.torrents_add(
            urls=request.data["magnet"],
            save_path=f"{settings.DOWNLOAD_PATH}{request.data['location']}",
        )
        if res == "Ok.":
            return JsonResponse(status=201, data={})
        return JsonResponse(status=400, data={})


class Info(TorrentView):
    def post(self, request, format=None):
        res = self.imdb.search_movie(request.data["name"].split("(")[0])

        return JsonResponse({"res": "pass"})


class ProgressList(TorrentView):
    def get(self, request):
        return JsonResponse(
            {"torrents": [torrent.info for torrent in self.client.torrents_info(sort="added_on", reverse=True)]}
        )


class Login(APIView):
    def post(self, request):
        user = authenticate(username=request.data["username"], password=request.data["password"])
        if user:
            login(request, user)
            return JsonResponse(status=200, data={})
        return JsonResponse(status=401, data={})


class Logout(APIView):
    def get(self, request):
        logout(request)
        return JsonResponse(status=200, data={})


class Authenticated(APIView):
    def get(self, request):
        return JsonResponse({"authenticated": request.user.is_authenticated})


class DeleteTorrent(TorrentView):
    def post(self, request):
        self.client.torrents_delete(delete_files=True, torrent_hashes=request.data["hash"])
        return JsonResponse(status=200, data={})


class ResumeTorrent(TorrentView):
    def post(self, request):
        self.client.torrents_resume(torrent_hashes=request.data["hash"])
        return JsonResponse(status=200, data={})


class PauseTorrent(TorrentView):
    def post(self, request):
        self.client.torrents_pause(torrent_hashes=request.data["hash"])
        return JsonResponse(status=200, data={})

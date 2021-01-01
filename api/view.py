from django.conf import settings
from rest_framework.views import APIView
from django.http.response import JsonResponse
import qbittorrentapi
from django.urls import reverse


class TorrentView(APIView):
    def __init__(self, *args, **kwargs):
        self.client = qbittorrentapi.Client(
            host=settings.QB_HOST,
            port=settings.QB_PORT,
            username=settings.QB_USER,
            password=settings.QB_PASS,
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
                        "url": reverse("app:add"),
                        "show": request.user.is_authenticated,
                    },
                    {
                        "name": "progress",
                        "url": reverse("app:progress"),
                        "show": request.user.is_authenticated,
                    },
                    {
                        "name": "logout",
                        "url": reverse("app:logout"),
                        "show": request.user.is_authenticated
                    },
                    {
                        "name": "login",
                        "url": reverse("app:login"),
                        "show": not request.user.is_authenticated
                    }
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


class ProgressList(TorrentView):
    def get(self, request):
        return JsonResponse(
            {
                "torrents": [
                    torrent.info
                    for torrent in self.client.torrents_info(sort="added_on", reverse=True)
                ]
            }
        )

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

from django.views.generic import TemplateView, View
from django.http import JsonResponse
from django.urls import reverse

class HomePageView(TemplateView):
    template_name = "home.html"

class PlexView(TemplateView):
    template_name = "plex.html"

class NavConfigView(TemplateView):
    def get(self, request):
        return JsonResponse([
            {
                "name": "home",
                "url": reverse("home")
            },
            {
                "name": "plex",
                "url": reverse("plex")
            },
            {
                "name": "resume",
                "url": "https://www.linkedin.com/in/phil-bell/"
            }
        ], safe=False)
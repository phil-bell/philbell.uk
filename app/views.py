import json

from django.views.generic import TemplateView, View
from django.http import JsonResponse
from django.urls import reverse

from we_get.core.we_get import WG

from .models import Experience, Education


class HomePageView(TemplateView):
    template_name = "home.html"


class PlexView(TemplateView):
    template_name = "plex.html"

    def post(self, request):
        term = json.loads(request.body)["term"]
        we_get = WG()
        we_get.parse_arguments(['--search', term, '--target', 'the_pirate_bay', "--json"])
        res = we_get.start(api_mode=True)
        return JsonResponse({"term": term, "rows": res})


class ResumeView(TemplateView):
    template_name = "resume.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["experience"] = Experience.objects.all()
        context["education"] = Education.objects.all()
        return context


class NavConfigView(TemplateView):
    def get(self, request):
        return JsonResponse(
            [
                {"name": "home", "url": reverse("app:home")},
                {"name": "plex", "url": reverse("app:plex")},
                {"name": "resume", "url": reverse("app:resume")},
            ],
            safe=False,
        )



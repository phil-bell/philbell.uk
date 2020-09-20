from django.views.generic import TemplateView, View
from django.http import JsonResponse
from django.urls import reverse
from linkedin_scraper import Person


class HomePageView(TemplateView):
    template_name = "home.html"


class PlexView(TemplateView):
    template_name = "plex.html"


class ResumeView(TemplateView):
    template_name = "resume.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["profile"] = Person("https://www.linkedin.com/in/phil-bell/")
        return context


class NavConfigView(TemplateView):
    def get(self, request):
        return JsonResponse(
            [
                {"name": "home", "url": reverse("home")},
                {"name": "plex", "url": reverse("plex")},
                {"name": "resume", "url": reverse("resume")},
            ],
            safe=False,
        )

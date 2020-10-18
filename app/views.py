import json
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import request

from django.views.generic import TemplateView

from django.http import JsonResponse
from django.urls import reverse
from django.shortcuts import render

from we_get.core.we_get import WG

from .models import Experience, Education


class HomePageView(TemplateView):
    template_name = "home.html"


class PlexView(LoginRequiredMixin, TemplateView):
    template_name = "plex.html"
    login_url = "/"
    redirect_field_name = "app:home"

    def get(self, request):
        return render(request, self.template_name, {})

    def post(self, request):
        term = json.loads(request.body)["term"]
        we_get = WG()
        we_get.parse_arguments(["--search", term, "--target", "the_pirate_bay", "--json"])
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
        print(request.user)
        print(request.user.is_authenticated)
        return JsonResponse(
            {
                "nav": [
                    {"name": "home", "url": reverse("app:home"), "show": True},
                    {
                        "name": "plex",
                        "url": reverse("app:plex"),
                        "show": request.user.is_authenticated,
                    },
                ],
                "authenticated": request.user.is_authenticated,  # TODO make a dedicated authenticate api endpoint
            },
            safe=False,
        )

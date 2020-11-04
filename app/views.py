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
        we_get.parse_arguments(["--search", term, "--target", "the_pirate_bay", "--json", "--sfw"])
        res = we_get.start(api_mode=True)
        return JsonResponse({"term": term, "rows": res})

class ManageView(LoginRequiredMixin, TemplateView):
    template_name = "manage.html"
    login_url = "/"
    redirect_field_name = "app:home"

class ResumeView(TemplateView):
    template_name = "resume.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["experience"] = Experience.objects.all()
        context["education"] = Education.objects.all()
        return context

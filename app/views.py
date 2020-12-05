import json
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import request
from django.views.generic import TemplateView
from django.http import JsonResponse
from django.urls import reverse
from django.shortcuts import render
from the_python_bay import tpb

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
        res = tpb.search_dict(term)
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

import json
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import request
from django.views.generic import TemplateView, View
from django.http import JsonResponse, HttpResponse
from django.urls import reverse
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.views import LoginView
from the_python_bay import tpb


from .models import Experience, Education


class HomePageView(TemplateView):
    template_name = "home.html"


class PlexView(LoginRequiredMixin, TemplateView):
    template_name = "plex.html"
    login_url = "login/"
    redirect_field_name = "app:home"

    def get(self, request):
        return render(request, self.template_name, {})

    def post(self, request):
        term = json.loads(request.body)["term"]
        res = tpb.search_dict(term)
        return JsonResponse({"term": term, "rows": res})


class ManageView(LoginRequiredMixin, TemplateView):
    template_name = "manage.html"
    login_url = "login/"
    redirect_field_name = "app:home"


class ResumeView(TemplateView):
    template_name = "resume.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["experience"] = Experience.objects.all()
        context["education"] = Education.objects.all()
        return context


class Login(LoginView):
    template_name = "login.html"
    redirect_authenticated_user = True

    # def get(self, request):
    #     if request.user.is_authenticated:
    #         return redirect(reverse("app:plex"))
    #     return super().get(request)
        
    # def post(self, request):
    #     form = AuthenticationForm(request)
    #     print(form.is_valid())
    #     print(authenticate(username=form.username, password=form.password))
    #     if form.is_valid() and authenticate(username=form.username, password=form.password):
    #         login(request, user)
    #         return redirect(reverse("app:plex"))
    #     print(form.errors)
    #     return HttpResponse(status=401)


class Logout(View):
    def get(self, request):
        logout(request)
        return redirect(reverse("app:login"))
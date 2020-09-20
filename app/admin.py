from django.contrib import admin
from .models import Education, Experience


class ExperienceAdmin(admin.ModelAdmin):
    pass


class EducationAdmin(admin.ModelAdmin):
    pass


admin.site.register(Experience, ExperienceAdmin)
admin.site.register(Education, EducationAdmin)

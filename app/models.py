from django.db import models

class Experience(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class Education(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
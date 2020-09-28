from django.db import models


class Download(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    magnet = models.TextField()
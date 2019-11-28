from django.conf import settings
from django.db import models


class Place(models.Model):
    place_id = models.CharField(max_length=30, unique=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='places', on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=200)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=30, null=True)
    zip = models.IntegerField(null=True)
    country = models.CharField(max_length=30)
    longitude = models.FloatField(null=True)
    latitude = models.FloatField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created']
        db_table = 'place'

    def __str__(self):
        return self.name

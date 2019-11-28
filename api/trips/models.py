from django.conf import settings
from django.db import models


class Event(models.Model):
    event_id = models.CharField(max_length=30, unique=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='events', on_delete=models.CASCADE, null=True)
    time = models.TimeField(null=True)
    trip = models.ForeignKey('trips.Trip', related_name="events", on_delete=models.CASCADE)
    place = models.ForeignKey('places.Place', related_name='events', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['time']
        db_table = 'event'

    def __str__(self):
        return "Event at " + self.place.name


class Trip(models.Model):
    trip_id = models.CharField(max_length=30, unique=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='trips', on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=100, blank=True)
    summary = models.CharField(max_length=300, blank=True)
    date = models.DateField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-modified']
        db_table = 'trip'

    def __str__(self):
        return "trip id: " + self.trip_id

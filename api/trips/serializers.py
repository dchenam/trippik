from rest_framework import serializers

from places.models import Place
from places.serializers import PlaceReadSerializer
from .models import Event, Trip


class EventReadSerializer(serializers.ModelSerializer):
    place = PlaceReadSerializer()

    class Meta:
        model = Event
        fields = ['event_id', 'place', 'time']


class EventWriteSerializer(serializers.ModelSerializer):
    event_id = serializers.CharField(read_only=True)
    place = serializers.SlugRelatedField(queryset=Place.objects.all(), slug_field='place_id')

    class Meta:
        model = Event
        fields = ['event_id', 'place', 'time']


class TripSerializer(serializers.ModelSerializer):
    trip_id = serializers.CharField(read_only=True)
    events = EventReadSerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = ['trip_id', 'owner', 'name', 'summary', 'date', 'events']
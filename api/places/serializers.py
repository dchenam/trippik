from rest_framework import serializers

from reviews.serializers import ReviewSerializer
from .models import Place


class PlaceReadSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField()

    def get_location(self, place):
        if place.address:
            return {
                "address": place.address,
                "city": place.city,
                "state": place.state,
                "zip": place.zip,
                "country": place.country,
                "display_address": get_display_address(place)
            }

    class Meta:
        model = Place
        fields = ['place_id', 'name', 'description', 'location']


class PlaceWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['name', 'description', 'address', 'city', 'country', 'state', 'zip']


class PlaceDetailSerializer(serializers.ModelSerializer):
    owner = serializers.CharField(source='owner.username')
    location = serializers.SerializerMethodField()
    reviews = ReviewSerializer(many=True, required=False, allow_null=True)

    def get_location(self, place):
        if place.address:
            return {
                "address": place.address,
                "city": place.city,
                "state": place.state,
                "zip": place.zip,
                "country": place.country,
                "display_address": get_display_address(place)
            }

    class Meta:
        model = Place
        fields = ['place_id', 'owner', 'name', 'description', 'location', 'reviews']


def get_display_address(place):
    if place.state and place.zip:
        return "{}, {}, {} {}, {}".format(place.address, place.city, place.state, place.zip, place.country)
    return "{}, {}, {}".format(place.address, place.city, place.country)

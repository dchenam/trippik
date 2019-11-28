from rest_framework import serializers

from reviews.serializers import ReviewSerializer
from .models import Place


class PlaceReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['place_id', 'name', 'description']


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
            }

    class Meta:
        model = Place
        fields = ['place_id', 'owner', 'name', 'description', 'location', 'reviews']

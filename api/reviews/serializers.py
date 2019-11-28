from rest_framework import serializers
from rest_framework_extensions.mixins import NestedViewSetMixin

from .models import Review


class ReviewSerializer(NestedViewSetMixin, serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Review
        fields = ['owner', 'place', 'rating', 'text']

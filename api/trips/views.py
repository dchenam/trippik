from django.utils.crypto import get_random_string
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_extensions.mixins import NestedViewSetMixin

from .models import Trip, Event
from .serializers import TripSerializer, EventWriteSerializer, EventReadSerializer


class TripViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    lookup_field = 'trip_id'
    serializer_class = TripSerializer

    def list(self, request, *args, **kwargs):
        owner = None if self.request.user.is_anonymous else self.request.user
        queryset = self.get_queryset().filter(owner=owner)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def save(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.owner is None:
            instance.owner = request.user
            instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def perform_create(self, serializer):
        unique_id = get_random_string(length=16)
        return serializer.save(trip_id=unique_id)


class EventViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Event.objects.all()
    lookup_field = 'event_id'

    def get_serializer_class(self):
        if self.action == 'create' or self.action == 'update':
            return EventWriteSerializer
        else:
            return EventReadSerializer

    def create(self, request, parent_lookup_trip__trip_id=None, *args, **kwargs):
        write_serializer = EventWriteSerializer(data=request.data)
        write_serializer.is_valid(raise_exception=True)
        instance = self.perform_create(write_serializer, parent_lookup_trip__trip_id)
        read_serializer = EventReadSerializer(instance)
        headers = self.get_success_headers(read_serializer.data)
        return Response(read_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer, *args, **kwargs):
        trip_id = args[0]
        trip = Trip.objects.get(trip_id=trip_id)
        unique_id = get_random_string(length=16)
        if self.request.user.is_anonymous:
            return serializer.save(event_id=unique_id, trip=trip)
        return serializer.save(owner=self.request.user, event_id=unique_id, trip=trip)

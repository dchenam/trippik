from django.utils.crypto import get_random_string
from rest_framework import filters
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework_extensions.mixins import NestedViewSetMixin

from api.permissions import IsOwnerOrReadOnly
from .models import Place
from .serializers import PlaceReadSerializer, PlaceWriteSerializer, PlaceDetailSerializer


# Create your views here.
class PlaceViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Place.objects.all()
    filter_backends = [filters.SearchFilter]
    lookup_field = 'place_id'
    search_fields = ['name', 'description', 'city']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return PlaceReadSerializer
        elif self.action == 'create' or self.action == 'update':
            return PlaceWriteSerializer
        else:
            return PlaceDetailSerializer

    def create(self, request, *args, **kwargs):
        write_serializer = PlaceWriteSerializer(data=request.data)
        write_serializer.is_valid(raise_exception=True)
        instance = self.perform_create(write_serializer)
        read_serializer = PlaceReadSerializer(instance)
        return Response(read_serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        unique_id = get_random_string(length=16)
        if self.request.user.is_anonymous:
            return serializer.save(place_id=unique_id)
        return serializer.save(owner=self.request.user, place_id=unique_id)
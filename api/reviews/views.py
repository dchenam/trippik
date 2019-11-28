from rest_framework import viewsets
from rest_framework_extensions.mixins import NestedViewSetMixin

from .models import Review
from .serializers import ReviewSerializer


class ReviewViewSet(NestedViewSetMixin, viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        if self.request.user.is_anonymous:
            return serializer.save()
        return serializer.save(owner=self.request.user)

from rest_framework_extensions.routers import ExtendedSimpleRouter

from places.views import PlaceViewSet
from reviews.views import ReviewViewSet

router = ExtendedSimpleRouter()

router.register(r'places', PlaceViewSet) \
    .register(r'reviews', ReviewViewSet, basename='place-reviews', parents_query_lookups=['place'])
urlpatterns = router.urls

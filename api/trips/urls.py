from rest_framework_extensions.routers import ExtendedSimpleRouter

from . import views

router = ExtendedSimpleRouter()
router.register(r'trips', views.TripViewSet) \
    .register(r'events', views.EventViewSet, basename="trip-events", parents_query_lookups=["trip__trip_id"])

urlpatterns = router.urls

from django.conf.urls import include
from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', views.api_root),
    path('api/', include('reviews.urls')),
    path('api/', include('trips.urls')),
    path('api/', include('places.urls')),
    path('api/users/', include('users.urls')),
    path('api/accounts/', include('rest_auth.urls')),
    path('api/accounts/registration/', include('rest_auth.registration.urls')),
    re_path(".*", TemplateView.as_view(template_name="index.html"))
]

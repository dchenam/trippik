from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'trips': reverse('trip-list', request=request, format=format),
        'places': reverse('place-list', request=request, format=format),
        'reviews': reverse('review-list', request=request, format=format),
        'users': reverse('user-list', request=request, format=format),
        'login': reverse('rest_login', request=request, format=format),
        'logout': reverse('rest_logout', request=request, format=format),
        'user': reverse('rest_user_details', request=request, format=format),
        'password-change': reverse('rest_password_change', request=request, format=format),
        'registration': reverse('rest_register', request=request, format=format)
    })

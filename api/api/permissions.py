from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permissions to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # always allows read permissions, allow GET, HEAD, OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions only allowed to the owner of the object.
        return obj.owner == request.user


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.owner is None:
            return True
        return obj.owner == request.user

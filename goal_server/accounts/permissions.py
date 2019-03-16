from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    def has_permission(self, request, view):
        context_kwargs = request.parser_context['kwargs']
        if 'pk' not in context_kwargs:
            return False

        return request.user.pk == int(context_kwargs['pk'])

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .models import UserDetails
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from .serializers import UserDetailsSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import mixins
from .permissions import IsOwner
from games.models import Game


class UserDetailsViewSet(mixins.CreateModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin,
                         viewsets.GenericViewSet):
    permission_classes = (IsAuthenticated, IsOwner)
    queryset = UserDetails.objects.all()
    serializer_class = UserDetailsSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        data['username'] = instance.user.username
        data['email'] = instance.user.email
        data.pop('user')
        return Response(data)

    def get_permissions(self):
        if self.action == 'retrieve' or self.action == None:  # None coz we dont have list mixin
            permission_classes = (IsAuthenticated,)
        else:
            permission_classes = (IsAuthenticated, IsOwner)

        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@receiver(post_save, sender=Game)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        user = instance.owner
        user.details.created_events_number = user.details.created_events_number + 1
        user.details.save()


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
        })

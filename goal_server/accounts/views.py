from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .models import UserDetails
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_delete
from django.db.models import F
from django.contrib.auth.models import User
from .serializers import UserDetailsSerializer
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework import mixins
from .permissions import IsOwner
from games.models import Game
# import rest_auth
from rest_auth.views import LoginView


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


@receiver(pre_delete, sender=Game)
def update_user_score_after_game_delete(sender, instance=None, **kwargs):
    if instance:
        owner = instance.owner
        owner.details.created_events_number = owner.details.created_events_number - 1
        owner.details.save()

        other_players = instance.players.exclude(id=owner.id).all()
        for player in other_players:
            player.details.joined_events_number = player.details.joined_events_number - 1
            player.details.save()


class ExtraDetailsLoginView(LoginView):
    def get_response(self):
        data = super().get_response().data
        data['user_id'] = self.user.id
        return Response(data=data, status=status.HTTP_200_OK)

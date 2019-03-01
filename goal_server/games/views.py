from .serializers import GameSerializer, PlayingFieldSerializer, LatLngSerializer, UniqueNameSerializer, UsernameSerializer
from .models import Game, Playing_Field
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action, renderer_classes
from rest_framework.renderers import JSONRenderer
from django.contrib.auth.models import User


def bad_request(serializer):
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    queryset = Game.objects.all()
    permission_classes = [AllowAny]

    @staticmethod
    def getGamesWithFields(gameQueryset):
        return [{'game': GameSerializer(game).data, 'playing_field': PlayingFieldSerializer(game.playing_field).data}
                       for game in gameQueryset]

    @action(detail=False, methods=['get'])
    def get_near_games(self, request):
        serializer = LatLngSerializer(data=request.query_params)
        if not serializer.is_valid():
            return bad_request(serializer)

        lng, lat = float(serializer.data['longitude']), float(
            serializer.data['latitude'])
        radius = 1  # converting kilometers to degrees

        near_games = (Game.objects.filter(playing_field__longitude__range=(lng-radius, lng+radius))
                                  .filter(playing_field__latitude__range=(lat-radius, lat+radius))).prefetch_related('playing_field')

        return Response({'near_games': GameViewSet.getGamesWithFields(near_games)}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def get_users_games(self, request):
        serializer = UsernameSerializer(data=request.query_params)
        if not serializer.is_valid():
            return bad_request(serializer)

        user = User.objects.get(username=serializer.data['username'])
        users_games = user.game_set.prefetch_related('playing_field')
        return Response({'users_games': GameViewSet.getGamesWithFields(users_games)}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def is_name_unique(self, request):
        serializer = UniqueNameSerializer(data=request.query_params)
        if not serializer.is_valid():
            return bad_request(serializer)

        name = serializer.data['name']  # converting kilometers to degrees

        exists = Game.objects.filter(name=name).exists()

        return Response({'exists': exists}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def add_player(self, request, pk=None):
        game = self.get_object()
        if game.players.count() >= game.players_number:
            return Response({
                'error': 'Maxiumum number of players reached'},
                status=status.HTTP_400_BAD_REQUEST
            )
        if game.players.filter(username=(request.user.username)).exists():
            return Response({
                'error': 'There already exist player with that name'},
                status=status.HTTP_400_BAD_REQUEST
            )

        game.players.add(request.user)
        game.save()

        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def remove_player(self, request, pk=None):
        '''
        TODO: allow game owner to remove players
        TODO: allow admin to remove players
        '''
        serializer = UsernameSerializer(data=request.data)
        if not serializer.is_valid():
            return bad_request(serializer)

        username = serializer.data['username']
        if username != request.user.username:
            return Response(
                {'error': 'You cannot remove this player'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        game = self.get_object()
        player = game.players.filter(username=username).first()
        if player is None:
            return Response(
                {'error': 'There is no player with this name'},
                status=status.HTTP_400_BAD_REQUEST
            )

        game.players.remove(request.user)
        game.save()

        return Response(status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save()
        # serializer.save(players=[self.request.user]) UNCOMMENT WHEN AUTHENTICATION IS READY


class FieldsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing accounts.
    """
    queryset = Playing_Field.objects.all()
    serializer_class = PlayingFieldSerializer

    @action(detail=False, methods=['get'])
    @renderer_classes((JSONRenderer,))
    def get_near_fields(self, request):
        serializer = LatLngSerializer(data=request.query_params)
        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

        lng, lat = float(serializer.data['longitude']), float(
            serializer.data['latitude'])
        radius = 1

        near_fields = (Playing_Field.objects.filter(longitude__range=(lng-radius, lng+radius))
                       .filter(latitude__range=(lat-radius, lat+radius))).values()

        return Response({'near_fields': near_fields}, status=status.HTTP_200_OK)

from django.shortcuts import get_object_or_404
from .serializers import GameSerializer, PlayingFieldSerializer, NearGamesSerializer
from .models import Game, Playing_Field
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action


class GameViewSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer
    queryset = Game.objects.all()
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def get_near_games(self, request):
        serializer = NearGamesSerializer(data=request.query_params)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        lng, lat = float(serializer.data['longitude']), float(serializer.data['latitude'])
        radius = serializer.data['radius_km'] / 110  # converting kilometers to degrees

        near_games = (Game.objects.filter(playing_field__longitude__range=(lng-radius, lng+radius))
                                  .filter(playing_field__latitude__range=(lat-radius, lat+radius)))

        return Response({'near_games': near_games}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def add_player(self, request, pk=None):
        game = self.get_object()
        if game.players.count() >= game.players_number:
            return Response({'error': 'Maxiumum number of players reached'}, status=status.HTTP_400_BAD_REQUEST)
        if game.players.filter(username=(request.user.username)).count() > 0:
            return Response({'error': 'There already exist player with that name'}, status=status.HTTP_400_BAD_REQUEST)

        game.players.add(request.user)
        game.save()

        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['patch'])
    def delete_player(self, request, pk=None):
        game = self.get_object()
        player = game.players.filter(username=(request.user.username)).first()
        if not player:
            return Response({'error': 'There is no player with this name'}, status=status.HTTP_400_BAD_REQUEST)

        game.players.remove(request.user)
        game.save()

        return Response(status=status.HTTP_200_OK)
        

    def perform_create(self, serializer):
        serializer.save(players=[self.request.user])


class FieldsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing accounts.
    """
    queryset = Playing_Field.objects.all()
    serializer_class = PlayingFieldSerializer

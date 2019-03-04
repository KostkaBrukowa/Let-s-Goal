from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from django.utils import timezone


from .models import Game, Playing_Field
from django.contrib.auth.models import User


# Create your tests here.

def create_game(name, **kwargs):
    date = kwargs.pop('date', timezone.now())
    players_number = kwargs.pop('players_number', 5)
    playing_field = kwargs.pop(
        'playing_field',  Playing_Field.objects.get(pk=1))
    players = kwargs.pop('players', [])
    owner = kwargs.pop('owner', User.objects.get(pk=1))

    game = Game.objects.create(
        name=name,
        date=date,
        players_number=players_number,
        playing_field=playing_field,
        owner=owner,
    )
    game.players.set(players)
    return game


class GamesTests(APITestCase):
    def setUp(self):
        User.objects.create_user('Alex', 'alex@gmail.com', 'password')
        User.objects.create_user('Mark', 'floy1980@hotmail.com', 'password')
        User.objects.create_user('Henry', 'fannie1994@gmail.com', 'password')
        User.objects.create_user('Mike', 'rosella1991@hotmail.com', 'password')

        fields = [(10, 10, 'Koszykowa'),
                  (20, 20, 'Wilcza'),
                  (40, 40, 'Nowowiejska')]

        self.field1 = Playing_Field.objects.create(
            street=fields[0][2], owner='MOSIR', latitude=fields[0][0], longitude=fields[0][1], price_per_hour=100)
        field2 = Playing_Field.objects.create(
            street=fields[1][2], owner='MOSIR', latitude=fields[1][0], longitude=fields[1][1], price_per_hour=110)
        field3 = Playing_Field.objects.create(
            street=fields[2][2], owner='MOSIR', latitude=fields[2][0], longitude=fields[2][1], price_per_hour=120)

        self.game1 = create_game(
            name='game1', players_number=1, playing_field=self.field1)
        self.game2 = create_game(name='game2', playing_field=field2)
        self.game3 = create_game(name='game3', playing_field=field3)

        self.client.login(username='Alex', password='password')
        # self.client.force_authenticate(user=User.objects.get(pk=1))

    def test_get_game(self):
        """
        testing if simple get request with id works
        """
        create_game(name='game4')

        response = self.client.get('/games/4/')

        self.assertEqual(response.data['id'], 4)
        self.assertEqual(response.data['playing_field'], 1)

    # UNCOMMENT WHEN AUTHENTICATION READY
    def test_post_game(self):
        game = {
            'name': 'test_name',
            'date': timezone.now(),
            'players_number': 2,
            'playing_field': 1,
        }

        response = self.client.post('/games/', data=game, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['owner'], 1)
        self.assertEqual(response.data['players'], [1, ])

    def test_update_game(self):
        '''
        testing simple addition of player to a game
        '''
        response = self.client.patch('/games/1/add_player/', format='json')

        game = Game.objects.get(pk=1)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(game.players.count(), 1)
        self.assertEqual(game.players.first().username, 'Alex')

    def test_update_game_with_no_available_space(self):
        '''
        testing adding a player when there is no available space
        '''
        game = create_game(name='game4', players_number=1)
        game.players.add(User.objects.get(pk=3))

        response = self.client.patch('/games/4/add_player/', format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data['error'], 'Maxiumum number of players reached'
        )

    def test_adding_player_when_same_exists(self):
        '''
        testing adding a player when there is no available space
        '''
        self.game2.players.add(User.objects.get(pk=1))

        response = self.client.patch('/games/2/add_player/', format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data['error'], 'There already exist player with that name'
        )

    def test_remove_player(self):
        '''
        testing removing currently logged player from a game
        '''
        self.game2.players.add(User.objects.get(pk=1))

        response = self.client.patch(
            '/games/2/remove_player/',
            data={'username': 'Alex'},
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(self.game2.players.exists())

    def test_remove_player_when_no_players(self):
        '''
        testing removing currently logged player from a game when one
        is not signed to a game
        '''

        response = self.client.patch(
            '/games/2/remove_player/',
            data={'username': 'Alex'},
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data['error'], 'There is no player with this name'
        )

    def test_remove_other_player(self):
        '''
        testing removing other player that one that's logged in
        '''
        response = self.client.patch(
            '/games/2/remove_player/',
            data={'username': 'Henry'},
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            response.data['error'], 'You cannot remove this player'
        )

    def test_get_users_games(self):
        user = User.objects.get(username="Alex")
        create_game(name='game4', players=[user.pk])
        create_game(name='game5', players=[user.pk])
        create_game(name='game6', players=[])

        response = self.client.get(
            '/games/get_users_games/', data={'username': 'Alex'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['users_games']), 2)

    def test_get_near_games(self):
        """
        testting viewset action to retrieve games from certain area
        """
        data = {'longitude': 20, 'latitude': 20}

        response = self.client.get(
            '/games/get_near_games/', data=data)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['near_games']), 1)
        self.assertEqual(response.data['near_games']
                         [0]['playing_field']['id'], 2)


class PlayingFieldTests(APITestCase):
    def test_get_field(self):
        """
        testing if simple get request with id works
        """
        Playing_Field.objects.create(
            street='street',
            owner='MOSIR',
            latitude=10, longitude=20,
            price_per_hour=100
        )
        response = self.client.get('/fields/1/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], 1)

    def test_list_fields(self):
        """
        testing if simple get request with id works
        """
        Playing_Field.objects.create(
            street='street1', owner='MOSIR', latitude=10, longitude=20, price_per_hour=100)
        Playing_Field.objects.create(
            street='street2', owner='MOSIR', latitude=20, longitude=30, price_per_hour=110)
        Playing_Field.objects.create(
            street='street3', owner='MOSIR', latitude=30, longitude=40, price_per_hour=120)

        response = self.client.get('/fields/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 3)

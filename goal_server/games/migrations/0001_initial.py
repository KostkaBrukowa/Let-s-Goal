# Generated by Django 2.1.7 on 2019-02-16 12:34

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('date', models.DateTimeField(verbose_name='When a game starts')),
                ('players_number', models.IntegerField(verbose_name='Number of players')),
                ('players', models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Playing_Field',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(max_length=100)),
                ('owner', models.CharField(max_length=100)),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('price_per_hour', models.IntegerField(verbose_name='Price per hour')),
            ],
        ),
        migrations.AddField(
            model_name='game',
            name='playing_field',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='games.Playing_Field'),
        ),
    ]

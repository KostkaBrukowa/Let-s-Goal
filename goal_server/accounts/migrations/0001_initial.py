# Generated by Django 2.1.7 on 2019-03-11 07:59

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_events_number', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('joined_events_number', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)])),
                ('birth_date', models.DateField(null=True)),
                ('address', models.CharField(max_length=50, null=True)),
                ('prefered_position', models.CharField(max_length=50, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='details', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

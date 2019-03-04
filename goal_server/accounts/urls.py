from django.urls import path, include
from .views import CustomAuthToken

urlpatterns = [
    path('get_token/', CustomAuthToken.as_view())
]

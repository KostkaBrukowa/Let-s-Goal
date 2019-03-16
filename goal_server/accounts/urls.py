from django.urls import path, include
from .views import CustomAuthToken
import rest_auth

urlpatterns = [
    path('get_token/', CustomAuthToken.as_view()),
    path('rest_auth/', include('rest_auth.urls')),
    path('rest_auth/registration/', include('rest_auth.registration.urls')),
]

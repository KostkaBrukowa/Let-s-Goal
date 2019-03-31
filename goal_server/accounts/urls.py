from django.urls import path, include
from .views import UserDetailsViewSet
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.models import Token
import rest_auth


urlpatterns = [
    path('rest_auth/', include('rest_auth.urls')),
    path('rest_auth/registration/', include('rest_auth.registration.urls')),
]

router = DefaultRouter()
router.register(r'details', UserDetailsViewSet, basename='detail')

urlpatterns += router.urls

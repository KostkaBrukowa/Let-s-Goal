from django.urls import path, include
from .views import CustomAuthToken, UserDetailsViewSet
from rest_framework.routers import DefaultRouter
import rest_auth


urlpatterns = [
    path('rest_auth/', include('rest_auth.urls')),
    path('rest_auth/registration/', include('rest_auth.registration.urls')),
    path('rest_auth/log_in/', CustomAuthToken.as_view()),
]


router = DefaultRouter()
router.register(r'details', UserDetailsViewSet, basename='detail')

urlpatterns += router.urls

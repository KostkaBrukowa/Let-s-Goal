from django.urls import path, include
from .views import UserDetailsViewSet, ExtraDetailsLoginView
from rest_framework.routers import DefaultRouter
import rest_auth


urlpatterns = [
    # path('rest_auth/', include('rest_auth.urls')),
    path('rest_auth/login/', ExtraDetailsLoginView.as_view(), name='rest_login'),
    path('rest_auth/registration/', include('rest_auth.registration.urls')),
]

router = DefaultRouter()
router.register(r'details', UserDetailsViewSet, basename='detail')

urlpatterns += router.urls

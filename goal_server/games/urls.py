from .views import GameViewSet,FieldsViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'games', GameViewSet, basename='game')
router.register(r'fields', FieldsViewSet, basename='field')

urlpatterns = router.urls
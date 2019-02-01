from rest_framework import routers
from request.viewsets import RequestViewSet

router = routers.DefaultRouter()
router.register(r'request', RequestViewSet)

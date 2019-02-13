from rest_framework import viewsets
from .models import ServiceManager
from .serializers import ServiceManagerSerializer


class ServiceManagerViewSet(viewsets.ModelViewSet):
    queryset = ServiceManager.objects.all()
    serializer_class = ServiceManagerSerializer

from rest_framework import viewsets
from django_filters import rest_framework as filters
from .models import ServiceManager
from .serializers import ServiceManagerSerializer

class ServiceManagerFilter(filters.FilterSet):
    manager = filters.CharFilter(field_name="manager")

    class Meta:
        model  = ServiceManager
        fields = ['manager']

class ServiceManagerViewSet(viewsets.ModelViewSet):
    queryset = ServiceManager.objects.all()
    serializer_class = ServiceManagerSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ServiceManagerFilter
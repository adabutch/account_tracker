from rest_framework import viewsets
from django_filters import rest_framework as filters
from .models import Service
from .serializers import ServiceSerializer

class ProfileFilter(filters.FilterSet):
    id = filters.NumberFilter(field_name="id")

    class Meta:
        model = Service
        fields = ['id']

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProfileFilter
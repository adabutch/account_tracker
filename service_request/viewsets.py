from rest_framework import viewsets
from django_filters import rest_framework as filters
from .models import ServiceRequest
from .serializers import ServiceRequestSerializer

class ServiceRequestFilter(filters.FilterSet):
    account_request = filters.CharFilter(field_name="account_request")

    class Meta:
        model  = ServiceRequest
        fields = ['account_request']


class ServiceRequestViewSet(viewsets.ModelViewSet):
    queryset = ServiceRequest.objects.all()
    serializer_class = ServiceRequestSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ServiceRequestFilter

from rest_framework import viewsets
from django_filters import rest_framework as filters
from .models import AccountRequest
from .serializers import AccountRequestSerializer

class ProfileFilter(filters.FilterSet):
    request_status = filters.CharFilter(field_name="request_status")

    class Meta:
        model = AccountRequest
        fields = ['request_status']


class AccountRequestViewSet(viewsets.ModelViewSet):
    queryset = AccountRequest.objects.all()
    serializer_class = AccountRequestSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProfileFilter

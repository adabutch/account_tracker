from rest_framework import viewsets
from django_filters import rest_framework as filters
from .models import DefaultProfile
from .serializers import DefaultProfileSerializer

class ProfileFilter(filters.FilterSet):
    department_id = filters.NumberFilter(field_name="department_id")
    group_id = filters.NumberFilter(field_name="group_id")

    class Meta:
        model = DefaultProfile
        fields = ['department_id', 'group_id']


class DefaultProfileViewSet(viewsets.ModelViewSet):
    queryset = DefaultProfile.objects.all()
    serializer_class = DefaultProfileSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProfileFilter
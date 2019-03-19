from rest_framework import viewsets
from django_filters import rest_framework as filters
from .models import Action
from .serializers import ActionSerializer

class ProfileFilter(filters.FilterSet):
    account = filters.NumberFilter(field_name="account")

    class Meta:
        model = Action
        fields = ['account']

class ActionViewSet(viewsets.ModelViewSet):
    queryset = Action.objects.all()
    serializer_class = ActionSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProfileFilter
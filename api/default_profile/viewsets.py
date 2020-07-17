from rest_framework import viewsets
from django_filters import rest_framework as filters
from .models import DefaultProfile
from .serializers import DefaultProfileSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from service.models import Service

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

    # https://stackoverflow.com/questions/50425262/django-rest-framework-pass-extra-parameter-to-actions
    @action(detail=True, methods=['post'], url_path='add_service/(?P<service_pk>[^/.]+)')
    def add_service(self, request, service_pk, pk=None):
        """
        TODO:
        restrict access to only certain admin levels
        """
        profile = self.get_object()
        service = get_object_or_404(Service, pk=service_pk)
        profile.services.add(service)
        profile.save()
        return Response("success")

    @action(detail=True, methods=['post'], url_path='remove_service/(?P<service_pk>[^/.]+)')
    def remove_service(self, request, service_pk, pk=None):
        """
        TODO:
        restrict access to only certain admin levels
        """
        profile = self.get_object()
        service = get_object_or_404(Service, pk=service_pk)
        profile.services.remove(service)
        profile.save()
        return Response("success")

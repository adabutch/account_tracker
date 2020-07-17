from rest_framework import viewsets
from django_filters import rest_framework as filters
from .models import Service
from .serializers import ServiceSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User


class ServiceFilter(filters.FilterSet):
    id = filters.NumberFilter(field_name="id")

    class Meta:
        model = Service
        fields = ['id']


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ServiceFilter

    # https://stackoverflow.com/questions/50425262/django-rest-framework-pass-extra-parameter-to-actions
    @action(detail=True, methods=['post'],
            url_path='add_manager/(?P<manager_pk>[^/.]+)')
    def add_manager(self, request, manager_pk, pk=None):
        """
        TODO:
        restrict access to only certain admin levels
        """
        profile = self.get_object()
        manager = get_object_or_404(User, pk=manager_pk)
        profile.managers.add(manager)
        profile.save()
        return Response("success")

    @action(detail=True, methods=['post'],
            url_path='remove_manager/(?P<manager_pk>[^/.]+)')
    def remove_manager(self, request, manager_pk, pk=None):
        """
        TODO:
        restrict access to only certain admin levels
        """
        profile = self.get_object()
        manager = get_object_or_404(User, pk=manager_pk)
        profile.managers.remove(manager)
        profile.save()
        return Response("success")

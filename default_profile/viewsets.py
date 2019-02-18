from rest_framework import viewsets
from .models import DefaultProfile
from .serializers import DefaultProfileSerializer


class DefaultProfileViewSet(viewsets.ModelViewSet):
    queryset = DefaultProfile.objects.all()
    serializer_class = DefaultProfileSerializer

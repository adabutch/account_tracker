from rest_framework import viewsets
from .models import TerminationRequest
from .serializers import TerminationRequestSerializer


class TerminationRequestViewSet(viewsets.ModelViewSet):
    queryset = TerminationRequest.objects.all()
    serializer_class = TerminationRequestSerializer

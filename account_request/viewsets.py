from rest_framework import viewsets
from .models import AccountRequest
from .serializers import AccountRequestSerializer


class AccountRequestViewSet(viewsets.ModelViewSet):
    queryset = AccountRequest.objects.all()
    serializer_class = AccountRequestSerializer

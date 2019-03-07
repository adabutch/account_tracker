from rest_framework import viewsets
from .models import AccountImage
from .serializers import AccountImageSerializer


class AccountImageViewSet(viewsets.ModelViewSet):
    queryset = AccountImage.objects.all()
    serializer_class = AccountImageSerializer

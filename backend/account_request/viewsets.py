from rest_framework import viewsets
from django_filters import rest_framework as filters
from .models import AccountRequest
from .serializers import AccountRequestSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from service_request.models import ServiceRequest
from service.models import Service
import requests
import json


class ProfileFilter(filters.FilterSet):
    request_status = filters.CharFilter(field_name="request_status")
    id = filters.NumberFilter(field_name="id")

    class Meta:
        model = AccountRequest
        fields = ['request_status', 'id']


class AccountRequestViewSet(viewsets.ModelViewSet):
    queryset = AccountRequest.objects.all()
    serializer_class = AccountRequestSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ProfileFilter

    @action(detail=True)
    def inprogress(self, request, *args, **kwargs):
        ar = self.get_object()

        def get_full_name(ar):

            if ar.nickname:
                beginning = "%s (%s)" % (ar.first_name, ar.nickname)
            else:
                beginning = ar.first_name

            if ar.middle_name:
                fn = "%s %s %s" % (beginning, ar.middle_name, ar.last_name)
            else:
                fn = "%s %s" % (beginning, ar.last_name)

            if ar.suffix:
                fn += " " + ar.suffix
            return fn

        ad_distinguishedName = ('CN=' + ar.first_name + ' ' + ar.last_name +
                                ',OU=' + 'Account Tests' +
                                ',OU=' + 'Departments' +
                                ',DC=' + 'cob' +
                                ',DC=' + 'bloomington' +
                                ',DC=' + 'in')

        ad_sAMAccountName   = (ar.first_name.lower() + '.' +
                               ar.last_name.lower())

        ad_mail             = (ar.first_name.lower() + '.' +
                               ar.last_name.lower() +
                               '@bloomington.in.gov')

        ad_payload = {
            "serialNumber":         ar.id,
            "sAMAccountName":       ad_sAMAccountName,
            "userPrincipalName":    ad_mail,
            "distinguishedName":    ad_distinguishedName,
            "givenName":            ar.first_name,
            "displayName":          get_full_name(ar),
            "sn":                   ar.last_name,
            "countryCode":          0,
            "mail":                 ad_mail,
            "telephoneNumber":      ar.employee_phone,
            "title":                ar.job,
            "department":           ar.department,
        }

        r = requests.post('https://dhcp-vm-218.bloomington.in.gov:5004/api/NovellDirectory', json=ad_payload)
        r.raise_for_status()
        print(ad_payload)
        print(r)
        print(r.text)
        print(r.json())

        service_list = json.loads(ar.requested_services)
        for service_id in service_list:
            # get the corresponding Service
            # to facilitate creating ServiceRequests
            service = Service.objects.get(id=service_id)
            existing = ServiceRequest.objects.filter(service=service, account_request=ar)
            # print(existing)
            # print(existing.count())
            if not existing.count():
                sr = ServiceRequest()
                sr.account_request = ar
                sr.service = service
                sr.type_of_change = 'grant'
                sr.request_status = 'pending'
                sr.save()
                # print("Created:", sr)

        # TODO:
        # This is where any automated tasks could be handled
        # (should still be tracked in a service request + actions)
        return Response(service_list)

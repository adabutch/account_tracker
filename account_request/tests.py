from django.test import TestCase
from .models import AccountRequest
from service_request.models import ServiceRequest
from service.models import Service
import json
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

#from rest_framework.test import APIRequestFactory
#from rest_framework.test import APIClient

class AccountTests(APITestCase):
    def test_create_account(self):
        """
        Ensure we can create a new account object.
        """
        url = reverse('account-request')
        print(url)
        data = {'name': 'DabApps'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AccountRequest.objects.count(), 1)
        self.assertEqual(AccountRequest.objects.get().name, 'DabApps')


class AccountRequestTestCase(TestCase):
    def setUp(self):
        ad = Service.objects.create(name="Active Directory",
                                    description="Service for testing")
        ServiceRequest.objects.create(service=ad, type_of_change="grant",
                                      request_status="new")
        AccountRequest.objects.create(first_name="Fred", last_name="Flintstone", employee_phone="123-867-5309", supervisor="boss", supervisor_phone="987-654-3210", department="mining", group="dino maintenance", job="rocks", employee_status="full-time", start_date="2019-01-01", request_status="new")

    def test_AccountRequest_has_Service(self):
        """If a AccountRequest already exists for a service, don't duplicate"""
        ad_service = Service.objects.get(name="Active Directory")
        service_ids = [ ad_service.id ]
        ar = AccountRequest.objects.get(first_name="Fred")
        ar.requested_services = json.dumps(service_ids)
        ar.save()
        # this should not create a duplicate service request
        # (one was already started in setUp)

        # Using the standard RequestFactory API to create a form POST request
        factory = APIClient()
        url = '/api/account-request/%s/pending' % ar.id
        print(url)
        request = factory.get(url)
        print("REQUEST:", request)

        #ar.pending()
        matches = ServiceRequest.objects.all().filter(service=ad_service)
        for match in matches:
            print("Match:", match)
        self.assertEqual(len(matches), 1)

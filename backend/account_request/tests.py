from django.test import TestCase
from .models import AccountRequest
from service_request.models import ServiceRequest
from service.models import Service
from .serializers import AccountRequestSerializer
import json

# from django.urls import reverse
# from rest_framework import status
# from rest_framework.test import APITestCase
# from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient

# class AccountTests(APITestCase):
#     def test_create_account(self):
#         """
#         Ensure we can create a new account object.
#         """
#         url = reverse('account-request')
#         print(url)
#         data = {'name': 'DabApps'}
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(AccountRequest.objects.count(), 1)
#         self.assertEqual(AccountRequest.objects.get().name, 'DabApps')
#


class AccountRequestTestCase(TestCase):
    def setUp(self):
        ad = Service.objects.create(name="Active Directory",
                                    description="Service for testing")
        ServiceRequest.objects.create(service=ad, type_of_change="grant",
                                      request_status="new")
        AccountRequest.objects.create(first_name="Fred", last_name="Flintstone", nickname="yabba dabba", suffix="Sr.", employee_phone="123-867-5309", supervisor="boss", supervisor_phone="987-654-3210", department="mining", group="dino maintenance", job="rocks", employee_status="full-time", start_date="2019-01-01", request_status="new")

    def test_full_name_method(self):
        # ars = AccountRequest.objects.all()
        ar = AccountRequest.objects.get(first_name="Fred")
        serializer = AccountRequestSerializer(ar)
        fn = serializer.get_full_name(ar)
        # seems like this should work, but:
        # AttributeError: 'AccountRequestSerializer' object has no attribute 'full_name'
        # fn = serializer.full_name
        self.assertEqual("Fred (yabba dabba) Flintstone Sr.", fn)

    def test_AccountRequest_has_Service(self):
        """
        If a AccountRequest already exists for a service, don't duplicate
        """
        # there should be a ServiceRequest for AD already,
        # but it's not tied to an AccountRequest
        ad_service = Service.objects.get(name="Active Directory")
        service_ids = [ad_service.id]
        ar = AccountRequest.objects.get(first_name="Fred")
        ar.requested_services = json.dumps(service_ids)
        ar.save()

        # this process should add a second ServiceRequest
        # Using the standard API to create a form POST request
        client = APIClient()
        url = '/api/account-request/%s/pending/' % ar.id
        # print(url)
        request = client.get(url)
        # print("REQUEST:", request)

        matches = ServiceRequest.objects.all().filter(service=ad_service)
        # print(matches)
        # print(len(matches))
        # for match in matches:
        #    print("Match:", match)
        self.assertEqual(len(matches), 2)

        # this should not create a duplicate service request
        client = APIClient()
        url = '/api/account-request/%s/pending/' % ar.id
        client.get(url)

        # if checks were preventing duplicates, should still be one
        matches = ServiceRequest.objects.filter(
            service=ad_service, account_request=ar)
        self.assertEqual(len(matches), 1)

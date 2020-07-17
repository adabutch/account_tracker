from .models import DefaultProfile
from service.models import Service
from rest_framework.test import APITestCase
from rest_framework import status


class DefaultProfileTests(APITestCase):
    def setUp(self):
        ad = Service.objects.create(name="Active Directory",
                                    description="Service for testing")
        self.profile = DefaultProfile.objects.create(
            name="ACME Department", description="Laugh factory",
            department_id="1", group_id="1")
        self.profile.services.add(ad)

    def test_add_service(self):
        """
        Ensure we can create a new account object.
        """
        # should just have one to start with
        self.assertEqual(self.profile.services.count(), 1)
        mock = Service.objects.create(
            name="Sample Service", description="Another service for testing")

        # url = reverse('account-request')
        url = '/api/profile/%s/add_service/%s/' % (self.profile.id, mock.id)
        print(url)
        data = {'name': ''}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(self.profile.services.count(), 2)

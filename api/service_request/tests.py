from django.test import TestCase
from .models import ServiceRequest
from service.models import Service


class ServiceRequestTestCase(TestCase):
    def setUp(self):
        ad = Service.objects.create(name="Active Directory",
                                    description="Service for testing")
        ServiceRequest.objects.create(service=ad, type_of_change="grant",
                                      request_status="new")

    def test_ServiceRequest_has_Service(self):
        """If a ServiceRequest already exists for a service, don't duplicate"""
        ad = Service.objects.get(name="Active Directory")
        matches = ServiceRequest.objects.all().filter(service=ad)
        self.assertEqual(len(matches), 1)

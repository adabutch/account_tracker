from rest_framework import routers
from employee.views import UserViewSet, CurrentUserViewSet
from account_request.viewsets import AccountRequestViewSet
from change_request.viewsets import ChangeRequestViewSet
from termination_request.viewsets import TerminationRequestViewSet
from service_request.viewsets import ServiceRequestViewSet
from service.viewsets import ServiceViewSet
from service_manager.viewsets import ServiceManagerViewSet
from default_profile.viewsets import DefaultProfileViewSet
from account_image.viewsets import AccountImageViewSet

router = routers.DefaultRouter()
router.register(r'employee', UserViewSet, basename='employee')
router.register(r'user', CurrentUserViewSet, basename='user')
router.register(r'profile', DefaultProfileViewSet)
router.register(r'image', AccountImageViewSet)
router.register(r'account-request', AccountRequestViewSet)
router.register(r'change-request', ChangeRequestViewSet)
router.register(r'termination-request', TerminationRequestViewSet)
router.register(r'service-request', ServiceRequestViewSet)
router.register(r'service', ServiceViewSet)
router.register(r'service-manager', ServiceManagerViewSet)

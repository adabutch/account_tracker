from rest_framework import routers
from employee.views import UserViewSet, CurrentUserViewSet
from account_request.viewsets import AccountRequestViewSet
from change_request.viewsets import ChangeRequestViewSet
from termination_request.viewsets import TerminationRequestViewSet
from service_request.viewsets import ServiceRequestViewSet
from service.viewsets import ServiceViewSet
from default_profile.viewsets import DefaultProfileViewSet
from action.viewsets import ActionViewSet

router = routers.DefaultRouter()
router.register(r'employee', UserViewSet, basename='employee')
router.register(r'user', CurrentUserViewSet, basename='user')
router.register(r'profile', DefaultProfileViewSet)
router.register(r'action', ActionViewSet)
router.register(r'account-request', AccountRequestViewSet)
router.register(r'change-request', ChangeRequestViewSet)
router.register(r'termination-request', TerminationRequestViewSet)
router.register(r'service-request', ServiceRequestViewSet)
router.register(r'service', ServiceViewSet)

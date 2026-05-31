from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import create_appointment, CheckAvailability, AppointmentViewSet,AppointmentDetail

router = DefaultRouter()
router.register(r'viewset', AppointmentViewSet, basename='appointments-viewset')

urlpatterns = [
    path('create/', create_appointment, name='create_appointment'),
    path('check-availability/', CheckAvailability.as_view(), name='check_availability'),
    path('<int:pk>/', AppointmentDetail.as_view()),     
     

    # All ViewSet routes
    path('', include(router.urls)),
]

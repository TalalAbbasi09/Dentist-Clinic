from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from .models import Appointment

from .serializers import AppointmentSerializer
import requests



# ---------------------------
# Create Appointment + Send to n8n
# ---------------------------
@api_view(['POST'])
def create_appointment(request):
    print(request.data)
    serializer = AppointmentSerializer(data=request.data)
    
    if serializer.is_valid():
        appointment = serializer.save()

        # Send data to n8n webhook
        webhook_url = "http://localhost:5678/webhook-test/send-whatsapp"   # <-- your n8n webhook URL

        payload = {
            "name": appointment.full_name,
            "phone": appointment.phone,
            "date": str(appointment.date),
            "time_slot": appointment.time_slot
        }
        try:
            requests.post(webhook_url, json=payload)
        except Exception as e:
            print("Error sending data to n8n:", str(e))

        return Response({"message": "Appointment created & WhatsApp sent!"}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# ---------------------------
# Check Slot Availability
# ---------------------------
class CheckAvailability(APIView):
    def get(self, request):
        date = request.GET.get("date")
        if not date:
            return Response({"error": "Date required"}, status=400)

        booked_slots = Appointment.objects.filter(date=date).values_list("time_slot", flat=True)
        all_slots = [slot[0] for slot in Appointment.TIME_SLOTS]
        available = [slot for slot in all_slots if slot not in booked_slots]

        return Response({"available_slots": available})



# ---------------------------
# Alternate Appointment API
# ---------------------------
class AppointmentAPI(APIView):
    def post(self, request):
        serializer = AppointmentSerializer(data=request.data)

        if serializer.is_valid():
            appointment = serializer.save()

            # ---- SEND DATA TO N8N WORKFLOW ----
            n8n_webhook_url = "https://YOUR-N8N-URL/webhook/appointment"  # <--- SAME URL

            try:
                requests.post(n8n_webhook_url, json=serializer.data)
            except Exception as e:
                print("Error sending to n8n:", e)
            # ------------------------------------

            return Response({"message": "Appointment created"}, status=201)

        return Response(serializer.errors, status=400)

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    
class AppointmentDetail(RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
        
@api_view(['GET'])
def list_appointments(request):
    from .models import Appointment
    from .serializers import AppointmentSerializer

    appointments = Appointment.objects.all().order_by('-id')
    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)
    
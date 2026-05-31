#this will create model

from django.db import models


class Appointment(models.Model):

    # 1. Service choices (dropdown)
    SERVICE_CHOICES = [
        ('cleaning', 'Teeth Cleaning'),
        ('whitening', 'Teeth Whitening'),
        ('root_canal', 'Root Canal Treatment'),
        ('braces', 'Braces Consultation'),
        ('checkup', 'General Checkup'),
    ]

    # 2. Time slots (shown only after "Check Slot Availability")
    TIME_SLOTS = [
        ('09:00-10:00', '09:00 AM - 10:00 AM'),
        ('10:00-11:00', '10:00 AM - 11:00 AM'),
        ('11:00-12:00', '11:00 AM - 12:00 PM'),
        ('14:00-15:00', '02:00 PM - 03:00 PM'),
        ('15:00-16:00', '03:00 PM - 04:00 PM'),
    ]

    # -----------------------------
    #    DATABASE TABLE FIELDS
    # -----------------------------

    service = models.CharField(
        max_length=50,
        choices=SERVICE_CHOICES
    )

    date = models.DateField()

    # time slot chosen AFTER "check availability"
    time_slot = models.CharField(
        max_length=20,
        choices=TIME_SLOTS
    )

    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    email = models.EmailField()

    def __str__(self):
        return f"{self.full_name} - {self.service} on {self.date} at {self.time_slot}"


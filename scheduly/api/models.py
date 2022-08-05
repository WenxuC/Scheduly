from django.db import models
from datetime import datetime

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=200, blank=False)
    description = models.TextField(null=True, blank=True)
    start_time = models.DateField(default=datetime.now, blank=True)
    end_time = models.DateField(null=True, blank=True)
    daily = models.BooleanField(default=False)
    weekly = models.BooleanField(default=False)
    monthly = models.BooleanField(default=False)

    def __str__(self):
        return self.title
from django.db import models

class CSVFile(models.Model):
    name = models.CharField(max_length=255)
    file_type = models.CharField(max_length=100, default='text/csv')
    file_size = models.BigIntegerField(default=0)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class CSVData(models.Model):
    name = models.CharField(max_length=255)
    government_id = models.CharField(max_length=255)
    email = models.EmailField()
    debt_amount = models.DecimalField(max_digits=10, decimal_places=2)
    debt_due_date = models.DateField()
    debt_id = models.UUIDField()

    def __str__(self):
        return self.name
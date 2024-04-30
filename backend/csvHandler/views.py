import random
from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import CSVFile, CSVData
from .serializers import CSVFileSerializer
import pandas as pd

from django.utils import timezone
from datetime import timedelta
from django.core.mail import send_mail

class ManageImports(APIView):
    def get(self, request):
        csv_files = CSVFile.objects.all()
        serializer = CSVFileSerializer(csv_files, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        if file.content_type not in ['text/csv', 'application/vnd.ms-excel']:
            return Response({'error': 'File is not a CSV'}, status=status.HTTP_400_BAD_REQUEST)
        
        df = pd.read_csv(file)

        temp_csv_path = '/tmp/modified_upload.csv'
        df.to_csv(temp_csv_path, index=False, header=True)

        sql = """
        COPY "csvHandler_csvdata" (name, government_id, email, debt_amount, debt_due_date, debt_id)
        FROM STDIN WITH (FORMAT csv, HEADER true, DELIMITER ',')
        """

        with connection.cursor() as cursor:
            with open(temp_csv_path, 'r') as f:
                cursor.copy_expert(sql=sql, file=f)
        
        csv_file = CSVFile.objects.create(
            name=file.name,
            file_type=file.content_type,
            file_size=file.size,
        )

        return Response({'id': csv_file.id, 'status': 'Upload complete'}, status=status.HTTP_201_CREATED)
    

class ManageInvoices(APIView):
    def post(self, request):
        today = timezone.now().date()
        start_date = today - timedelta(days=30)
        end_date = today + timedelta(days=30)
        formatted_start_date = start_date.strftime('%d/%m/%Y')
        formatted_end_date = end_date.strftime('%d/%m/%Y')

        try:
            # Querying invoices within a date range of 30 days before and after today
            invoices = CSVData.objects.filter(debt_due_date__range=[start_date, end_date])[:10]
            if not invoices:
                return Response({"error": f"No invoices found within {formatted_start_date} and {formatted_end_date}!"}, status=status.HTTP_404_NOT_FOUND)
            
            emails_sent = []
            for invoice in invoices:
                barcode = ''.join([str(random.randint(0, 9)) for _ in range(13)])
                formatted_due_date = invoice.debt_due_date.strftime('%d/%m/%Y')
                message = f"Invoice for {invoice.name}\nAmount: {invoice.debt_amount}\nDue Date: {formatted_due_date}\nBarcode: {barcode}"
                if invoice.debt_due_date < today:
                    message += "\nStatus: Expired"
                
                # Simulating email sending
                send_mail(
                    subject="Invoice Details",
                    message=message,
                    from_email="no-reply@example.com",
                    recipient_list=[invoice.email],
                )
                emails_sent.append(invoice.email)

            invoice_count = len(emails_sent)
            
            return Response({"status": f"{invoice_count} Invoices sent for debts due between {formatted_start_date} and {formatted_end_date}!"})

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
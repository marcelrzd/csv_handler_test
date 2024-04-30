from rest_framework import serializers
from .models import CSVFile

class CSVFileSerializer(serializers.ModelSerializer):
    file_size_mb = serializers.SerializerMethodField()
    uploaded_at = serializers.SerializerMethodField("get_uploaded_at")


    class Meta:
        model = CSVFile
        fields = ['id', 'name', 'file_type', 'file_size', 'file_size_mb', 'uploaded_at']
        extra_kwargs = {
            'uploaded_at': {'source': 'uploaded_at', 'label': 'Uploaded At'}
        }

    def get_file_size_mb(self, obj):
        return round(obj.file_size / (1024 * 1024), 2)  # Converts bytes to MB and rounds to 2 decimal places
    
    def get_uploaded_at(self, obj):
        return obj.uploaded_at.strftime('%d/%m/%Y')
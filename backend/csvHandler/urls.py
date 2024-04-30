from django.urls import path
from .views import ManageImports,ManageInvoices

urlpatterns = [
    path('csv/', ManageImports.as_view(), name='manage_csv'),
    path('invoice/', ManageInvoices.as_view(), name='manage_invoice'),
]

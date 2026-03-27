from rest_framework import viewsets, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_products = Product.objects.filter(featured=True)[:8]
        serializer = self.get_serializer(featured_products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def best_sellers(self, request):
        best_sellers = Product.objects.filter(best_seller=True)[:8]
        serializer = self.get_serializer(best_sellers, many=True)
        return Response(serializer.data)
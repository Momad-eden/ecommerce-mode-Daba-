from rest_framework import serializers
from .models import Category, Product, ProductVariant, ProductImage

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'gender', 'style', 'description', 'image']

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'size', 'color', 'color_code', 'price', 'stock', 'image', 'sku']

class ProductSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'price', 'categories', 
                  'image_main', 'image_secondary_1', 'image_secondary_2', 'image_secondary_3',
                  'featured', 'best_seller', 'new_arrival', 'variants', 'created_at', 'updated_at']
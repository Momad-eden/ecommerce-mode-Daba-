from rest_framework import serializers
from .models import Promotion

class PromotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promotion
        fields = ['id', 'name', 'description', 'promotion_type', 'value', 
                  'start_date', 'end_date', 'active']
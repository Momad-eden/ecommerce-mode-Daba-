from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Promotion
from .serializers import PromotionSerializer

class PromotionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        now = timezone.now()
        active_promotions = Promotion.objects.filter(
            active=True,
            start_date__lte=now,
            end_date__gte=now
        )
        serializer = self.get_serializer(active_promotions, many=True)
        return Response(serializer.data)
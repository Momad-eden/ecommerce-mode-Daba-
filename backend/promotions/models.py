from django.db import models
from django.utils import timezone
from products.models import Product, Category

class Promotion(models.Model):
    """Système de promotions"""
    PROMOTION_TYPES = [
        ('percentage', 'Pourcentage (%)'),
        ('fixed', 'Montant fixe (FCFA)'),
    ]
    
    name = models.CharField(max_length=200, verbose_name="Nom de la promotion")
    description = models.TextField(blank=True, verbose_name="Description")
    promotion_type = models.CharField(max_length=20, choices=PROMOTION_TYPES, verbose_name="Type de promotion")
    value = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="Valeur")
    
    # Application de la promotion
    products = models.ManyToManyField(Product, blank=True, related_name='promotions', verbose_name="Produits concernés")
    categories = models.ManyToManyField(Category, blank=True, related_name='promotions', verbose_name="Catégories concernées")
    
    # Dates de validité
    start_date = models.DateTimeField(verbose_name="Date de début")
    end_date = models.DateTimeField(verbose_name="Date de fin")
    
    # Statut
    active = models.BooleanField(default=True, verbose_name="Active")
    
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de mise à jour")
    
    class Meta:
        verbose_name = "Promotion"
        verbose_name_plural = "Promotions"
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.get_promotion_type_display()}: {self.value}"
    
    def is_valid(self):
        """Vérifie si la promotion est valide"""
        now = timezone.now()
        return self.active and self.start_date <= now <= self.end_date
    
    def get_discounted_price(self, original_price):
        """Calcule le prix réduit"""
        if not self.is_valid():
            return original_price
        
        if self.promotion_type == 'percentage':
            discount = original_price * self.value / 100
            return original_price - discount
        elif self.promotion_type == 'fixed':
            return max(0, original_price - self.value)
        return original_price
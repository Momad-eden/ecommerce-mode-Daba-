from django.db import models
from django.utils import timezone
import uuid

class Category(models.Model):
    """Catégories de produits"""
    GENDER_CHOICES = [
        ('homme', 'Homme'),
        ('femme', 'Femme'),
        ('enfant', 'Enfant'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="Nom")
    slug = models.SlugField(unique=True, verbose_name="Slug")
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, verbose_name="Genre")
    style = models.CharField(max_length=100, verbose_name="Style")
    description = models.TextField(blank=True, verbose_name="Description")
    image = models.ImageField(upload_to='categories/', blank=True, null=True, verbose_name="Image")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    
    class Meta:
        verbose_name = "Catégorie"
        verbose_name_plural = "Catégories"
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} - {self.get_gender_display()}"

class Product(models.Model):
    """Produits"""
    name = models.CharField(max_length=200, verbose_name="Nom du produit")
    slug = models.SlugField(unique=True, verbose_name="Slug")
    description = models.TextField(verbose_name="Description")
    price = models.DecimalField(max_digits=10, decimal_places=0, verbose_name="Prix (FCFA)")
    categories = models.ManyToManyField(Category, related_name='products', verbose_name="Catégories")
    image_main = models.ImageField(upload_to='products/main/', verbose_name="Image principale")
    image_secondary_1 = models.ImageField(upload_to='products/secondary/', blank=True, null=True, verbose_name="Image secondaire 1")
    image_secondary_2 = models.ImageField(upload_to='products/secondary/', blank=True, null=True, verbose_name="Image secondaire 2")
    image_secondary_3 = models.ImageField(upload_to='products/secondary/', blank=True, null=True, verbose_name="Image secondaire 3")
    featured = models.BooleanField(default=False, verbose_name="À la une")
    best_seller = models.BooleanField(default=False, verbose_name="Meilleure vente")
    new_arrival = models.BooleanField(default=False, verbose_name="Nouvelle arrivée")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Date de mise à jour")
    
    class Meta:
        verbose_name = "Produit"
        verbose_name_plural = "Produits"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name

class ProductVariant(models.Model):
    """Variants de produits (taille, couleur)"""
    SIZES = [
        ('XS', 'XS'),
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
        ('XXL', 'XXL'),
        ('3XL', '3XL'),
    ]
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants', verbose_name="Produit")
    size = models.CharField(max_length=5, choices=SIZES, verbose_name="Taille")
    color = models.CharField(max_length=50, verbose_name="Couleur")
    color_code = models.CharField(max_length=10, blank=True, help_text="Code hexadécimal (#000000)", verbose_name="Code couleur")
    price = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True, verbose_name="Prix spécifique (FCFA)")
    stock = models.PositiveIntegerField(default=0, verbose_name="Stock")
    image = models.ImageField(upload_to='products/variants/', blank=True, null=True, verbose_name="Image du variant")
    sku = models.CharField(max_length=50, unique=True, blank=True, verbose_name="SKU")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Date de création")
    
    class Meta:
        verbose_name = "Variant"
        verbose_name_plural = "Variants"
        unique_together = ['product', 'size', 'color']
    
    def save(self, *args, **kwargs):
        """Génération automatique du SKU"""
        if not self.sku:
            # Format: PRD-[ID_PROD]-[TAILLE]-[COULEUR]
            self.sku = f"PRD-{self.product.id}-{self.size}-{self.color.replace(' ', '').upper()[:3]}" if self.product.id else f"PRD-NEW-{self.size}-{self.color.replace(' ', '').upper()[:3]}"
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.product.name} - {self.size} - {self.color}"

class ProductImage(models.Model):
    """Images additionnelles pour les produits"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='additional_images', verbose_name="Produit")
    image = models.ImageField(upload_to='products/additional/', verbose_name="Image")
    order = models.PositiveIntegerField(default=0, verbose_name="Ordre d'affichage")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Image additionnelle"
        verbose_name_plural = "Images additionnelles"
        ordering = ['order']
    
    def __str__(self):
        return f"Image {self.order} - {self.product.name}"
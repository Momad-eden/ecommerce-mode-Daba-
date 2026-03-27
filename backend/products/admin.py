from django.contrib import admin
from .models import Category, Product, ProductVariant, ProductImage

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1
    fields = ['size', 'color', 'color_code', 'price', 'stock', 'image', 'sku']
    readonly_fields = ['sku']

class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ['image', 'order']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'gender', 'style', 'created_at']
    list_filter = ['gender', 'style']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    fieldsets = (
        ('Informations de base', {
            'fields': ('name', 'slug', 'gender', 'style', 'description')
        }),
        ('Médias', {
            'fields': ('image',),
            'classes': ('collapse',)
        }),
    )

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'featured', 'best_seller', 'new_arrival', 'created_at']
    list_filter = ['featured', 'best_seller', 'new_arrival', 'categories']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    filter_horizontal = ['categories']
    inlines = [ProductVariantInline, ProductImageInline]
    fieldsets = (
        ('Informations principales', {
            'fields': ('name', 'slug', 'description', 'price', 'categories')
        }),
        ('Images', {
            'fields': ('image_main', 'image_secondary_1', 'image_secondary_2', 'image_secondary_3')
        }),
        ('Mise en avant', {
            'fields': ('featured', 'best_seller', 'new_arrival'),
            'classes': ('collapse',)
        }),
    )

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ['product', 'size', 'color', 'price', 'stock', 'sku']
    list_filter = ['size', 'color', 'product']
    search_fields = ['product__name', 'sku']
    readonly_fields = ['sku']
from django.contrib import admin
from .models import Promotion

@admin.register(Promotion)
class PromotionAdmin(admin.ModelAdmin):
    list_display = ['name', 'promotion_type', 'value', 'start_date', 'end_date', 'active', 'is_valid']
    list_filter = ['promotion_type', 'active', 'start_date', 'end_date']
    search_fields = ['name', 'description']
    filter_horizontal = ['products', 'categories']
    fieldsets = (
        ('Informations', {
            'fields': ('name', 'description', 'promotion_type', 'value')
        }),
        ('Application', {
            'fields': ('products', 'categories')
        }),
        ('Période de validité', {
            'fields': ('start_date', 'end_date', 'active')
        }),
    )
    
    def is_valid(self, obj):
        return obj.is_valid()
    is_valid.boolean = True
    is_valid.short_description = "Valide actuellement"
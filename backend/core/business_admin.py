from django.contrib import admin
from django.shortcuts import render
from django.urls import path
from .models import Business, Package, Post, Event
from django.contrib.admin import AdminSite

# Define the custom admin site class
class BusinessAdminSite(AdminSite):
    site_header = "Business Dashboard"
    site_title = "Business Admin"
    index_title = "Welcome to the Business Dashboard"

    def has_permission(self, request):
        """Restrict access to business users only."""
        business = Business.objects.filter(base_user = request.user.pk).count()
        return business!=0
    
    def index(self, request, extra_context=None):
        """Override the index view to display custom metrics."""
        business = request.user.business if hasattr(request.user, 'business') else None
        extra_context = extra_context or {
            "packages_count": Package.objects.filter(business=business).count() if business else 0,
            "posts_count": Post.objects.filter(business=business).count() if business else 0,
            "events_count": Event.objects.filter(business=business).count() if business else 0,
        }
        return super().index(request, extra_context=extra_context)

# Instantiate the custom admin site
business_admin_site = BusinessAdminSite(name="business_admin")

# Register models with business-specific filtering
@admin.register(Package,site= business_admin_site)
class BusinessPackageAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "price")

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(business=request.user.business)

@admin.register(Post,site= business_admin_site)
class BusinessPostAdmin(admin.ModelAdmin):
    list_display = ("id", "description")

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(business=request.user.business)

@admin.register(Event,site= business_admin_site)
class BusinessEventAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(business=request.user.business)


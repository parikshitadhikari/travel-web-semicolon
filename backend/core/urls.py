from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PackageViewSet, TravellersViewSet,EventViewSet,PostViewSet,GuideViewSet

router = DefaultRouter()
router.register(r'travellers', TravellersViewSet)
router.register(r'events',EventViewSet)
router.register(r'posts',PostViewSet)
# router.register(r'chat',ChatbotViewSet,basename="chat")
router.register(r'destination',PackageViewSet)
# router.register(r'traverse', TraverseViewSet,basename="traverse")
router.register(r'guide',GuideViewSet)
urlpatterns = [
    path('', include(router.urls)),
]

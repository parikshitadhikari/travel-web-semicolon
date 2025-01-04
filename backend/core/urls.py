from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import  ChatBotApiView, PackageViewSet, TravellersViewSet,EventViewSet,PostViewSet,GuideViewSet, TraverseViewSet

router = DefaultRouter()
router.register(r'travellers', TravellersViewSet)
router.register(r'events',EventViewSet)
router.register(r'posts',PostViewSet)
# router.register(r'chat',ChatbotApiView,basename="chat")
router.register(r'destination',PackageViewSet)
# router.register(r'traverse', TraverseViewSet,basename="traverse")
router.register(r'guide',GuideViewSet)
router.register(r'traverse',TraverseViewSet)
urlpatterns = [
    path('', include(router.urls)),
     path('chat/', ChatBotApiView.as_view(), name='chat_api'),
]

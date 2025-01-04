from django.shortcuts import render
from rest_framework import viewsets,status,permissions,authentication
from rest_framework.response import Response
from rest_framework.decorators import api_view,action

from core.models import Business, Event, Guide, Package, PackageSubscription, Post, PostComment, Travellers, TraverseItem, User
from core.serializers import BusinessSerializer, EventInterestedSerializer, EventSerializer, GuideSerializer, PackageCommentSerializer, PackageSerializer, PackageSubscriptionSerializer, PostSerializer, TravellersSerializer, TraverseItemSerializer, UserSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Count

# Create your views here.
class PostViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer

    def get_traveller(username):
        user = User.objects.get(username=username)
        traveller = Travellers.objects.get(base_user=user.pk)
        return traveller

    @action(methods=["GET"], detail=False)
    def recommendations(self, request):
        traveller = self.get_traveller(request.data["username"])
        matching_users = (
            Post.objects.filter(label__name__in=traveller.interests)
            .annotate(matched_labels=Count("label"))
            .order_by("-matched_labels")
        )
    @action(
        methods=["POST"], permission_classes=[], authentication_classes=[], detail=False
    )
    def comment(self, request, *args, **kwargs):
        data =request.data
        user = User.objects.get(username=data['username'])
        comment = data['comment']
        post = Post.objects.get(id= data['id'])
        post_comment = PostComment.objects.create(post = post.pk,comment= comment,commented_by=user.pk)
        return Response(status=status.HTTP_200_OK)
    # @action(methods=["GET"],detail=False)
    # def trending(self,request):
    #     traveller =self.get_traveller(request.data['username'])
    @action(
        methods=["POST"], permission_classes=[], authentication_classes=[], detail=False
    )
    def create_post(self, request, *args, **kwargs):
        # request = request.copy()
        data = request.data.copy()
        labels = data["label"]
        # print(interests)
        # post_serializer.
        # base_user={
        #     'username': data['username'],
        #     'password':data['password'],
        #     'email':data['email']
        # }
        # data["base_user"] = User.objects.get(username=data["username"]).pk
        data["base_user"]= get_object_or_404(User, username = data['username']).pk
        data["label"] = []
        for label in labels:
            # print(interest)
            data["label"].append({"name": label})

        # data['interests']=None
        # print(data)
        # print(data['interests'])
        
        post_serializer = self.serializer_class(data=data)
        post_serializer.is_valid(raise_exception=True)
        post = post_serializer.save()
        # print(post)
        # list = self.queryset
        # data = PostSerializer(list, many=True).data
        # print(data)
        return Response(status=status.HTTP_200_OK)
        # return super().create(request, *args, **kwargs

class TravellersViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    queryset = Travellers.objects.all()
    serializer_class = TravellersSerializer

    def retrieve(self, request, *args, **kwargs):
        print(kwargs)
        username = kwargs.get('pk')
        # traveller = get_object_or_404(Travellers,base_user__username = username)
        print(username)
        traveller = Travellers.objects.get(base_user__username = username)
        serializer = self.serializer_class(traveller)
        return Response(status=status.HTTP_200_OK,data=serializer.data)
        
    @action(
        methods=["POST"], permission_classes=[], authentication_classes=[], detail=False
    )
    def login(self,request):
        data = request.data
        email = data['email']
        traveller = Travellers.objects.get(base_user__email = email)
        serializer = self.serializer_class(traveller)
        return Response(status=status.HTTP_200_OK,data=serializer.data)
    
    @action(
        methods=["POST"], permission_classes=[], authentication_classes=[], detail=False
    )
    def create_user(self, request, *args, **kwargs):
        data = request.data
        base_user = {
            "username": data["username"],
            "password": data["password"],
            "email": data["email"],
        }
        data["base_user"] = base_user
        interests = data["interests"]
        # print(interests)
        # traveller_serializer.

        data["interests"] = []

        for interest in interests:
            # print(interest)
            data["interests"].append({"name": interest})

        # data['interests']=None
        # print(data)
        # print(data['interests'])
        traveller_serializer = self.serializer_class(data=data)
        traveller_serializer.is_valid(raise_exception=True)
        traveller = traveller_serializer.save()


        return Response(status=status.HTTP_200_OK)
        # return super().create(request, *args, **kwargs)
class BusinessViewSet(viewsets.ModelViewSet):
    authentication_classes = [authentication.BasicAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = Business.objects.all()
    serializer_class = BusinessSerializer

    # @action(
    #     methods=["POST"], permission_classes=[], authentication_classes=[], detail=False
    # )

    @action(
        methods=["POST"], permission_classes=[], authentication_classes=[], detail=False
    )
    def create_user(self, request, *args, **kwargs):
        data = request.data
        base_user = {"username": data["username"], "password": data["password"]}
        data["base_user"] = base_user
        interests = data["interests"]
        # print(interests)
        # traveller_serializer.

        data["interests"] = []
        for interest in interests:
            # print(interest)
            data["interests"].append({"name": interest})

        # data['interests']=None
        # print(data)
        # print(data['interests'])
        traveller_serializer = self.serializer_class(data=data)
        traveller_serializer.is_valid(raise_exception=True)
        traveller = traveller_serializer.save()


        return Response(status=status.HTTP_200_OK)
        # return super().create(request, *args, **kwargs)

class PackageViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    authentication_classes = []
    permission_classes = []
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

    def get_traveller(username):
        user = User.objects.get(username=username)
        traveller = Travellers.objects.get(base_user=user.pk)
        return traveller

    @action(methods=["GET"], detail=False)
    def recommendations(self, request):
        traveller = self.get_traveller(request.data["username"])
        matching_users = (
            Package.objects.filter(label__name__in=traveller.interests)
            .annotate(matched_labels=Count("label"))
            .order_by("-matched_labels")
        )

    @action(methods=["GET"], detail=False)
    def trending(self, request):
        traveller = self.get_traveller(request.data["username"])

    @action(methods=["POST","GET"], permission_classes=[], authentication_classes=[], detail=False)
    def subscribe(self, request, *args, **kwargs):
        if(request.method=="POST"):
            data =request.data
            user = User.objects.get(username=data['username'])
            # comment = data['comment']
            package = Package.objects.get(id= data['id'])
            package_subsctipton_data={
                
            }
            package_subsctipton_data['package']= package.pk
            package_subsctipton_data['subscribed_by']= user.pk
            package_subscription_serializer = PackageSubscriptionSerializer(data= package_subsctipton_data)
            package_subscription_serializer.is_valid(raise_exception=True)
            package_subscription_serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            data = request.data
            event_id = data['id']
            package = Package.objects.get(id= event_id)
            # interested_users = event.eventinterested_set.all().values_list('interested_user',flat=True)
            interested_users = User.objects.filter(packagesubscription__package=package)
            return Response(status=status.HTTP_200_OK, data=UserSerializer(interested_users, many=True).data)
    
    
    @action(
        methods=["POST"], permission_classes=[], authentication_classes=[], detail=False
    )
    def create_bulk_destination(self, request, *args, **kwargs):
        datas = request.data;
        for data in datas:
            interested_users = data['interested_users']
            guide_name:str = data['guide'] 
            base_user,_ = User.objects.get_or_create(username = guide_name,password='password')
            guide,_ = Guide.objects.get_or_create(base_user = base_user)
            data['guide']=guide.pk
            # image_url = data['img']
            # img = requests.get(image_url)
            # data['img']= ImageFile(io.BytesIO(img.content), name=f'${data['name']}.png')
            data['img']=None
            labels = data["label"]
            # print(interests)
            # event_serializer.
            data["business"] =Business.objects.get(base_user =  User.objects.get(username='rohan').pk).pk
            
            data["label"] = []
            for label in labels:
                # print(interest)
                data["label"].append({"name": label})

            # data['interests']=None
            # print(data)
            # print(data['interests'])
            print("her")
            package_serializer = self.serializer_class(data=data)
            package_serializer.is_valid(raise_exception=True)
            package_serializer.save()
            
            for user_data in interested_users:
                user,_ = User.objects.get_or_create(username = user_data)
                package = Package.objects.get(name = data["name"])
                PackageSubscription.objects.create(package=package, subscribed_by = user)
        return Response(status=status.HTTP_201_CREATED)
    @action(
        methods=["POST"], permission_classes=[], authentication_classes=[], detail=False
    )
    def create_destination(self, request, *args, **kwargs):

        data = request.data
        labels = data["label"]
        # print(interests)
        # event_serializer.
        data["business"] =Business.objects.get(base_user =  User.objects.get(username=data["username"]).pk).pk
        
        data["label"] = []
        for label in labels:
            # print(interest)
            data["label"].append({"name": label})

        # data['interests']=None
        # print(data)
        # print(data['interests'])
        package_serializer = self.serializer_class(data=data)
        package_serializer.is_valid(raise_exception=True)
        event = package_serializer.save()
        # print(event)

        return Response(status=status.HTTP_200_OK)
        # return super().create(request, *args, **kwargs
        
    @action(
        methods=["POST"], permission_classes=[], authentication_classes=[], detail=False
    )
    def comment(self, request, *args, **kwargs):
        
        data =request.data
        user = User.objects.get(username=data['username'])
        comment = data['comment']
        post = Package.objects.get(id= data['id'])
        post_data = {
            'commented_by':user.pk,
            'comment':comment,
            'package':post.pk
        }
        post_comment = PackageCommentSerializer(data=post_data)
        post_comment.is_valid(raise_exception=True)
        post_comment.save()
        return Response(status=status.HTTP_200_OK)

    @action(
        methods=["GET"], permission_classes=[], authentication_classes=[], detail=False
    )
    def sentiment(self, request, *args, **kwargs):
        return Response(status=status.HTTP_501_NOT_IMPLEMENTED)
        #not implemented

class EventViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def get_traveller(username):
        user = User.objects.get(username=username)
        traveller = Travellers.objects.get(base_user=user.pk)
        traveller = Travellers.objects.get(base_user=user.pk)
        return traveller

    @action(methods=["GET"], detail=False)
    def recommendations(self, request):
        traveller = self.get_traveller(request.data["username"])
        matching_users = (
            Event.objects.filter(label__name__in=traveller.interests)
            .annotate(matched_labels=Count("label"))
            .order_by("-matched_labels")
        )
    @action(
        methods=["POST","GET"], permission_classes=[], authentication_classes=[], detail=False
    )
    def interested(self, request, *args, **kwargs):
        if(request.method=="POST"):
            
            data =request.data
            user = User.objects.get(username=data['username'])
            # comment = data['comment']
            event = Event.objects.get(id= data['id'])
            event_interested_data={
                
            }
            event_interested_data['event']= event.pk
            event_interested_data['interested_user']= user.pk
            event_interested_seralizer = EventInterestedSerializer(data= event_interested_data)
            event_interested_seralizer.is_valid(raise_exception=True)
            event_interested_seralizer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            data = request.data
            event_id = data['id']
            event = Event.objects.get(id= event_id)
            # interested_users = event.eventinterested_set.all().values_list('interested_user',flat=True)
            interested_users = User.objects.filter(eventinterested__event=event)
# Serialize the user data
            return Response(status=status.HTTP_200_OK, data=UserSerializer(interested_users, many=True).data)
            # return Response(status=status.HTTP_200_OK,data=UserSerializer(interested_users,many=True).data)

    @action(methods=["GET"], detail=False)
    def recommendations(self, request):
        traveller = self.get_traveller(request.data["username"])
        matching_users = (
            Event.objects.filter(label__name__in=traveller.interests)
            .annotate(matched_labels=Count("label"))
            .order_by("-matched_labels")
        )
    @action(
        methods=["POST","GET"], permission_classes=[], authentication_classes=[], detail=False
    )
    def interested(self, request, *args, **kwargs):
        if(request.method=="POST"):
            
            data =request.data
            user = User.objects.get(username=data['username'])
            # comment = data['comment']
            event = Event.objects.get(id= data['id'])
            event_interested_data={
                
            }
            event_interested_data['event']= event.pk
            event_interested_data['interested_user']= user.pk
            event_interested_seralizer = EventInterestedSerializer(data= event_interested_data)
            event_interested_seralizer.is_valid(raise_exception=True)
            event_interested_seralizer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            data = request.data
            event_id = data['id']
            event = Event.objects.get(id= event_id)
            # interested_users = event.eventinterested_set.all().values_list('interested_user',flat=True)
            interested_users = User.objects.filter(eventinterested__event=event)
# Serialize the user data
            return Response(status=status.HTTP_200_OK, data=UserSerializer(interested_users, many=True).data)
            # return Response(status=status.HTTP_200_OK,data=UserSerializer(interested_users,many=True).data)
    # @action(methods=["GET"],detail=False)
    # def trending(self,request):
    #     traveller =self.get_traveller(request.data['username'])
    # @action(
    #     methods=["POST"], permission_classes=[], authentication_classes=[], detail=False
    # )
    @action(
        methods=["POST"], permission_classes=[], authentication_classes=[], detail=False
    )
    def create_event(self, request, *args, **kwargs):
        data = request.data
        labels = data["label"]

        data["label"] = []
        data["created_by"] = User.objects.get(username=data["username"]).pk

        for label in labels:
            data["label"].append({"name": label})

        # data['interests']=None
        # print(data)
        # print(data['interests'])
        event_serializer = self.serializer_class(data=data)
        event_serializer.is_valid(raise_exception=True)
        event_serializer.save()
        # print(event)

        return Response(status=status.HTTP_200_OK)
        # return super().create(request, *args, **kwargs

# import google.generativeai as genai
# import os
# from dotenv import load_dotenv
# load_dotenv()
# genai.configure(api_key=os.environ.get("API_KEY"))
# class ChatbotViewSet(viewsets.ModelViewSet):
#     authentication_classes = []
#     permission_classes = []
#     queryset=None
#     def create(self, request, *args, **kwargs):
#         prompt = request.data['prompt']
# #         curl \
# #   -H 'Content-Type: application/json' \
# #   -d '{"contents":[{"parts":[{"text":"Explain how AI works"}]}]}' \
# #   -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY'
#         model = genai.GenerativeModel("gemini-1.5-flash")
#         response = model.generate_content(prompt)
#         # print(response.text)

#         return Response(data=response.text,status=status.HTTP_200_OK)
#         # return super().list(request, *args, **kwargs)

class TraverseViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    queryset=TraverseItem.objects.all()
    serializer_class = TraverseItemSerializer
    # def create(self, request, *args, **kwargs):
    #     # prompt = request.data['prompt']
    #     package_id = request.data['id']
    #     package =Package.objects.get(id=package_id)
    #     #         curl \
    #     #   -H 'Content-Type: application/json' \
    #     #   -d '{"contents":[{"parts":[{"text":"Explain how AI works"}]}]}' \
    #     #   -X POST 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY'
    #     model = genai.GenerativeModel("gemini-1.5-flash")
    #     prompt = f"I am going on the package(travel): {package.name}. It's description is {package.description}. Give required equipments and its price for this trip. Stricly only give me short points on what equipments i need. Nothing more nothing less.Parse data and give in 10 nice points. No extra text just the 10 points starting with 1,2,3 and so on.Dont say Here are 10 essential items for your Kathmandu Durbar Square trip"
    #     response = model.generate_content(prompt)
    #     # print(response.text)

    #     return Response(data=response.text,status=status.HTTP_200_OK)
    
        # return super().list(request, *args, **kwargs)

    


class GuideViewSet(viewsets.ModelViewSet):
    authentication_classes = []
    permission_classes = []
    queryset=Guide.objects.all()
    serializer_class = GuideSerializer
    def create(self, request, *args, **kwargs):
        data = request.data
        base_user = {
            "username": data["username"],
            "password": data["password"],
            "email": data["email"],
        }
        data["base_user"] = base_user
        interests = data["interests"]
        # print(interests)
        # traveller_serializer.

        data["interests"] = []
        for interest in interests:
            # print(interest)
            data["interests"].append({"name": interest})

        # data['interests']=None
        # print(data)
        # print(data['interests'])
        guide_serializer = self.serializer_class(data=data)
        guide_serializer.is_valid(raise_exception=True)
        guide = guide_serializer.save()
        print(guide)

        return Response(status=status.HTTP_200_OK)
        # return super().create(request, *args, **kwargs)

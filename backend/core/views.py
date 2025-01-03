from django.shortcuts import render
from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import api_view,action

from backend.core.models import Post, PostComment, Travellers, User
from backend.core.serializers import PostSerializer

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
        data["base_user"] = User.objects.get(username=data["username"]).pk
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

from rest_framework import authentication
from .models import User
class CustomAuthentication(authentication.BaseAuthentication):
    """
    HTTP Basic authentication against username/password.
    """
    www_authenticate_realm = 'api'

    def authenticate(self, request):
        username = request.data['username']
        return User.objects.get(username=username)

    def authenticate_header(self, request):
        return 'Basic realm="%s"' % self.www_authenticate_realm

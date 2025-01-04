# Backend Documentation

Outlines basics of backend, api endpoints and views.
## Running
- Navigate to backend folder ```cd backend```
- Create venv: ``` python -m venv env ```
- Activate venv: Linux: ```source env/bin/activate``` Windows:``` ./env/Scripts/Activate.ps1```
- Install packages: ```pip install -r requirements.txt```
- Perform migrations: ```python manage.py makemigrations```
- Apply migrations: ```python manage.py migrate```
- Run the server: ```python manage.py runserver```



## TravellersViewSet
Manages the creation and listing of travellers.

### Endpoints

- **GET** `auth/travellers/`
  - Returns a list of all travellers.
  - No authentication or permissions required.

- **POST** `auth/travellers/`
  - Creates a new traveller based on the provided data.
  - No authentication or permissions required.
  - **Request Body:**
    ```json
    {
      "username": "user123",
      "password": "password123",
      "email": "user@example.com",
      "interests": ["interest1", "interest2"]
    }
    ```

- **POST** `auth/travellers/create_user/`
  - Creates a traveller and assigns interests to them.
  - **Request Body:**
    ```json
    {
      "username": "user123",
      "password": "password123",
      "email": "user@example.com",
      "interests": ["interest1", "interest2"]
    }
    ```
- **GET** `auth/travellers/username/`
  - Get a traveller by username.
  

## PackageViewSet
Manages travel packages and their recommendations.

### Endpoints

- **GET** `auth/packages/`
  - Lists all available packages.
  - Requires basic authentication and user to be authenticated.

- **GET** `auth/packages/recommendations/`
  - Returns package recommendations for the authenticated traveller.
  - **Request Body:**
    ```json
    {
      "username": "traveller123"
    }
    ```

- **GET** `auth/packages/trending/`
  - Lists trending packages for the traveller.



## PostViewSet
Handles user posts and provides recommendations.

### Endpoints

- **GET** `auth/posts/`
  - Lists all posts.

- **GET** `auth/posts/recommendations/`
  - Returns post recommendations based on the traveller's interests.
  - **Request Body:**
    ```json
    {
      "username": "traveller123"
    }
    ```

- **POST** `auth/posts/create_post/`
  - Creates a new post.
  - **Request Body:**
    ```json
    {

      "description":"Description",
      "label": ["label1", "label2"],
      "img": Image File,
      "username": "Username of poster",
      

    }
    ```
- **POST** `auth/posts/comment/`
-Creates a comment on a post.
  - **Request Body:**
    ```json
    {

      "id": id of the post in number,
      "comment" :"Comment on the post",
      "usernmae":"Username of the commenter"
      

    }

    ```
    - **POST** `/auth/posts/like/`
-Creates a like on a post.
  - **Request Body:**
    ```json
    {

      "id": id of the post in number,

      "usernmae":"Username of the user"
      

    }
    ```
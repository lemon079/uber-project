# User Registration Endpoint

## POST /user/register

### Description

This endpoint is used to register a new user. It requires the user's first name, last name, email, and password.

### Request Body

The request body should be a JSON object containing the following fields:

- `fullName.firstName`: (string) The first name of the user. Must be at least 3 characters long.
- `fullName.lastName`: (string) The last name of the user. Must be at least 3 characters long.
- `email`: (string) The email address of the user. Must be a valid email format.
- `password`: (string) The password for the user. Must be at least 8 characters long.

### Example Request

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success

- **Status Code**: 201 Created
- **Response Body**:
  ```json
  {
    "user": {
      "_id": "user_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    },
    "token": "jwt_token"
  }
  ```

#### Validation Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```

#### Server Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "error": "Error message"
  }
  ```

# User Login Endpoint

## POST /user/login

### Description

This endpoint is used to log in an existing user. It requires the user's email and password.

### Request Body

The request body should be a JSON object containing the following fields:

- `email`: (string) The email address of the user. Must be a valid email format.
- `password`: (string) The password for the user. Must be at least 8 characters long.

### Example Request

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "socketId": null
    }
  }
  ```

#### Validation Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```

#### Authentication Errors

- **Status Code**: 401 Unauthorized
- **Response Body**:
  ```json
  {
    "message": "Invalid Email or Password"
  }
  ```

#### Server Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "error": "Error message"
  }
  ```

# User Profile Endpoint

## GET /user/profile

### Description

This endpoint is used to get the profile of the logged-in user. It requires the user to be authenticated.

### Request Headers

- `Authorization`: (string) The JWT token of the logged-in user.

### Example Request

```http
GET /user/profile HTTP/1.1
Host: example.com
Authorization: Bearer jwt_token
```

### Responses

#### Success

- **Status Code**: 200 OK
- **Response Body**:
  ```json
  {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
  ```

#### Authentication Errors

- **Status Code**: 401 Unauthorized
- **Response Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### Server Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "error": "Error message"
  }
  ```

# Middleware

## authUser

### Description

This middleware is used to authenticate the user by verifying the JWT token.

### Example Usage

```javascript
import { authUser } from "../middlewares/auth.middleware.js";

router.get("/profile", authUser, handleUserProfile);
```

### Errors

#### Authentication Errors

- **Status Code**: 401 Unauthorized
- **Response Body**:
  ```json
  {
    "message": "Unauthorized"
  }
  ```

#### Server Errors

- **Status Code**: 400 Bad Request
- **Response Body**:
  ```json
  {
    "message": "Error message"
  }
  ```

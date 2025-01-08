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

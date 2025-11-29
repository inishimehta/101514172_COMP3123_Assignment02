# COMP3123 Assignment 1 – Backend

**Author:** Nishi  
**Course:** COMP3123 – Full Stack Development

---

## Project Overview

This project is a RESTful API for managing user accounts and employees, built with Node.js, Express, and MongoDB. It handles user signup, login, and all CRUD operations for employee records with proper validation and error handling.

---

## Technologies

- Node.js / Express  
- MongoDB with Mongoose  
- bcryptjs for password hashing  
- express-validator for request validation  
- dotenv for environment variables  

---

## Getting Started

### Installation

- Clone the repo

- Run `npm install` to install dependencies

- Start the server locally:

npm run dev

---

## API Endpoints

| Method | Endpoint                        | Description            |
| ------ | ------------------------------ | ---------------------- |
| POST   | `/api/v1/user/signup`           | Register new user      |
| POST   | `/api/v1/user/login`            | User login             |
| GET    | `/api/v1/emp/employees`         | Get all employees      |
| POST   | `/api/v1/emp/employees`         | Create new employee    |
| GET    | `/api/v1/emp/employees/:id`     | Get employee by ID     |
| PUT    | `/api/v1/emp/employees/:id`     | Update employee by ID  |
| DELETE | `/api/v1/emp/employees?eid=xx`  | Delete employee by ID  |

---

## Notes

- The API accepts and returns JSON data only.  
- Passwords are hashed before storing.  
- Proper validation and error messages included.  
- Setup your MongoDB URI in environment variables for local or cloud.

---

## Testing

- Use Postman or similar tools to test all endpoints.  
- Postman collection and screenshots included in the project folder.

---

Feel free to reach out for questions or doubts. Good luck!

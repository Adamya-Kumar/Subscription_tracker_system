# Subscription Tracking API

## Introduction
A robust REST API service for tracking and managing subscriptions with automated renewal reminders. The application handles user authentication, subscription management, and automated email notifications for upcoming renewals using workflow automation.

## Tools & Technologies Used
- Node.js & Express.js for the backend server
- MongoDB for database
- JWT for authentication
- Upstash Workflow for automated reminders
- Arcjet for rate limiting and protection
- Nodemailer for email notifications

## Perview
![signup user]("C:\Users\ASUS\OneDrive\Pictures\Screenshot 2025-04-27 135749.jpg")

![signin user]("C:\Users\ASUS\OneDrive\Pictures\Screenshot 2025-04-27 135948.jpg")

![users]("C:\Users\ASUS\OneDrive\Pictures\Screenshot 2025-04-27 140340.jpg")

![users by Id]("C:\Users\ASUS\OneDrive\Pictures\Screenshot 2025-04-27 140612.jpg")

![subscription-with-auth]("C:\Users\ASUS\OneDrive\Pictures\Screenshot 2025-04-27 135904.jpg")


## API Endpoints

### Authentication Routes
````
    POST /api/v1/auth/login - User login POST /api/v1/auth/register - User registration
````
### User Routes
````
    GET /api/v1/users - Get all users
    GET /api/v1/users/:id - Get specific user 
    POST /api/v1/users - Create new user 
    PUT /api/v1/users/:id - Update user
    DELETE /api/v1/users/:id - Delete user
````
### Subscription Routes
````
    GET /api/v1/subscriptions - Get all subscriptions
     POST /api/v1/subscriptions - Create subscription 
     PUT /api/v1/subscriptions/:id - Update subscription 
     DELETE /api/v1/subscriptions/:id - Delete subscription
````
### Workflow Routes
````
     GET /api/v1/workflows - Manage subscription reminders
````
## Package Dependencies
````
    json { "dependencies": { "@arcjet/node": "1.0.0-beta.6", "@arcjet/inspect": "1.0.0-beta.6", "@upstash/workflow": "0.2.12", "bcryptjs": "3.0.2", "cookie-parser": "1.4.4", "dayjs": "1.11.13", "debug": "2.6.9", "dotenv": "16.5.0", "express": "4.16.1", "jsonwebtoken": "9.0.2", "mongodb": "6.16.0", "mongoose": "8.13.2", "morgan": "1.9.1", "nodemailer": "6.10.1" }, "devDependencies": { "eslint": "9.25.1", "@eslint/js": "9.25.1", "globals": "16.0.0" } }
````
## Who Should Use This
This API is ideal for:
- SaaS platforms managing user subscriptions
- Businesses tracking service renewals
- Applications requiring automated reminder systems
- Services needing user authentication and subscription management
- Platforms requiring scalable subscription tracking solutions

## Features
- User Authentication & Authorization
- Subscription Management
- Automated Renewal Reminders
- Email Notifications
- Rate Limiting Protection
- Error Handling
- MongoDB Integration
- Secure Cookie Management
- Workflow Automation

## Getting Started

1. Clone the repository
2. Install dependencies:
````
    bash npm install
````
3. Set up environment variables in `.env`:
````
   env PORT=3000 MONGODB_URI=your_mongodb_uri JWT_SECRET=your_jwt_secret QSTASH_URL=your_qstash_url QSTASH_TOKEN=your_qstash_token
````
4. Start the server:
```bash
npm start
```
## Security Features
- JWT based authentication
- Rate limiting with Arcjet
- Secure cookie handling
- Environment variable protection
- Error middleware
- Request validation

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

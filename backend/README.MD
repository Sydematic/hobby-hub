# HobbyHub Backend

## Setup
1. cd backend
2. npm install
3. Create `.env`:
   MONGO_URI=your_mongodb_connection
   JWT_SECRET=your_secret
   PORT=5000
4. npm run dev

## Routes
### POST /api/auth/register
- Create new user
- Returns: 201

### POST /api/auth/login
- Login user
- Returns: token

### POST /api/hobbies
- Create hobby (requires JWT)

### GET /api/hobbies
- Get all hobbies for logged-in user

## Testing
- Use Postman
- Set `Authorization: Bearer <token>` for protected routes

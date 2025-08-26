# API Setup Guide

## Environment Configuration

To connect to the backend API, create a `.env.local` file in the client directory with:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Backend Server

Make sure the backend server is running on port 8080. The server should have:

1. MongoDB connection
2. User routes at `/user`
3. User role routes at `/user-roles`

## Features Implemented

### Add User Form
- ✅ Form validation
- ✅ Dynamic role loading from API
- ✅ API integration for creating users
- ✅ Success/error message display
- ✅ Form reset after successful submission

### All Users Table
- ✅ Real-time data fetching from API
- ✅ Search functionality
- ✅ Loading and error states
- ✅ Refresh button
- ✅ Data transformation for table display

## API Endpoints Used

- `POST /user` - Create new user
- `GET /user` - Get all users
- `GET /user-roles` - Get all user roles

## Data Flow

1. User fills out the add user form
2. Form data is validated
3. Data is sent to the backend API
4. On success, form is reset and success message shown
5. All Users table can be refreshed to show new data

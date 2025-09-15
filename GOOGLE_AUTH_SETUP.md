# Google Authentication Setup Guide

## Backend Setup

### 1. Install Dependencies
```bash
cd server
npm install google-auth-library
```

### 2. Environment Variables
Add the following to your `server/.env` file:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
```

### 3. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
7. Copy the Client ID and add it to your `.env` file

## Frontend Setup

### 1. Install Dependencies
No additional dependencies needed! The Google Sign-In implementation uses the official Google Identity Services API loaded dynamically.

### 2. Environment Variables
Add the following to your `client/.env` file:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

### 3. Update Vite Config (if needed)
The Google Sign-In script will be loaded dynamically, so no additional Vite configuration is required.

## Features Added

### Backend
- ✅ Google OAuth verification endpoint (`/api/auth/google`)
- ✅ User model updated with `picture` and `isGoogleUser` fields
- ✅ Automatic user creation for new Google users
- ✅ JWT token generation for Google users

### Frontend
- ✅ Google Sign-In component using official Google Identity Services API
- ✅ Integration with Login and Signup pages
- ✅ Error handling and loading states
- ✅ Responsive design
- ✅ No additional dependencies required (React 19 compatible)

## Usage

Users can now:
1. Click "Sign in with Google" or "Sign up with Google" buttons
2. Complete Google OAuth flow
3. Automatically get logged in or signed up
4. Access the application with their Google account

## Security Notes

- Google tokens are verified on the backend
- JWT tokens are still used for session management
- Google users don't need passwords
- User data is securely stored in MongoDB

## Testing

1. Start the backend server: `cd server && npm run dev`
2. Start the frontend: `cd client && npm run dev`
3. Navigate to login/signup pages
4. Click the Google Sign-In button
5. Complete the OAuth flow

## Troubleshooting

- Ensure Google Client ID is correctly set in both frontend and backend
- Check that authorized origins are properly configured in Google Cloud Console
- Verify that the Google+ API is enabled
- Check browser console for any JavaScript errors

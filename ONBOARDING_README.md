# CareerPath Onboarding System

## Overview

The onboarding system is designed to collect user preferences and career goals to provide personalized career guidance. Users can choose between two onboarding paths:

1. **Domain Selection**: Quick domain selection for immediate access
2. **AI-Guided Assessment**: Comprehensive questionnaire-based assessment

## Features

### 1. Domain Selection
- Users can select from 12 predefined career domains
- Immediate access to the platform after selection
- Domain is stored in the user profile

### 2. AI-Guided Assessment
- 6-step questionnaire covering:
  - Personal Background
  - Interests & Passion
  - Skills & Strengths
  - Work Preferences
  - Goals & Aspirations
  - Constraints & Preferences

### 3. Data Storage
- All onboarding data is stored in MongoDB
- User profile includes `onboarding` flag and `onboardingData` object
- Domain selection is stored separately for quick access

## Implementation Details

### Database Schema Updates

The user model has been extended with:

```javascript
{
  onboarding: { type: Boolean, default: false },
  domain: { type: String, default: null },
  onboardingData: {
    personalBackground: { education: String, fieldOfStudy: String, workPreference: String },
    interests: { activities: [String], industries: [String] },
    skills: { currentSkills: [String], technicalLevel: String },
    workPreferences: { workWith: String, workLocation: String, workEnvironment: String },
    goals: { motivation: String, longTermVision: String },
    constraints: { openToAbroad: String, learningTime: String, higherStudies: String, financialConstraints: String }
  }
}
```

### API Endpoints

1. **POST /api/user/onboarding**
   - Updates user onboarding data
   - Sets onboarding flag to true
   - Stores domain and/or questionnaire responses

2. **GET /api/user/[userId]**
   - Retrieves user profile data
   - Used to check onboarding status

### Flow Control

1. **Registration**: Users are redirected to `/onboarding` after successful registration
2. **Login**: Users without completed onboarding are redirected to `/onboarding`
3. **Dashboard Access**: Only users with completed onboarding can access the dashboard
4. **Onboarding Completion**: Users are redirected to dashboard after completing onboarding

### Middleware

- Protects onboarding and dashboard routes
- Redirects unauthenticated users to login
- Redirects authenticated users away from auth pages

## User Experience

### Domain Selection Path
1. User chooses "Choose Your Domain"
2. Selects from 12 career domains
3. Clicks "Continue with Selected Domain"
4. Redirected to dashboard

### AI Assessment Path
1. User chooses "AI-Guided Assessment"
2. Goes through 6-step questionnaire
3. Each step validates completion before proceeding
4. Final submission validates all questions are answered
5. Redirected to dashboard

### Validation
- Users must complete all questions in each step before proceeding
- Final submission requires all questions to be answered
- Toast notifications provide feedback on validation errors

## Technical Implementation

### Frontend Components
- `app/onboarding/page.tsx`: Main onboarding page with both paths
- `app/dashboard/page.tsx`: Updated to check onboarding status
- `app/auth/register/page.tsx`: Redirects to onboarding after registration
- `app/auth/login/page.tsx`: Checks onboarding status after login

### Backend Updates
- `server/index.js`: Extended user model and new API endpoints
- `app/api/user/onboarding/route.ts`: Next.js API route for onboarding
- `app/api/user/[userId]/route.ts`: Next.js API route for user data

### Type Safety
- `types/next-auth.d.ts`: Extended NextAuth types for custom user properties
- Includes user ID, firstName, lastName, and phone in session

## Security Features

1. **Authentication Required**: All onboarding routes require valid session
2. **User Isolation**: Users can only access their own onboarding data
3. **Input Validation**: Frontend and backend validation for all inputs
4. **Protected Routes**: Middleware protects sensitive routes

## Future Enhancements

1. **AI Recommendations**: Use collected data to suggest career paths
2. **Progress Tracking**: Save partial progress and allow resuming
3. **Data Export**: Allow users to export their career profile
4. **Analytics**: Track completion rates and user engagement
5. **Customization**: Allow admins to modify questionnaire content

## Testing

To test the onboarding system:

1. Start the Express server: `cd server && npm start`
2. Start the Next.js app: `npm run dev`
3. Register a new user
4. Complete onboarding (either path)
5. Verify dashboard access and data display

## Troubleshooting

### Common Issues

1. **Onboarding not redirecting**: Check NextAuth session configuration
2. **Data not saving**: Verify Express server is running and MongoDB connection
3. **Type errors**: Ensure `types/next-auth.d.ts` is properly configured
4. **Middleware issues**: Check route matchers in `middleware.ts`

### Debug Steps

1. Check browser console for errors
2. Verify API endpoints are responding
3. Check MongoDB for data persistence
4. Verify session cookies are being set

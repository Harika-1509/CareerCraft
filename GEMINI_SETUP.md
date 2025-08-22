# Gemini AI Setup Guide

## Prerequisites

1. **Google AI Studio Account**: You need a Google AI Studio account to get your API key
2. **Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Environment Variables

Add the following to your `.env.local` file:

```bash
# Gemini AI Configuration
GEMINI_API_KEY=your-gemini-api-key-here
```

## How It Works

1. **Onboarding Completion**: When users complete all onboarding questions, the system automatically triggers Gemini AI analysis
2. **Domain Scoring**: Gemini analyzes the user's answers and scores each career domain from 1-10
3. **Top 3 Recommendations**: The system displays the top 3 scoring domains with percentages and reasoning
4. **User Choice**: Users can select from the recommendations or choose any domain from the full list

## Features

- **Smart Analysis**: Gemini AI considers education, skills, interests, work preferences, and goals
- **Personalized Scoring**: Each domain gets a score based on how well it matches the user's profile
- **Detailed Reasoning**: Every score comes with an explanation of why it was assigned
- **Flexible Selection**: Users can choose from recommendations or select any domain

## API Endpoints

- `POST /api/ai/analyze` - Analyzes onboarding answers using Gemini AI
- `POST /api/user/onboarding` - Saves onboarding data and domain selection

## Troubleshooting

- **API Key Issues**: Ensure your Gemini API key is valid and has sufficient quota
- **Rate Limiting**: Gemini has rate limits; consider implementing caching for production use
- **Response Parsing**: The system expects JSON responses from Gemini; ensure proper formatting

## Security Notes

- Never expose your API key in client-side code
- Consider implementing rate limiting on your API endpoints
- Validate all user inputs before sending to Gemini

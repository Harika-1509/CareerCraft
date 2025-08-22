# CareerPath - AI Career Mentor

An AI-powered career mentor platform that creates personalized roadmaps and connects students to the right opportunities. Built with Next.js, NextAuth, Express, and MongoDB.

## Features

- 🔐 **Authentication System**: Secure login/register with email/password and Google OAuth
- 🎯 **Personalized Roadmaps**: AI-powered career guidance based on skills and interests
- 💼 **Opportunity Hub**: Discover courses, internships, and projects
- 🤖 **AI Chatbot Mentor**: Personalized advice and guidance
- 📊 **Skill Analytics**: Track progress and identify skill gaps
- 📈 **Trend Insights**: Job market trends and skill demands
- 👥 **Community**: Connect with peers and mentors
- 🌙 **Dark/Light Mode**: Beautiful UI with theme support

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with Google OAuth
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **UI Components**: Radix UI, shadcn/ui
- **Styling**: Tailwind CSS with dark/light mode
- **Animations**: Framer Motion

## Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- Google OAuth credentials (optional)

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd CareerCraft
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory with the following variables:

   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-super-secret-nextauth-key-change-this-in-production

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/careerpath
   # For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/careerpath

   # Google OAuth (Optional - for Google sign-in)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Express Server Configuration
   EXPRESS_SERVER_URL=http://localhost:5000
   PORT=5000
   ```

4. **Set up MongoDB**

   **Option A: Local MongoDB**

   - Install MongoDB locally
   - Start MongoDB service
   - Use `mongodb://localhost:27017/careerpath` as your MONGODB_URI

   **Option B: MongoDB Atlas**

   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string and replace the MONGODB_URI

5. **Set up Google OAuth (Optional)**

   If you want to enable Google sign-in:

   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add `http://localhost:3000/api/auth/callback/google` to authorized redirect URIs
   - Copy Client ID and Client Secret to your .env.local file

## Running the Application

### Development Mode

**Option 1: Run both servers simultaneously**

```bash
npm run dev:all
```

**Option 2: Run servers separately**

Terminal 1 (Next.js frontend):

```bash
npm run dev
```

Terminal 2 (Express backend):

```bash
npm run dev:server
```

### Production Mode

1. **Build the application**

   ```bash
   npm run build
   ```

2. **Start the servers**

   ```bash
   # Start Next.js frontend
   npm start

   # Start Express backend (in another terminal)
   npm run start:server
   ```

## Project Structure

```
CareerCraft/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   └── auth/                 # Authentication endpoints
│   ├── auth/                     # Authentication pages
│   │   ├── login/                # Login page
│   │   └── register/             # Register page
│   ├── dashboard/                # Dashboard page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # React components
│   ├── providers/                # Context providers
│   ├── theme-provider.tsx        # Theme provider
│   └── ui/                       # UI components (shadcn/ui)
├── hooks/                        # Custom React hooks
├── lib/                          # Utility libraries
│   ├── mongodb.ts                # MongoDB connection
│   └── utils.ts                  # Utility functions
├── server/                       # Express server
│   └── index.js                  # Server entry point
├── styles/                       # Additional styles
├── .env.example                  # Environment variables example
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## Authentication Flow

1. **Registration**: Users can register with email/password or Google OAuth
2. **Login**: Users can login with email/password or Google OAuth
3. **Session Management**: NextAuth handles session management
4. **Protected Routes**: Dashboard is protected and requires authentication

## API Endpoints

### Express Server (Port 5000)

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/health` - Health check

### Next.js API Routes (Port 3000)

- `POST /api/auth/register` - Proxies to Express server
- `POST /api/auth/login` - Proxies to Express server
- `GET/POST /api/auth/[...nextauth]` - NextAuth endpoints

## User Schema

```javascript
{
  firstName: String (required, max 50 chars),
  lastName: String (required, max 50 chars),
  email: String (required, unique),
  phone: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

## Features in Detail

### Registration Form

- First Name and Last Name (50/50 split, max 50 chars each)
- Email (unique validation)
- Phone Number (unique validation)
- Password and Confirm Password (50/50 split)
- Google OAuth button
- Form validation and error handling

### Login Form

- Email and Password fields
- Google OAuth button
- Password visibility toggle
- Form validation and error handling

### Dashboard

- User profile information display
- Feature cards showing upcoming functionality
- Sign out functionality
- Responsive design with dark/light mode

## Environment Variables Explained

| Variable               | Description                | Required | Default                 |
| ---------------------- | -------------------------- | -------- | ----------------------- |
| `NEXTAUTH_URL`         | Your application URL       | Yes      | `http://localhost:3000` |
| `NEXTAUTH_SECRET`      | Secret key for NextAuth    | Yes      | -                       |
| `MONGODB_URI`          | MongoDB connection string  | Yes      | -                       |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID     | No       | -                       |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No       | -                       |
| `EXPRESS_SERVER_URL`   | Express server URL         | Yes      | `http://localhost:5000` |
| `PORT`                 | Express server port        | No       | `5000`                  |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/yourusername/CareerCraft/issues) page
2. Create a new issue with detailed information
3. Include your environment details and error messages

## Roadmap

- [ ] AI Career Roadmap implementation
- [ ] Opportunity Hub with real data
- [ ] AI Chatbot Mentor
- [ ] Skill Analytics dashboard
- [ ] Trend Insights integration
- [ ] Community features
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Integration with learning platforms
- [ ] Job matching system

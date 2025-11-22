# 🎯 AI Interview Practice Platform

[![GitHub](https://img.shields.io/badge/GitHub-asrath11%2Fai--interviewer-181717?style=flat-square&logo=github)](https://github.com/asrath11/ai-interviewer)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.18-2D3748?style=flat-square&logo=prisma)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat-square&logo=tailwind-css)

> **Note:** This project uses Hume AI for voice-based interviews. The mock interview feature is currently disabled as it requires a paid Hume AI subscription. The platform is fully functional for job description management and interview preparation.

An intelligent interview preparation platform powered by AI that helps job seekers practice interviews, improve their responses, and build confidence before the real thing.

🔗 **Repository:** [https://github.com/asrath11/ai-interviewer](https://github.com/asrath11/ai-interviewer)

## ✨ Features

### 🎤 AI-Powered Voice Interviews
- **Real-time voice conversations** with AI interviewer using Hume AI
- **Adaptive questioning** based on job description and experience level
- **Natural conversation flow** with emotional intelligence
- **Interview recording** and playback capabilities

### 📝 Job Description Management
- Create and manage multiple job descriptions
- Specify experience levels (Entry, Mid, Senior)
- Organize interviews by job position
- Track interview history and performance

### 🔐 Authentication & Security
- **NextAuth.js** integration with multiple providers
- Google OAuth authentication
- Email/password authentication with bcrypt
- Secure session management
- Protected routes and API endpoints

### 🎨 Modern UI/UX
- **Responsive design** that works on all devices
- **Dark/Light mode** support with next-themes
- **Shadcn/ui** components for consistent design
- **Framer Motion** animations for smooth interactions
- **Accessible** components following WCAG guidelines

### 📊 Dashboard Features
- Personal dashboard for managing job descriptions
- Interview history and analytics
- Quick access to create new interviews
- Job description cards with edit/delete functionality

## 🚀 Tech Stack

### Frontend
- **Next.js 15.5** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Shadcn/ui** - Component library
- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless functions
- **Prisma** - ORM for database management
- **PostgreSQL** - Database (via Neon)
- **NextAuth.js** - Authentication
- **bcrypt** - Password hashing

### AI & Voice
- **Hume AI** - Voice-based AI interviews with emotional intelligence
- **@humeai/voice-react** - React hooks for Hume integration
- **Google AI SDK** - Additional AI capabilities

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast bundler
- **pnpm** - Package manager

## 📁 Project Structure

```
ai-interviewer/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── hume/                 # Hume AI integration
│   │   ├── interviews/           # Interview management
│   │   └── job-info/             # Job CRUD operations
│   ├── components/               # Landing page components
│   ├── dashboard/                # Dashboard pages
│   │   ├── job-infos/            # Job management
│   │   └── components/           # Dashboard components
│   ├── signin/                   # Sign in page
│   ├── signup/                   # Sign up page
│   └── layout.tsx                # Root layout
│
├── components/                   # Shared components
│   ├── ui/                       # Shadcn UI components
│   ├── dashboard/                # Dashboard features
│   ├── interview/                # Interview components
│   └── marketing/                # Landing page components
│
├── lib/                          # Utilities
│   ├── prisma.ts                 # Database client
│   ├── utils.ts                  # Helper functions
│   └── authoption.ts             # Auth configuration
│
├── services/                     # External services
│   ├── api/                      # API service functions
│   └── ai/                       # AI integrations
│
├── types/                        # TypeScript definitions
│   ├── jobInfo.ts
│   ├── interview.ts
│   └── resumeAnalysis.ts
│
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
│
└── public/                       # Static assets
```

## 🛠️ Installation

### Prerequisites
- Node.js 20+ 
- pnpm (recommended) or npm
- PostgreSQL database (or Neon account)
- Google OAuth credentials
- Hume AI API keys (for voice interviews)

### 1. Clone the repository
```bash
git clone https://github.com/asrath11/ai-interviewer.git
cd ai-interviewer
```

### 2. Install dependencies
```bash
pnpm install
# or
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="your-random-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Hume AI (Required for voice interviews)
NEXT_PUBLIC_HUME_API_KEY="your-hume-api-key"
NEXT_PUBLIC_HUME_SECRET_KEY="your-hume-secret-key"
NEXT_PUBLIC_HUME_CONFIG_ID="your-hume-config-id"
```

### 4. Set up the database
```bash
# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# (Optional) Seed the database
pnpm prisma db seed
```

### 5. Run the development server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🔑 Getting API Keys

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### Hume AI (For Voice Interviews)
1. Sign up at [Hume AI](https://www.hume.ai/)
2. Create a new project
3. Get your API key and secret from the dashboard
4. Create a voice configuration and note the config ID

### Database (Neon)
1. Sign up at [Neon](https://neon.tech/)
2. Create a new project
3. Copy the connection string
4. Add to `.env` as `DATABASE_URL`

## 📝 Usage

### Creating a Job Description
1. Sign in to your account
2. Navigate to the Dashboard
3. Click "Create Job Description"
4. Fill in the job details:
   - Job title
   - Experience level
   - Job description
5. Save the job description

### Starting an Interview (Requires Hume AI)
1. Go to your job description
2. Click "Start Interview"
3. Allow microphone access
4. Begin speaking with the AI interviewer
5. The AI will ask relevant questions based on the job description

### Managing Interviews
- View all your interviews in the dashboard
- Access interview recordings and transcripts
- Review AI feedback and suggestions
- Track your progress over time

## 🎨 Customization

### Styling
The project uses Tailwind CSS with a custom theme. Modify `app/globals.css` to change colors and styles:

```css
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    /* ... more variables */
  }
```

### Components
All UI components are in `components/ui/` and can be customized using the `cn()` utility for conditional classes.

## 🧪 Testing

```bash
# Run linting
pnpm lint

# Type checking
pnpm tsc --noEmit
```

## 📦 Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Railway
- Render
- AWS
- DigitalOcean

## 🔒 Security Considerations

- All passwords are hashed using bcrypt
- API routes are protected with NextAuth middleware
- Environment variables are never exposed to the client
- CORS is configured for API routes
- SQL injection protection via Prisma

## 🐛 Known Issues

- **Hume AI Integration**: Voice interviews require a paid Hume AI subscription
- **Mock Interviews**: Currently disabled due to API costs
- **Browser Compatibility**: Voice features work best in Chrome/Edge

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Hume AI](https://www.hume.ai/) - Voice AI with emotional intelligence
- [Shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js

## 📧 Contact

For questions or support, please open an issue on [GitHub](https://github.com/asrath11/ai-interviewer/issues).

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on [GitHub](https://github.com/asrath11/ai-interviewer)!

---

**Built with ❤️ using Next.js and AI**

[View on GitHub](https://github.com/asrath11/ai-interviewer) • [Report Bug](https://github.com/asrath11/ai-interviewer/issues) • [Request Feature](https://github.com/asrath11/ai-interviewer/issues)

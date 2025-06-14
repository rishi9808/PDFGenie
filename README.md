# PDFGenie - AI-Powered PDF Chat Application

<div align="center">
  <h3>Transform your PDF documents into interactive conversations</h3>
  <p>Upload, analyze, and chat with your PDFs using advanced AI technology</p>
</div>

## 🚀 Features

- **Intelligent PDF Chat**: Engage in natural conversations with your PDF documents
- **Smart Document Processing**: Automatic analysis and understanding of PDF content
- **Secure Cloud Storage**: Enterprise-grade security with end-to-end encryption
- **Rich Text Editor**: Built-in editor for taking notes while reviewing documents
- **User Authentication**: Secure authentication system powered by Clerk
- **Responsive Design**: Modern, mobile-friendly interface
- **Real-time Updates**: Live chat functionality with instant responses

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives

### Backend & Database
- **Convex** - Backend-as-a-Service with real-time capabilities
- **Clerk** - Authentication and user management
- **Vector Database** - Document embeddings for AI chat

### AI & Document Processing
- **OpenAI** - AI-powered chat functionality
- **LangChain** - Document processing and embeddings
- **PDF-Parse** - PDF text extraction

### Editor
- **Tiptap** - Rich text editor
- **Lowlight** - Code syntax highlighting

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-with-pdf
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key

   # Convex
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   CONVEX_DEPLOY_KEY=your_convex_deploy_key

   # OpenAI
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Set up Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### For Users

1. **Sign Up/Sign In**: Create an account or sign in to access the platform
2. **Upload PDFs**: Upload up to 3 PDFs for free (premium plans available)
3. **Start Chatting**: Ask questions about your documents and get AI-powered answers
4. **Take Notes**: Use the built-in editor to take notes while reviewing documents
5. **Manage Workspace**: Organize your documents and conversations

### For Developers

The application follows a modern Next.js architecture:

- **`/app`** - App Router pages and layouts
- **`/components`** - Reusable React components
- **`/convex`** - Backend functions and schema
- **`/lib`** - Utility functions and configurations
- **`/hooks`** - Custom React hooks

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `NEXT_PUBLIC_CONVEX_URL` | Convex backend URL | Yes |
| `CONVEX_DEPLOY_KEY` | Convex deployment key | Yes |
| `OPENAI_API_KEY` | OpenAI API key for AI features | Yes |

### Clerk Setup

1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Configure authentication providers
3. Set up webhooks for user management
4. Add environment variables to your project

### Convex Setup

1. Create a Convex project at [convex.dev](https://convex.dev)
2. Deploy your schema and functions
3. Configure vector search for document embeddings
4. Set up real-time subscriptions

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Add environment variables** in the Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy your application

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## 📁 Project Structure

```
chat-with-pdf/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── api/                      # API routes
│   ├── dashboard/                # Dashboard pages
│   ├── workspace/                # Workspace pages
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── auth/                     # Authentication components
│   ├── dashboard/                # Dashboard components
│   ├── landing/                  # Landing page components
│   ├── ui/                       # UI components
│   └── workspace/                # Workspace components
├── convex/                       # Backend functions
│   ├── _generated/               # Auto-generated types
│   ├── langchain/                # LangChain integration
│   └── schema.ts                 # Database schema
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
└── public/                       # Static assets
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔐 Security

- All user data is encrypted in transit and at rest
- Authentication handled by Clerk with industry-standard security
- PDF files are securely stored and processed
- API routes are protected with authentication middleware


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


<div align="center">
  <p>Made with ❤️ by Rishkesh K V</p>
</div>

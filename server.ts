import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory OTP storage for authentication
interface OtpSession {
  phone: string;
  otp: string;
  expiresAt: number;
}
const otpStore = new Map<string, OtpSession>();

// Lazy server-side Gemini client setup
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    try {
      genAIClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (err) {
      console.error('Failed to initialize GoogleGenAI client:', err);
    }
  }
  return genAIClient;
}

// In-memory User Database
interface UserRecord {
  uid: string;
  displayName: string;
  email: string;
  password?: string;
  photoURL?: string;
  authProvider: 'google' | 'email' | 'phone';
  enrolledCourseIds: string[];
  completedLessons: Record<string, string[]>;
  completedCourses: string[];
  bookmarkedCourseIds: string[];
  quizScores: Record<string, number>;
  learningStreakDays: number;
  joinedDate: string;
}

const usersDb = new Map<string, UserRecord>();

// Helper to format user record for response
function sanitizeUser(user: UserRecord) {
  const { password, ...safeUser } = user;
  return safeUser;
}

// 1. Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth API: Email & Password Registration
app.post('/api/auth/register', (req, res) => {
  const { displayName, email, password } = req.body;

  if (!displayName || typeof displayName !== 'string' || !displayName.trim()) {
    return res.status(400).json({ success: false, message: 'Full name is required.' });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (usersDb.has(normalizedEmail)) {
    return res.status(400).json({
      success: false,
      message: 'An account with this email already exists. Please log in instead.',
    });
  }

  const newUser: UserRecord = {
    uid: `email_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    displayName: displayName.trim(),
    email: normalizedEmail,
    password: password,
    photoURL: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150`,
    authProvider: 'email',
    enrolledCourseIds: ['prog-python-01'],
    completedLessons: {},
    completedCourses: [],
    bookmarkedCourseIds: [],
    quizScores: {},
    learningStreakDays: 1,
    joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  };

  usersDb.set(normalizedEmail, newUser);

  return res.json({
    success: true,
    message: 'Account created successfully!',
    user: sanitizeUser(newUser),
  });
});

// Auth API: Email & Password Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ success: false, message: 'Password is required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = usersDb.get(normalizedEmail);

  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: 'No account found with this email. Please register first.',
    });
  }

  if (existingUser.password && existingUser.password !== password) {
    return res.status(400).json({
      success: false,
      message: 'Incorrect password. Please check and try again.',
    });
  }

  return res.json({
    success: true,
    message: 'Signed in successfully!',
    user: sanitizeUser(existingUser),
  });
});

// Auth API: Google Sign-In (Direct Data Endpoint)
app.post('/api/auth/google', (req, res) => {
  const { email, displayName, photoURL } = req.body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Valid Google email is required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  let user = usersDb.get(normalizedEmail);

  if (!user) {
    const defaultName = displayName && displayName.trim() ? displayName.trim() : normalizedEmail.split('@')[0];
    user = {
      uid: `google_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      displayName: defaultName,
      email: normalizedEmail,
      photoURL: photoURL || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,
      authProvider: 'google',
      enrolledCourseIds: ['prog-python-01', 'ai-prompt-genai-01'],
      completedLessons: { 'prog-python-01': ['py-l1'] },
      completedCourses: [],
      bookmarkedCourseIds: ['edit-premiere-01'],
      quizScores: {},
      learningStreakDays: 2,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };
    usersDb.set(normalizedEmail, user);
  } else {
    // Update display name or photo if provided
    if (displayName && displayName.trim()) {
      user.displayName = displayName.trim();
    }
    if (photoURL) {
      user.photoURL = photoURL;
    }
    user.authProvider = 'google';
  }

  return res.json({
    success: true,
    message: 'Signed in with Google successfully!',
    user: sanitizeUser(user),
  });
});

// Google OAuth 2.0: Get Authorization URL
app.get('/api/auth/google/url', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientOrigin = (req.query.origin as string) || process.env.APP_URL || 'http://localhost:3000';
  const cleanOrigin = clientOrigin.replace(/\/+$/, '');
  const redirectUri = `${cleanOrigin}/auth/callback`;

  if (!clientId) {
    return res.json({
      success: false,
      configured: false,
      message: 'GOOGLE_CLIENT_ID environment variable is not configured yet.',
      redirectUri,
    });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  return res.json({
    success: true,
    configured: true,
    url: authUrl,
    redirectUri,
  });
});

// Google OAuth 2.0: Callback Handler for Popup
app.get(['/auth/callback', '/auth/callback/'], async (req, res) => {
  const { code, error } = req.query;

  if (error || !code) {
    const errorMsg = (error as string) || 'Authorization was cancelled or failed.';
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Google Authentication</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #0f172a; color: #f87171;">
          <h2>Authentication Failed</h2>
          <p>${errorMsg}</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: ${JSON.stringify(errorMsg)} }, '*');
              setTimeout(() => window.close(), 1500);
            }
          </script>
        </body>
      </html>
    `);
  }

  try {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
    const origin = process.env.APP_URL || `${protocol}://${host}`;
    const cleanOrigin = origin.replace(/\/+$/, '');
    const redirectUri = `${cleanOrigin}/auth/callback`;

    // Exchange authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: code as string,
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error('Failed to exchange code for tokens:', tokenData);
      const errMsg = tokenData.error_description || tokenData.error || 'Failed to exchange authorization code.';
      return res.send(`
        <!DOCTYPE html>
        <html>
          <head><title>Google Authentication</title></head>
          <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #0f172a; color: #f87171;">
            <h2>Authentication Error</h2>
            <p>${errMsg}</p>
            <p style="color: #94a3b8; font-size: 12px;">Make sure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are valid and the redirect URI matches Google Cloud Console.</p>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: ${JSON.stringify(errMsg)} }, '*');
                setTimeout(() => window.close(), 2500);
              }
            </script>
          </body>
        </html>
      `);
    }

    // Fetch user profile from Google UserInfo endpoint
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const googleUser = await userInfoResponse.json();

    if (!userInfoResponse.ok || !googleUser.email) {
      return res.status(400).send('Unable to retrieve user information from Google.');
    }

    const normalizedEmail = (googleUser.email as string).trim().toLowerCase();
    let user = usersDb.get(normalizedEmail);

    if (!user) {
      user = {
        uid: `google_oauth_${googleUser.sub || Date.now()}`,
        displayName: googleUser.name || googleUser.given_name || normalizedEmail.split('@')[0],
        email: normalizedEmail,
        photoURL: googleUser.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        authProvider: 'google',
        enrolledCourseIds: ['prog-python-01', 'ai-prompt-genai-01'],
        completedLessons: { 'prog-python-01': ['py-l1'] },
        completedCourses: [],
        bookmarkedCourseIds: ['edit-premiere-01'],
        quizScores: {},
        learningStreakDays: 2,
        joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      };
      usersDb.set(normalizedEmail, user);
    } else {
      if (googleUser.name) user.displayName = googleUser.name;
      if (googleUser.picture) user.photoURL = googleUser.picture;
      user.authProvider = 'google';
    }

    const sanitized = sanitizeUser(user);

    return res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Authentication Successful</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #0f172a; color: #38bdf8;">
          <h2>Signed In Successfully!</h2>
          <p style="color: #94a3b8;">Welcome, ${sanitized.displayName}. Closing window...</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS', user: ${JSON.stringify(sanitized)} }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
        </body>
      </html>
    `);
  } catch (err) {
    console.error('Error handling Google OAuth callback:', err);
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head><title>Google Authentication</title></head>
        <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #0f172a; color: #f87171;">
          <h2>Authentication Error</h2>
          <p>${err instanceof Error ? err.message : 'Server error processing Google Sign In.'}</p>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_ERROR', error: 'Authentication failed.' }, '*');
              setTimeout(() => window.close(), 2000);
            }
          </script>
        </body>
      </html>
    `);
  }
});


// 2. Auth: Send OTP
app.post('/api/auth/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid phone number with country code.',
    });
  }

  const normalizedPhone = phone.replace(/\s+/g, '');
  // Generate random 6-digit OTP
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const sessionToken = `otp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // Store in memory for 10 minutes
  otpStore.set(sessionToken, {
    phone: normalizedPhone,
    otp: generatedOtp,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });

  console.log(`[OTP Sent] Phone: ${normalizedPhone} | Code: ${generatedOtp} | Session: ${sessionToken}`);

  return res.json({
    success: true,
    message: `OTP sent successfully to ${normalizedPhone}`,
    sessionToken,
    otpForDemo: generatedOtp, // Included so user can test OTP immediately without real SMS gateway charges
  });
});

// 3. Auth: Verify OTP
app.post('/api/auth/verify-otp', (req, res) => {
  const { sessionToken, otp, phone } = req.body;

  if (!sessionToken || !otp) {
    return res.status(400).json({
      success: false,
      message: 'Session token and 6-digit OTP are required.',
    });
  }

  const stored = otpStore.get(sessionToken);
  if (!stored) {
    // Fallback demo check if session expired or sandbox reset
    if (otp === '123456' || otp === '654321') {
      return res.json({
        success: true,
        message: 'Phone number verified successfully!',
        user: {
          uid: `phone_${Date.now()}`,
          displayName: `Student ${phone ? phone.slice(-4) : 'User'}`,
          phone: phone || '+91 9876543210',
          authProvider: 'phone',
          isPhoneVerified: true,
        },
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Invalid or expired OTP session. Please request a new OTP.',
    });
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(sessionToken);
    return res.status(400).json({
      success: false,
      message: 'OTP has expired. Please resend a new OTP code.',
    });
  }

  if (stored.otp !== otp.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Incorrect OTP code. Please check and try again.',
    });
  }

  // OTP verified successfully!
  otpStore.delete(sessionToken);
  return res.json({
    success: true,
    message: 'Mobile number verified successfully!',
    user: {
      uid: `phone_${Date.now()}`,
      displayName: `Student (${stored.phone.slice(-4)})`,
      phone: stored.phone,
      authProvider: 'phone',
      isPhoneVerified: true,
    },
  });
});

// 4. Gemini AI Course Assistant / Mentor Chat
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { prompt, courseContext, history } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getGenAI();
    if (!ai) {
      // Graceful fallback response if process.env.GEMINI_API_KEY is not configured yet
      return res.json({
        reply: `Hello! I am EduPulse AI Mentor. I can assist you with your learning journey, course selection, coding bugs, video lesson doubts, and interview preparation. 

(Note: For live full Gemini AI reasoning, please ensure your GEMINI_API_KEY is active in Settings > Secrets).

Based on your question: "${prompt}", I recommend exploring our Programming, AI & ML, and Web Development course paths!`,
      });
    }

    const systemInstruction = `You are EduPulse AI, an intelligent, empathetic, and expert learning assistant for the EduPulse Online Courses platform.
The platform offers comprehensive, free & fully-loaded courses across multiple categories:
1. Programming Languages (Python, C++, JS, TS, Rust, Java)
2. Editing Softwares (Premiere Pro, After Effects, DaVinci Resolve, Photoshop, Blender)
3. AI Related (Generative AI, Prompt Engineering, LLMs, PyTorch, Machine Learning)
4. Data Analyst (Excel, SQL, Power BI, Data Visualization)
5. Web & App Development (React 19, MERN Stack, Flutter, Next.js)
6. Trading & Stock Market (Technical Analysis, Algo Trading, Price Action, Options)
7. Hacking & Security (Ethical Hacking, Penetration Testing, OWASP, Wireshark)
8. Study & MNC Interviews (FAANG DSA, System Design, GATE CS, Aptitude, Mock HR Prep)
9. Computer Basics (Computer Hardware, Windows/OS, MS Office Suite)

Your Goal:
- Answer student doubts clearly with concise bullet points, code snippets, or step-by-step explanations.
- If asked about course recommendations, point them to specific courses available on EduPulse.
- If user asks about certificates or OTP verification, explain how EduPulse allows Google & Mobile Sign-In and instant Certificate download upon quiz completion.
- Keep responses friendly, structured, clear, and inspiring!
${courseContext ? `Current Course Context: ${JSON.stringify(courseContext)}` : ''}`;

    let contents = prompt;
    if (history && Array.isArray(history) && history.length > 0) {
      const formattedHistory = history.map((h: { sender: string; text: string }) => `${h.sender === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n');
      contents = `Conversation History:\n${formattedHistory}\n\nUser: ${prompt}`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'I am ready to help you with any doubts regarding your course or learning journey!';
    return res.json({ reply });
  } catch (error) {
    console.error('Error in /api/gemini/chat:', error);
    return res.status(500).json({
      error: 'Failed to process AI mentor request',
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

// 5. YouTube Search Proxy or Course Recommendations
app.get('/api/youtube/search', (req, res) => {
  const query = (req.query.q as string) || '';
  if (!query) {
    return res.json({ items: [] });
  }

  // Curated Youtube course result templates for query
  const sampleVideos = [
    {
      id: 'rfscVS0vtbw',
      title: `${query} Full Course for Beginners 2026`,
      channelTitle: 'EduPulse Certified Tech',
      description: `Complete step by step tutorial on ${query} with hands-on exercises and downloadable notes.`,
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500',
    },
    {
      id: '3Kq1MIfTWCE',
      title: `${query} Masterclass & Real World Projects`,
      channelTitle: 'EduPulse Academy',
      description: `Master ${query} in this detailed video lesson with live practical examples.`,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500',
    },
  ];

  res.json({ items: sampleVideos });
});

async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`EduPulse Full-Stack Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

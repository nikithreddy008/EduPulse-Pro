import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  User,
  Mail,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle2,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { UserProfile } from '../types';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'google' | 'email'>('google');

  // Email Form State
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Google OAuth Config State
  const [isOauthConfigured, setIsOauthConfigured] = useState<boolean | null>(null);
  const [oauthRedirectUri, setOauthRedirectUri] = useState<string>('');
  const [copiedRedirectUri, setCopiedRedirectUri] = useState(false);

  // Google Demo Input State
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleName, setGoogleName] = useState('');

  // UI State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [oauthStatus, setOauthStatus] = useState<string | null>(null);
  const popupRef = useRef<Window | null>(null);

  // Check OAuth configuration on mount / open
  useEffect(() => {
    if (!isOpen) return;

    const checkOAuthConfig = async () => {
      try {
        const origin = window.location.origin;
        const res = await fetch(`/api/auth/google/url?origin=${encodeURIComponent(origin)}`);
        if (res.ok) {
          const data = await res.json();
          setIsOauthConfigured(Boolean(data.configured));
          setOauthRedirectUri(data.redirectUri || `${origin}/auth/callback`);
        }
      } catch {
        setIsOauthConfigured(false);
      }
    };

    checkOAuthConfig();
  }, [isOpen]);

  // Listen for OAuth 2.0 popup postMessage events
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Allow localhost or Cloud Run domains
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        const rawUser = event.data.user;
        if (rawUser) {
          try {
            confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
          } catch {}
          setLoading(false);
          setOauthStatus(null);
          if (popupRef.current && !popupRef.current.closed) {
            popupRef.current.close();
          }
          onSuccess(rawUser);
          onClose();
        }
      } else if (event.data?.type === 'OAUTH_AUTH_ERROR') {
        setLoading(false);
        setOauthStatus(null);
        setErrorMessage(event.data.error || 'Google OAuth failed.');
        if (popupRef.current && !popupRef.current.closed) {
          popupRef.current.close();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onSuccess, onClose]);

  if (!isOpen) return null;

  // Google Authentication via OAuth 2.0 Popup
  const handleGoogleOAuthLogin = async () => {
    setErrorMessage('');
    setOauthStatus('Connecting to Google OAuth...');
    setLoading(true);

    try {
      const origin = window.location.origin;
      const oauthRes = await fetch(`/api/auth/google/url?origin=${encodeURIComponent(origin)}`);
      const oauthData = await oauthRes.json();

      if (!oauthRes.ok || !oauthData.configured || !oauthData.url) {
        setIsOauthConfigured(false);
        setOauthRedirectUri(oauthData.redirectUri || `${origin}/auth/callback`);
        setErrorMessage(
          oauthData.message ||
            'Google OAuth credentials not found. Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in Settings > Secrets.'
        );
        setLoading(false);
        setOauthStatus(null);
        return;
      }

      // Open Google Consent Screen directly in popup
      const width = 520;
      const height = 650;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2.5;

      const authWindow = window.open(
        oauthData.url,
        'google_oauth_popup',
        `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,scrollbars=yes`
      );

      if (!authWindow) {
        setErrorMessage('Popup was blocked by your browser. Please allow popups for this site.');
        setLoading(false);
        setOauthStatus(null);
        return;
      }

      popupRef.current = authWindow;
      setOauthStatus('Waiting for Google authorization in popup...');

      // Monitor popup window closure
      const timer = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(timer);
          setLoading((prev) => {
            if (prev) {
              setOauthStatus(null);
              return false;
            }
            return prev;
          });
        }
      }, 800);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Google OAuth failed to start.');
      setLoading(false);
      setOauthStatus(null);
    }
  };

  // Direct Google Email Demo Login (Fallback)
  const handleGoogleDirectAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const targetEmail = googleEmail.trim() || 'learner@gmail.com';
    try {
      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: targetEmail,
          displayName: googleName.trim() || targetEmail.split('@')[0],
          photoURL: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Google Sign In failed.');
      }

      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } catch {}

      onSuccess(data.user);
      onClose();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Google sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  // Email & Password Authentication via Server API
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!emailInput.trim() || !emailInput.includes('@') || !emailInput.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    if (isRegistering) {
      if (!fullName.trim()) {
        setErrorMessage('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setErrorMessage('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match.');
        return;
      }
    }

    setLoading(true);

    try {
      const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
      const payload = isRegistering
        ? { displayName: fullName.trim(), email: emailInput.trim(), password }
        : { email: emailInput.trim(), password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Authentication failed. Please check credentials.');
      }

      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch {}

      onSuccess(data.user);
      onClose();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRedirectUri(true);
    setTimeout(() => setCopiedRedirectUri(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100 p-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-3">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Welcome to EduPulse</h2>
          <p className="text-xs text-slate-400 mt-1">
            Access 180+ Free YouTube Courses & Verified Certifications
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex bg-slate-950 rounded-2xl p-1 mb-5 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveTab('google');
              setErrorMessage('');
              setOauthStatus(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'google'
                ? 'bg-slate-800 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.8-.8-1.5-2.6-1.5-5s0 0 0 0z" />
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
            </svg>
            <span>Google OAuth</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('email');
              setErrorMessage('');
              setOauthStatus(null);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'email'
                ? 'bg-slate-800 text-cyan-400 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email & Password</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Status Alert */}
        {oauthStatus && (
          <div className="mb-4 p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs flex items-center gap-2 animate-in fade-in">
            <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
            <span>{oauthStatus}</span>
          </div>
        )}

        {/* Tab 1: Google Account */}
        {activeTab === 'google' && (
          <div className="space-y-4">
            {/* Primary Google OAuth 2.0 Button */}
            <button
              type="button"
              onClick={handleGoogleOAuthLogin}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-white/10 active:scale-[0.99] cursor-pointer"
            >
              {loading && oauthStatus ? (
                <RefreshCw className="w-5 h-5 animate-spin text-slate-900" />
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" />
                    <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.8-.8-1.5-2.6-1.5-5s0 0 0 0z" />
                    <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                  </svg>
                  <span>Sign In with Google</span>
                </>
              )}
            </button>

            {/* OAuth Setup Info / Guide */}
            {isOauthConfigured === false && (
              <div className="p-3.5 bg-slate-950/90 rounded-2xl border border-amber-500/30 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Google OAuth Setup Needed</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  To complete Google OAuth sign-in with your Client ID & Secret:
                </p>
                <div className="space-y-1.5 text-[11px]">
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400">1. In AI Studio <strong>Settings &gt; Secrets</strong>:</span>
                    <div className="font-mono text-cyan-400 mt-0.5">GOOGLE_CLIENT_ID</div>
                    <div className="font-mono text-cyan-400">GOOGLE_CLIENT_SECRET</div>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                    <span className="text-slate-400">2. In Google Cloud Console <strong>Authorized redirect URIs</strong>:</span>
                    <div className="flex items-center justify-between gap-1 mt-1 bg-slate-950 p-1.5 rounded font-mono text-[10px] text-cyan-300 break-all">
                      <span>{oauthRedirectUri || `${window.location.origin}/auth/callback`}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(oauthRedirectUri || `${window.location.origin}/auth/callback`)}
                        className="shrink-0 p-1 text-slate-400 hover:text-white"
                        title="Copy Redirect URI"
                      >
                        {copiedRedirectUri ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isOauthConfigured === true && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-[11px] text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Google OAuth 2.0 is active and ready to authenticate.</span>
              </div>
            )}

            {/* Direct Google Demo Login Divider & Form */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 text-[11px] text-slate-500 font-medium">Or quick demo sign in</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <form onSubmit={handleGoogleDirectAuth} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Google Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={googleEmail}
                    onChange={(e) => setGoogleEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-slate-700"
              >
                <span>Continue with Email Address</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Email & Password */}
        {activeTab === 'email' && (
          <form onSubmit={handleEmailAuth} className="space-y-3.5">
            {/* Toggle Login vs Register */}
            <div className="flex items-center justify-between bg-slate-950 p-1 rounded-xl border border-slate-800 mb-2">
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(false);
                  setErrorMessage('');
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  !isRegistering
                    ? 'bg-slate-800 text-cyan-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In (Login)
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(true);
                  setErrorMessage('');
                }}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  isRegistering
                    ? 'bg-slate-800 text-cyan-400 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Register Full Name Field */}
            {isRegistering && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="e.g. Ananya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={isRegistering}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password for Register */}
            {isRegistering && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={isRegistering}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.99]"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{isRegistering ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

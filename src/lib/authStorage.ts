import { UserProfile } from '../types';

const LOCAL_USERS_KEY = 'edupulse_users_database';

export interface StoredUser extends UserProfile {
  password?: string;
}

export function getLocalUsers(): Record<string, StoredUser> {
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveLocalUser(user: StoredUser): void {
  try {
    const users = getLocalUsers();
    users[user.email.toLowerCase().trim()] = user;
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to persist user locally:', err);
  }
}

export function findLocalUser(email: string): StoredUser | null {
  const users = getLocalUsers();
  return users[email.toLowerCase().trim()] || null;
}

export function createLocalProfile(
  email: string,
  displayName?: string,
  photoURL?: string,
  authProvider: 'google' | 'email' = 'google',
  password?: string
): UserProfile {
  const normalizedEmail = email.toLowerCase().trim();
  const existing = findLocalUser(normalizedEmail);

  if (existing) {
    if (displayName) existing.displayName = displayName;
    if (photoURL) existing.photoURL = photoURL;
    existing.authProvider = authProvider;
    saveLocalUser(existing);
    const { password: _, ...clean } = existing;
    return clean;
  }

  const defaultName = displayName?.trim() || normalizedEmail.split('@')[0];
  const newProfile: StoredUser = {
    uid: `${authProvider}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    displayName: defaultName,
    email: normalizedEmail,
    photoURL:
      photoURL ||
      (authProvider === 'google'
        ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'),
    authProvider,
    password,
    enrolledCourseIds: ['prog-python-01', 'ai-prompt-genai-01'],
    completedLessons: { 'prog-python-01': ['py-l1'] },
    completedCourses: [],
    bookmarkedCourseIds: ['edit-premiere-01'],
    quizScores: {},
    learningStreakDays: 2,
    joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
  };

  saveLocalUser(newProfile);
  const { password: _, ...clean } = newProfile;
  return clean;
}

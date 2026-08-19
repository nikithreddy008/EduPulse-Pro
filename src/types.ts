export type LanguageCode = 'en' | 'hi' | 'te' | 'mr' | 'ta' | 'kn' | 'bn';

export type CourseCategory =
  | 'All'
  | 'Programming Languages'
  | 'Editing Softwares'
  | 'AI Related'
  | 'Data Analyst'
  | 'Web & App Development'
  | 'Trading & Stock Market'
  | 'Hacking & Security'
  | 'Study & MNC Interviews'
  | 'Computer Basics';

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  youtubeVideoId: string;
  startTimeSeconds?: number;
  description?: string;
  notes?: string;
  codeSnippet?: string;
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  category: CourseCategory;
  description: string;
  instructor: string;
  instructorRole: string;
  instructorAvatar?: string;
  thumbnail: string;
  badge: 'Bestseller' | 'Trending' | 'Hot' | 'Featured' | 'Free' | 'New';
  level: CourseLevel;
  audioLanguage?: 'English' | 'Hindi' | 'Telugu' | 'Tamil' | 'Marathi' | 'All';
  rating: number;
  reviewsCount: number;
  duration: string;
  totalLessons: number;
  youtubeVideoId: string;
  youtubePlaylistId?: string;
  prerequisites: string[];
  skillsLearned: string[];
  tags: string[];
  modules: CourseModule[];
  quiz: QuizQuestion[];
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  authProvider: 'google' | 'email' | 'guest';
  enrolledCourseIds: string[];
  completedLessons: Record<string, string[]>; // courseId -> array of lessonIds
  completedCourses: string[]; // array of courseIds
  bookmarkedCourseIds: string[];
  quizScores: Record<string, number>; // courseId -> percentage score
  learningStreakDays: number;
  joinedDate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    courseId?: string;
    category?: CourseCategory;
  };
}

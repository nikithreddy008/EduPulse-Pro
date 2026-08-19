import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryBar } from './components/CategoryBar';
import { CourseCard } from './components/CourseCard';
import { CourseModal } from './components/CourseModal';
import { AuthModal } from './components/AuthModal';
import { CertificateModal } from './components/CertificateModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AiChatbot } from './components/AiChatbot';
import { Footer } from './components/Footer';
import { COURSES_DATA, COURSE_CATEGORIES } from './data/coursesData';
import { Course, CourseCategory, CourseLevel, UserProfile, LanguageCode } from './types';
import { TRANSLATIONS } from './i18n/translations';
import { auth, onAuthStateChanged, signOut, db, doc, getDoc } from './lib/firebase';
import {
  Search,
  SlidersHorizontal,
  Volume2,
} from 'lucide-react';

export default function App() {
  // Current UI Language State
  const [currentLang, setCurrentLang] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('edupulse_lang');
    return (saved as LanguageCode) || 'en';
  });

  const handleSelectLang = (lang: LanguageCode) => {
    setCurrentLang(lang);
    localStorage.setItem('edupulse_lang', lang);
  };

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  // User Authentication State
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('edupulse_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('edupulse_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('edupulse_user');
    }
  }, [user]);

  // Firebase Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const userRef = doc(db, 'users', fbUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            setUser({
              uid: fbUser.uid,
              displayName: data.displayName || fbUser.displayName || 'Learner',
              email: data.email || fbUser.email || '',
              photoURL: data.photoURL || fbUser.photoURL || '',
              authProvider: fbUser.providerData[0]?.providerId === 'google.com' ? 'google' : 'email',
              enrolledCourseIds: data.enrolledCourseIds || ['prog-python-01'],
              completedLessons: data.completedLessons || {},
              completedCourses: data.completedCourses || [],
              bookmarkedCourseIds: data.bookmarkedCourseIds || [],
              quizScores: data.quizScores || {},
              learningStreakDays: data.learningStreakDays || 1,
              joinedDate: data.joinedDate || new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            });
          }
        } catch {
          // Keep existing user state if firestore fails
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Filters & Navigation State
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<CourseLevel | 'All'>('All');
  const [badgeFilter, setBadgeFilter] = useState<string>('All');
  const [audioLangFilter, setAudioLangFilter] = useState<string>('All');

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'google' | 'phone'>('google');

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCertCourse, setSelectedCertCourse] = useState<Course | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  // Compute category count map
  const coursesCountMap = useMemo(() => {
    const map: Record<CourseCategory, number> = {
      All: COURSES_DATA.length,
      'Programming Languages': 0,
      'Editing Softwares': 0,
      'AI Related': 0,
      'Data Analyst': 0,
      'Web & App Development': 0,
      'Trading & Stock Market': 0,
      'Hacking & Security': 0,
      'Study & MNC Interviews': 0,
      'Computer Basics': 0,
    };

    COURSES_DATA.forEach((c) => {
      if (map[c.category] !== undefined) {
        map[c.category]++;
      }
    });

    return map;
  }, []);

  // Filter Courses Logic
  const filteredCourses = useMemo(() => {
    return COURSES_DATA.filter((course) => {
      // Category Filter
      if (selectedCategory !== 'All' && course.category !== selectedCategory) {
        return false;
      }

      // Level Filter
      if (levelFilter !== 'All' && course.level !== levelFilter) {
        return false;
      }

      // Badge Filter
      if (badgeFilter !== 'All' && course.badge !== badgeFilter) {
        return false;
      }

      // Audio Language Filter
      if (audioLangFilter !== 'All') {
        if (course.audioLanguage !== audioLangFilter) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesDesc = course.description.toLowerCase().includes(q);
        const matchesCat = course.category.toLowerCase().includes(q);
        const matchesInstructor = course.instructor.toLowerCase().includes(q);
        const matchesTags = course.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesTitle && !matchesDesc && !matchesCat && !matchesInstructor && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, levelFilter, badgeFilter, audioLangFilter, searchQuery]);

  // Auth Handlers
  const handleOpenAuth = (mode: 'google' | 'phone' = 'google') => {
    setAuthMode('google');
    setIsAuthOpen(true);
  };

  const handleAuthSuccess = (loggedUser: UserProfile) => {
    setUser(loggedUser);
  };

  const handleLogout = () => {
    signOut(auth).catch(() => {});
    setUser(null);
    localStorage.removeItem('edupulse_user');
  };

  // Student Name Update Handler
  const handleUpdateName = (newName: string) => {
    if (!user) return;
    const updatedUser = { ...user, displayName: newName };
    setUser(updatedUser);
  };

  // Bookmark Toggle
  const handleToggleBookmark = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      handleOpenAuth('google');
      return;
    }

    const exists = user.bookmarkedCourseIds.includes(courseId);
    const updatedBookmarks = exists
      ? user.bookmarkedCourseIds.filter((id) => id !== courseId)
      : [...user.bookmarkedCourseIds, courseId];

    setUser({
      ...user,
      bookmarkedCourseIds: updatedBookmarks,
    });
  };

  // Course Enrollment
  const handleEnroll = (courseId: string) => {
    if (!user) {
      handleOpenAuth('google');
      return;
    }

    if (!user.enrolledCourseIds.includes(courseId)) {
      setUser({
        ...user,
        enrolledCourseIds: [...user.enrolledCourseIds, courseId],
      });
    }
  };

  // Toggle Lesson Completion
  const handleToggleLessonComplete = (courseId: string, lessonId: string) => {
    if (!user) {
      handleOpenAuth('google');
      return;
    }

    const currentCompleted = user.completedLessons[courseId] || [];
    const isCompleted = currentCompleted.includes(lessonId);

    const updatedCompleted = isCompleted
      ? currentCompleted.filter((id) => id !== lessonId)
      : [...currentCompleted, lessonId];

    const courseObj = COURSES_DATA.find((c) => c.id === courseId);
    const totalLessons = courseObj?.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 0;

    let updatedCompletedCourses = user.completedCourses;
    if (totalLessons > 0 && updatedCompleted.length >= totalLessons) {
      if (!updatedCompletedCourses.includes(courseId)) {
        updatedCompletedCourses = [...updatedCompletedCourses, courseId];
      }
    }

    setUser({
      ...user,
      completedLessons: {
        ...user.completedLessons,
        [courseId]: updatedCompleted,
      },
      completedCourses: updatedCompletedCourses,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Navbar */}
      <Navbar
        user={user}
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => setIsProfileOpen(true)}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAiChat={() => setIsAiChatOpen(true)}
        bookmarkedCount={user?.bookmarkedCourseIds.length || 0}
        currentLang={currentLang}
        onSelectLang={handleSelectLang}
      />

      {/* Hero Showcase */}
      <Hero
        onSelectTag={(tag) => setSearchQuery(tag)}
        onExploreClick={() => {
          const el = document.getElementById('courses-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        currentLang={currentLang}
      />

      {/* Category Pills Bar */}
      <CategoryBar
        categories={COURSE_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        coursesCountMap={coursesCountMap}
        currentLang={currentLang}
      />

      {/* Main Course Catalog Section */}
      <main id="courses-catalog" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Catalog Header & Filters Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>
                {selectedCategory === 'All' ? 'All Fully Loaded Courses' : selectedCategory}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold">
                {filteredCourses.length} Courses
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Complete video lessons, embedded YouTube playlists, downloadable notes, and verified certificates.
            </p>
          </div>

          {/* Level, Badge & Audio Language Sub-Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Audio Language Filter */}
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={audioLangFilter}
                onChange={(e) => setAudioLangFilter(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-medium"
              >
                <option value="All" className="bg-slate-900">All Audio Languages</option>
                <option value="English" className="bg-slate-900">English Audio</option>
                <option value="Hindi" className="bg-slate-900">Hindi (हिन्दी)</option>
                <option value="Telugu" className="bg-slate-900">Telugu (తెలుగు)</option>
                <option value="Tamil" className="bg-slate-900">Tamil (தமிழ்)</option>
                <option value="Marathi" className="bg-slate-900">Marathi (मराठी)</option>
              </select>
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value as CourseLevel | 'All')}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-medium"
              >
                <option value="All" className="bg-slate-900">All Levels</option>
                <option value="Beginner" className="bg-slate-900">Beginner</option>
                <option value="Intermediate" className="bg-slate-900">Intermediate</option>
                <option value="Advanced" className="bg-slate-900">Advanced</option>
              </select>
            </div>

            {/* Badge Filter */}
            <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <select
                value={badgeFilter}
                onChange={(e) => setBadgeFilter(e.target.value)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer font-medium"
              >
                <option value="All" className="bg-slate-900">All Badges</option>
                <option value="Bestseller" className="bg-slate-900">Bestsellers</option>
                <option value="Trending" className="bg-slate-900">Trending</option>
                <option value="Hot" className="bg-slate-900">Hot</option>
                <option value="Featured" className="bg-slate-900">Featured</option>
                <option value="Free" className="bg-slate-900">Free</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const isBookmarked = user?.bookmarkedCourseIds.includes(course.id) || false;
              const isEnrolled = user?.enrolledCourseIds.includes(course.id) || false;

              const completed = user?.completedLessons[course.id] || [];
              const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
              const progressPercent = totalLessons > 0 ? Math.round((completed.length / totalLessons) * 100) : 0;

              return (
                <CourseCard
                  key={course.id}
                  course={course}
                  onOpenCourse={(c) => setSelectedCourse(c)}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={handleToggleBookmark}
                  isEnrolled={isEnrolled}
                  progressPercent={progressPercent}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 max-w-lg mx-auto p-6">
            <Search className="w-10 h-10 text-slate-500 mx-auto mb-3 animate-bounce" />
            <h3 className="text-lg font-bold text-white">No courses matched your query</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Try searching for "Python", "Video Editing", "AI", "Data Analyst", "Stock Market", or resetting audio language filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setLevelFilter('All');
                setBadgeFilter('All');
                setAudioLangFilter('All');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('courses-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      {/* 1. Auth Modal (Google & Email Sign-in) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* 2. Course Details & Video Player Modal */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          user={user}
          onEnroll={handleEnroll}
          completedLessons={user?.completedLessons[selectedCourse.id] || []}
          onToggleLessonComplete={handleToggleLessonComplete}
          onOpenCertificate={(c) => {
            setSelectedCourse(null);
            setSelectedCertCourse(c);
          }}
          onOpenAuth={() => handleOpenAuth('google')}
          isBookmarked={user?.bookmarkedCourseIds.includes(selectedCourse.id) || false}
          onToggleBookmark={handleToggleBookmark}
        />
      )}

      {/* 3. Certificate Generator Modal */}
      {selectedCertCourse && (
        <CertificateModal
          course={selectedCertCourse}
          user={user}
          isOpen={!!selectedCertCourse}
          onClose={() => setSelectedCertCourse(null)}
          onUpdateName={handleUpdateName}
        />
      )}

      {/* 4. User Profile & Learning Dashboard Modal */}
      {isProfileOpen && (
        <UserProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          user={user}
          allCourses={COURSES_DATA}
          onOpenCourse={(c) => setSelectedCourse(c)}
          onOpenCertificate={(c) => setSelectedCertCourse(c)}
          onUpdateName={handleUpdateName}
        />
      )}

      {/* 5. EduPulse AI Mentor Assistant Chatbot */}
      <AiChatbot
        isOpen={isAiChatOpen}
        onToggle={() => setIsAiChatOpen(!isAiChatOpen)}
      />
    </div>
  );
}

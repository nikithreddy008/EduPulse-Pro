import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Award,
  Bookmark,
  Flame,
  CheckCircle,
  Play,
  Download,
  ShieldCheck,
  Edit3,
  Check,
} from 'lucide-react';
import { Course, UserProfile } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  allCourses: Course[];
  onOpenCourse: (course: Course) => void;
  onOpenCertificate: (course: Course) => void;
  onUpdateName?: (newName: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  allCourses,
  onOpenCourse,
  onOpenCertificate,
  onUpdateName,
}) => {
  const [activeTab, setActiveTab] = useState<'enrolled' | 'certificates' | 'bookmarks'>('enrolled');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user?.displayName || '');

  if (!isOpen || !user) return null;

  const handleSaveName = () => {
    if (onUpdateName && editedName.trim()) {
      onUpdateName(editedName.trim());
    }
    setIsEditingName(false);
  };

  const enrolledCourses = allCourses.filter((c) => user.enrolledCourseIds.includes(c.id));
  const bookmarkedCourses = allCourses.filter((c) => user.bookmarkedCourseIds.includes(c.id));
  const completedCourses = allCourses.filter((c) => user.completedCourses.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 text-slate-100 my-auto flex flex-col max-h-[88vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Banner Header */}
        <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 mb-6">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-16 h-16 rounded-2xl border-2 border-cyan-400 object-cover shadow-lg"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
              {user.displayName.charAt(0)}
            </div>
          )}

          <div className="flex-1 min-w-0">
            {isEditingName ? (
              <div className="flex items-center gap-2 mb-1">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder="Enter full student name"
                  className="bg-slate-900 border border-cyan-500 rounded-xl px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="px-3 py-1 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1 hover:bg-cyan-400 transition-colors"
                >
                  <Check className="w-3.5 h-3.5" /> Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white truncate">{user.displayName}</h2>
                <button
                  onClick={() => {
                    setEditedName(user.displayName);
                    setIsEditingName(true);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                  title="Edit name printed on certificate"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                {user.isPhoneVerified && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Phone Verified
                  </span>
                )}
              </div>
            )}

            <p className="text-[11px] text-cyan-400 font-medium">
              Printed on Certificate of Completion
            </p>
            <p className="text-xs text-slate-400 truncate mt-0.5">{user.email || user.phone}</p>
            <p className="text-[11px] text-slate-500 mt-1">
              Member since {user.joinedDate} • Signed in via{' '}
              <strong className="text-slate-300 capitalize">{user.authProvider}</strong>
            </p>
          </div>
        </div>

        {/* Learning Stats Bar */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center text-amber-400 mb-1">
              <Flame className="w-4 h-4" />
            </div>
            <p className="text-base font-extrabold text-white">{user.learningStreakDays} Days</p>
            <p className="text-[10px] text-slate-400">Streak</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center text-cyan-400 mb-1">
              <BookOpen className="w-4 h-4" />
            </div>
            <p className="text-base font-extrabold text-white">{enrolledCourses.length}</p>
            <p className="text-[10px] text-slate-400">Enrolled</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center text-emerald-400 mb-1">
              <Award className="w-4 h-4" />
            </div>
            <p className="text-base font-extrabold text-white">{completedCourses.length}</p>
            <p className="text-[10px] text-slate-400">Certificates</p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-center">
            <div className="flex items-center justify-center text-purple-400 mb-1">
              <Bookmark className="w-4 h-4" />
            </div>
            <p className="text-base font-extrabold text-white">{bookmarkedCourses.length}</p>
            <p className="text-[10px] text-slate-400">Saved</p>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-4">
          <button
            onClick={() => setActiveTab('enrolled')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'enrolled'
                ? 'bg-slate-800 text-cyan-400 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            My Courses ({enrolledCourses.length})
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'certificates'
                ? 'bg-slate-800 text-emerald-400 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Certificates ({completedCourses.length})
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-slate-800 text-purple-400 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Saved Bookmarks ({bookmarkedCourses.length})
          </button>
        </div>

        {/* Tab Content List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {activeTab === 'enrolled' && (
            <div>
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map((c) => {
                  const doneLessons = user.completedLessons[c.id] || [];
                  const totalCount = c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                  const progress = totalCount > 0 ? Math.round((doneLessons.length / totalCount) * 100) : 0;

                  return (
                    <div
                      key={c.id}
                      className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 mb-2"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={c.thumbnail}
                          alt={c.title}
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (!target.src.includes('mqdefault')) {
                              target.src = `https://i.ytimg.com/vi/${c.youtubeVideoId}/mqdefault.jpg`;
                            }
                          }}
                          className="w-16 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{c.title}</p>
                          <p className="text-[11px] text-slate-400">{c.category}</p>
                          <div className="w-32 bg-slate-800 rounded-full h-1.5 mt-1.5">
                            <div
                              className="bg-cyan-400 h-full rounded-full"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onOpenCourse(c);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1 shrink-0"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Continue
                      </button>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-slate-400 text-center py-6">
                  No courses enrolled yet. Browse categories to start learning!
                </p>
              )}
            </div>
          )}

          {activeTab === 'certificates' && (
            <div>
              {completedCourses.length > 0 ? (
                completedCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 mb-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{c.title}</p>
                        <p className="text-[11px] text-emerald-400">Verified Certificate Ready</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onOpenCertificate(c);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center gap-1 shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" /> View
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-6">
                  Complete video lessons or pass course quizzes to earn verified certificates!
                </p>
              )}
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div>
              {bookmarkedCourses.length > 0 ? (
                bookmarkedCourses.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-3 mb-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={c.thumbnail}
                        alt={c.title}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('mqdefault')) {
                            target.src = `https://i.ytimg.com/vi/${c.youtubeVideoId}/mqdefault.jpg`;
                          }
                        }}
                        className="w-14 h-10 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{c.title}</p>
                        <p className="text-[11px] text-slate-400">{c.category}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onOpenCourse(c);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold shrink-0"
                    >
                      View
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-6">No saved courses yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

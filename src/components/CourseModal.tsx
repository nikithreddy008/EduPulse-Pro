import React, { useState } from 'react';
import {
  X,
  Play,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Sparkles,
  FileText,
  Code,
  HelpCircle,
  ChevronRight,
  Share2,
  Bookmark,
  Check,
  Send,
  Download,
  Terminal,
} from 'lucide-react';
import { Course, Lesson, UserProfile } from '../types';
import confetti from 'canvas-confetti';

interface CourseModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onEnroll: (courseId: string) => void;
  completedLessons: string[];
  onToggleLessonComplete: (courseId: string, lessonId: string) => void;
  onOpenCertificate: (course: Course) => void;
  onOpenAuth: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (courseId: string, e: React.MouseEvent) => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  isOpen,
  onClose,
  user,
  onEnroll,
  completedLessons,
  onToggleLessonComplete,
  onOpenCertificate,
  onOpenAuth,
  isBookmarked,
  onToggleBookmark,
}) => {
  // Active Tab state: 'video' | 'notes' | 'quiz' | 'ai_ask'
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'quiz' | 'ai_ask'>('video');

  // Currently selected lesson
  const firstLesson = course.modules[0]?.lessons[0];
  const [selectedLesson, setSelectedLesson] = useState<Lesson | undefined>(firstLesson);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // AI Ask state
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello! I am your AI Mentor for "${course.title}". Ask me any doubt regarding this course, concepts, or code snippets!`,
    },
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  if (!isOpen) return null;

  const isEnrolled = user?.enrolledCourseIds.includes(course.id);
  const totalLessonsCount = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = completedLessons.length;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

  // Handle Quiz Submission
  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course.quiz || course.quiz.length === 0) return;

    let correctCount = 0;
    course.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / course.quiz.length) * 100);
    setQuizScore(scorePercentage);
    setQuizSubmitted(true);

    if (scorePercentage >= 60) {
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      } catch {}
    }
  };

  // Handle Asking In-Course AI Mentor
  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim() || aiLoading) return;

    const userMsg = aiQuestion.trim();
    setAiQuestion('');
    setAiChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setAiLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          courseContext: {
            courseTitle: course.title,
            category: course.category,
            currentLesson: selectedLesson?.title,
          },
        }),
      });
      let reply = 'I am here to guide your learning!';
      if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
        const data = await res.json();
        if (data.reply) reply = data.reply;
      }
      setAiChatMessages((prev) => [
        ...prev,
        { sender: 'ai', text: reply },
      ]);
    } catch {
      setAiChatMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Key Concept Explanation for ${selectedLesson?.title || course.title}:\nReview the video lesson above or check the notes tab for code snippets!`,
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100 my-auto flex flex-col max-h-[92vh]">
        {/* Modal Top Navigation Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 truncate">
            <span className="text-xs uppercase font-bold px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {course.category}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white truncate">{course.title}</h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={(e) => onToggleBookmark(course.id, e)}
              className={`p-2 rounded-xl border text-xs transition-all ${
                isBookmarked
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Main Media & Content Area (8 cols on desktop) */}
          <div className="lg:col-span-8 flex flex-col overflow-y-auto p-4 sm:p-6 space-y-4 border-b lg:border-b-0 lg:border-r border-slate-800">
            {/* Embedded YouTube Video Player */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${
                  selectedLesson?.youtubeVideoId || course.youtubeVideoId
                }?autoplay=1&modestbranding=1&rel=0`}
                title={selectedLesson?.title || course.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Lesson Metadata & Tab Bar */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 flex-wrap gap-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {selectedLesson ? selectedLesson.title : course.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Instructor: <span className="text-slate-200">{course.instructor}</span> ({course.instructorRole})
                </p>
              </div>

              {/* Action Tabs */}
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('video')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'video'
                      ? 'bg-slate-800 text-cyan-400 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Overview</span>
                </button>

                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'notes'
                      ? 'bg-slate-800 text-purple-400 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Notes & Code</span>
                </button>

                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'quiz'
                      ? 'bg-slate-800 text-emerald-400 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Quiz Test</span>
                </button>

                <button
                  onClick={() => setActiveTab('ai_ask')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeTab === 'ai_ask'
                      ? 'bg-slate-800 text-amber-400 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Video & Overview */}
            {activeTab === 'video' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Course Description
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Skills Learned */}
                <div className="p-4 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Skills You Will Gain
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {course.skillsLearned.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-medium flex items-center gap-1.5"
                      >
                        <Check className="w-3 h-3 text-cyan-400" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Notes & Code */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Lesson Notes & Key Concepts
                    </h4>
                    <span className="text-[11px] text-slate-400">Lesson Cheat Sheet</span>
                  </div>
                  <pre className="text-xs text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                    {selectedLesson?.notes || course.description}
                  </pre>
                </div>

                {selectedLesson?.codeSnippet && (
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                        <Terminal className="w-4 h-4" /> Code Example
                      </h4>
                    </div>
                    <pre className="text-xs text-cyan-300 font-mono bg-slate-900 p-3 rounded-xl overflow-x-auto">
                      {selectedLesson.codeSnippet}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Interactive Quiz Test */}
            {activeTab === 'quiz' && (
              <div className="space-y-4">
                {course.quiz && course.quiz.length > 0 ? (
                  <form onSubmit={handleQuizSubmit} className="space-y-4">
                    {course.quiz.map((q, qIdx) => (
                      <div key={q.id} className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800">
                        <p className="text-xs sm:text-sm font-bold text-white mb-3">
                          {qIdx + 1}. {q.question}
                        </p>
                        <div className="space-y-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = selectedAnswers[q.id] === optIdx;
                            const isCorrect = q.correctAnswerIndex === optIdx;

                            let optStyle = 'bg-slate-900 border-slate-800 text-slate-300';
                            if (quizSubmitted) {
                              if (isCorrect) optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                              else if (isSelected && !isCorrect) optStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                            } else if (isSelected) {
                              optStyle = 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-semibold';
                            }

                            return (
                              <label
                                key={optIdx}
                                className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${optStyle}`}
                              >
                                <input
                                  type="radio"
                                  name={`quiz-q-${q.id}`}
                                  checked={isSelected}
                                  onChange={() =>
                                    setSelectedAnswers({ ...selectedAnswers, [q.id]: optIdx })
                                  }
                                  disabled={quizSubmitted}
                                  className="accent-cyan-500"
                                />
                                <span>{opt}</span>
                              </label>
                            );
                          })}
                        </div>

                        {quizSubmitted && (
                          <p className="mt-2 text-xs text-slate-400 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                            <strong>Explanation:</strong> {q.explanation}
                          </p>
                        )}
                      </div>
                    ))}

                    {!quizSubmitted ? (
                      <button
                        type="submit"
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20"
                      >
                        Submit Quiz Answers
                      </button>
                    ) : (
                      <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-500/30 text-center">
                        <p className="text-base font-extrabold text-white">
                          Quiz Score: <span className="text-emerald-400">{quizScore}%</span>
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {quizScore && quizScore >= 60
                            ? 'Great job! You have demonstrated core mastery in this course topic.'
                            : 'Review the video lessons and try again to boost your score!'}
                        </p>
                      </div>
                    )}
                  </form>
                ) : (
                  <p className="text-xs text-slate-400">Quiz not available for this course.</p>
                )}
              </div>
            )}

            {/* Tab 4: Ask AI Mentor */}
            {activeTab === 'ai_ask' && (
              <div className="flex flex-col h-[320px] bg-slate-950 rounded-2xl border border-slate-800 p-4">
                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {aiChatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                          msg.sender === 'user'
                            ? 'bg-cyan-500 text-slate-950 font-semibold'
                            : 'bg-slate-900 border border-slate-800 text-slate-200'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAskAi} className="mt-3 flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask AI Mentor about this lesson..."
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    type="submit"
                    disabled={aiLoading}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar Area: Modules & Lesson Timeline (4 cols on desktop) */}
          <div className="lg:col-span-4 flex flex-col bg-slate-950 p-4 sm:p-6 overflow-y-auto space-y-4">
            {/* Enrollment & Certificate Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800">
              {isEnrolled ? (
                <div>
                  <div className="flex justify-between items-center text-xs font-bold text-slate-200 mb-1">
                    <span>Course Progress</span>
                    <span className="text-cyan-400">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-3">
                    <div
                      className="bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <button
                    onClick={() => onOpenCertificate(course)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Official Certificate</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (!user) {
                      onOpenAuth();
                    } else {
                      onEnroll(course.id);
                    }
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Enroll in Course (100% Free)</span>
                </button>
              )}
            </div>

            {/* Course Syllabus & Modules */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Course Syllabus</span>
                <span className="text-[11px] text-slate-500">{totalLessonsCount} Lessons</span>
              </h4>

              <div className="space-y-3">
                {course.modules.map((m) => (
                  <div key={m.id} className="rounded-2xl bg-slate-900 border border-slate-800/80 overflow-hidden">
                    <div className="px-3.5 py-2.5 bg-slate-900/90 border-b border-slate-800/60 font-semibold text-xs text-slate-200">
                      {m.title}
                    </div>

                    <div className="divide-y divide-slate-800/50">
                      {m.lessons.map((lesson) => {
                        const isSelected = selectedLesson?.id === lesson.id;
                        const isDone = completedLessons.includes(lesson.id);

                        return (
                          <div
                            key={lesson.id}
                            onClick={() => {
                              setSelectedLesson(lesson);
                              setActiveTab('video');
                            }}
                            className={`p-3 flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-cyan-500/10 border-l-2 border-cyan-400 text-white'
                                : 'hover:bg-slate-800/60 text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onToggleLessonComplete(course.id, lesson.id);
                                }}
                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                                  isDone
                                    ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                    : 'border-slate-700 hover:border-cyan-400'
                                }`}
                              >
                                {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </button>

                              <div className="relative w-12 h-8 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                                <img
                                  src={`https://img.youtube.com/vi/${lesson.youtubeVideoId || course.youtubeVideoId}/hqdefault.jpg`}
                                  alt={lesson.title}
                                  onError={(e) => {
                                    const target = e.currentTarget;
                                    if (!target.src.includes('mqdefault')) {
                                      target.src = `https://i.ytimg.com/vi/${lesson.youtubeVideoId || course.youtubeVideoId}/mqdefault.jpg`;
                                    }
                                  }}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              <span className="text-xs font-medium truncate">{lesson.title}</span>
                            </div>

                            <span className="text-[11px] text-slate-500 shrink-0 font-mono">
                              {lesson.duration}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

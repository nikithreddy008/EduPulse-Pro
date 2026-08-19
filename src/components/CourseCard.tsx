import React from 'react';
import { Course } from '../types';
import { Star, Clock, BookOpen, Bookmark, Play, CheckCircle, Sparkles } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onOpenCourse: (course: Course) => void;
  isBookmarked: boolean;
  onToggleBookmark: (courseId: string, e: React.MouseEvent) => void;
  isEnrolled: boolean;
  progressPercent: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onOpenCourse,
  isBookmarked,
  onToggleBookmark,
  isEnrolled,
  progressPercent,
}) => {
  const getBadgeColor = (badge: Course['badge']) => {
    switch (badge) {
      case 'Bestseller':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'Trending':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'Hot':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Featured':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default:
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
    }
  };

  return (
    <div
      onClick={() => onOpenCourse(course)}
      className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl overflow-hidden shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={course.thumbnail}
          alt={course.title}
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('mqdefault')) {
              target.src = `https://i.ytimg.com/vi/${course.youtubeVideoId}/mqdefault.jpg`;
            }
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />

        {/* Overlay Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span
            className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-md border backdrop-blur-md ${getBadgeColor(
              course.badge
            )}`}
          >
            {course.badge}
          </span>
          <span className="text-[10px] font-semibold px-2 py-1 rounded-md bg-slate-950/80 text-slate-300 border border-slate-800">
            {course.level}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={(e) => onToggleBookmark(course.id, e)}
          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all ${
            isBookmarked
              ? 'bg-cyan-500 text-slate-950 shadow-md'
              : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900'
          }`}
          title={isBookmarked ? 'Remove Bookmark' : 'Save Course'}
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
          <div className="w-12 h-12 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-lg shadow-cyan-500/50 transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* YouTube Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-slate-950/80 px-2 py-0.5 rounded-md border border-rose-500/20">
          <svg className="w-3.5 h-3.5 fill-current text-rose-500" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          <span>YouTube Course</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <p className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 mb-1">
            {course.category}
          </p>

          {/* Title */}
          <h3 className="font-bold text-slate-100 text-sm sm:text-base line-clamp-2 leading-snug group-hover:text-cyan-300 transition-colors">
            {course.title}
          </h3>

          <p className="text-slate-400 text-xs line-clamp-2 mt-1.5 leading-relaxed">
            {course.description}
          </p>

          <p className="text-xs text-slate-500 mt-2 font-medium">
            By <span className="text-slate-300">{course.instructor}</span>
          </p>
        </div>

        {/* Footer Stats & Controls */}
        <div className="mt-4 pt-3 border-t border-slate-800/80">
          {isEnrolled && (
            <div className="mb-2.5">
              <div className="flex justify-between items-center text-[11px] font-semibold text-cyan-400 mb-1">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-cyan-400" /> Enrolled
                </span>
                <span>{progressPercent}% Completed</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-400 to-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-slate-400">
            {/* Rating */}
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{course.rating}</span>
              <span className="text-slate-500 font-normal">({course.reviewsCount.toLocaleString()})</span>
            </div>

            {/* Duration & Lessons */}
            <div className="flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                {course.totalLessons} Lessons
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

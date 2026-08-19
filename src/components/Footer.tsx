import React from 'react';
import { GraduationCap, Heart, ShieldCheck, Youtube, Github, Twitter } from 'lucide-react';
import { CourseCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: CourseCategory) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const CATEGORY_LINKS: CourseCategory[] = [
    'Programming Languages',
    'Editing Softwares',
    'AI Related',
    'Data Analyst',
    'Web & App Development',
    'Trading & Stock Market',
    'Hacking & Security',
    'Study & MNC Interviews',
    'Computer Basics',
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white">EduPulse</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Fully Loaded Online Courses Platform featuring YouTube curated video lessons, real-time Google & Mobile OTP Authentication, AI Mentor doubt solving, and free verified certificates.
            </p>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Popular Categories
            </h4>
            <ul className="space-y-2">
              {CATEGORY_LINKS.slice(0, 5).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-cyan-400 transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Specialized Tracks
            </h4>
            <ul className="space-y-2">
              {CATEGORY_LINKS.slice(5).map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory(cat)}
                    className="hover:text-cyan-400 transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Verification & YouTube */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Platform Features
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Google Account & Mobile OTP Auth</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Youtube className="w-4 h-4 text-rose-500" />
                <span>Embedded YouTube Playlists</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                EduPulse is 100% free for students worldwide. Build real skills and boost your tech career today.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500">
            © {new Date().getFullYear()} EduPulse Online Courses. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for learners worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

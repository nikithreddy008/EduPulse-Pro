import React from 'react';
import { CourseCategory, LanguageCode } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Code,
  Video,
  Sparkles,
  BarChart3,
  Globe,
  TrendingUp,
  Shield,
  Briefcase,
  Monitor,
  LayoutGrid,
} from 'lucide-react';

interface CategoryBarProps {
  categories: CourseCategory[];
  selectedCategory: CourseCategory;
  onSelectCategory: (cat: CourseCategory) => void;
  coursesCountMap: Record<CourseCategory, number>;
  currentLang: LanguageCode;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  coursesCountMap,
  currentLang,
}) => {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const getCategoryLabel = (cat: CourseCategory) => {
    switch (cat) {
      case 'All':
        return t.categoryAll;
      case 'Programming Languages':
        return t.categoryProgramming;
      case 'Editing Softwares':
        return t.categoryEditing;
      case 'AI Related':
        return t.categoryAi;
      case 'Data Analyst':
        return t.categoryData;
      case 'Web & App Development':
        return t.categoryWebDev;
      case 'Trading & Stock Market':
        return t.categoryTrading;
      case 'Hacking & Security':
        return t.categoryHacking;
      case 'Study & MNC Interviews':
        return t.categoryStudy;
      case 'Computer Basics':
        return t.categoryComputer;
      default:
        return cat;
    }
  };

  const getCategoryIcon = (cat: CourseCategory) => {
    switch (cat) {
      case 'Programming Languages':
        return <Code className="w-4 h-4 text-cyan-400" />;
      case 'Editing Softwares':
        return <Video className="w-4 h-4 text-purple-400" />;
      case 'AI Related':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Data Analyst':
        return <BarChart3 className="w-4 h-4 text-emerald-400" />;
      case 'Web & App Development':
        return <Globe className="w-4 h-4 text-indigo-400" />;
      case 'Trading & Stock Market':
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'Hacking & Security':
        return <Shield className="w-4 h-4 text-rose-400" />;
      case 'Study & MNC Interviews':
        return <Briefcase className="w-4 h-4 text-sky-400" />;
      case 'Computer Basics':
        return <Monitor className="w-4 h-4 text-orange-400" />;
      default:
        return <LayoutGrid className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="w-full bg-slate-950/90 py-4 border-b border-slate-800/80 sticky top-16 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = coursesCountMap[cat] || 0;

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border-cyan-500 text-white shadow-lg shadow-cyan-500/10 scale-105'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {getCategoryIcon(cat)}
                <span>{getCategoryLabel(cat)}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

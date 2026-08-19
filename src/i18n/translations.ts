import { LanguageCode } from '../types';

export interface TranslationStrings {
  // Navbar
  brandSub: string;
  searchPlaceholder: string;
  aiMentorBtn: string;
  signInBtn: string;
  joinFreeBtn: string;
  myCourses: string;
  signOut: string;
  languageSelect: string;

  // Hero
  heroBadge: string;
  heroTitlePrefix: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  heroSearchBtn: string;
  statCourses: string;
  statFree: string;
  statCategories: string;
  statVerified: string;

  // Categories
  categoryAll: string;
  categoryProgramming: string;
  categoryEditing: string;
  categoryAi: string;
  categoryData: string;
  categoryWebDev: string;
  categoryTrading: string;
  categoryHacking: string;
  categoryStudy: string;
  categoryComputer: string;

  // Filters
  filterAllLevels: string;
  filterBeginner: string;
  filterIntermediate: string;
  filterAdvanced: string;
  filterBadges: string;
  filterAudioLang: string;
  coursesFound: string;
  noCoursesFound: string;
  resetFilters: string;

  // Course Card
  youtubeCourse: string;
  enrolledBadge: string;
  completedBadge: string;
  startCourseBtn: string;
  continueCourseBtn: string;

  // Course Modal
  tabVideo: string;
  tabNotes: string;
  tabQuiz: string;
  tabAskAi: string;
  enrollActionBtn: string;
  enrolledStatusBtn: string;
  downloadCertificateBtn: string;
  modulesTitle: string;
  quizTitle: string;
  submitQuizBtn: string;
  quizScoreText: string;

  // User Profile
  myDashboard: string;
  enrolledCoursesTab: string;
  certificatesTab: string;
  bookmarkedTab: string;

  // Footer
  footerDesc: string;
  quickLinks: string;
  copyright: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationStrings> = {
  en: {
    brandSub: 'Fully Loaded Online Courses',
    searchPlaceholder: 'Search Python, Video Editing, AI, Trading, Cyber Security...',
    aiMentorBtn: 'AI Mentor',
    signInBtn: 'Sign In',
    joinFreeBtn: 'Join Free',
    myCourses: 'My Courses & Certificates',
    signOut: 'Sign Out',
    languageSelect: 'Language',

    heroBadge: '100% Free Lifetime Access • Verified YouTube Courses',
    heroTitlePrefix: 'Master In-Demand Skills with ',
    heroTitleHighlight: 'Curated Online Courses',
    heroSubtitle:
      'Explore over 180+ handpicked YouTube courses across Programming, AI, Video Editing, Stock Trading, Cyber Security, Data Analytics, and Exam Prep.',
    heroSearchBtn: 'Search',
    statCourses: '180+ Courses',
    statFree: '100% Free Access',
    statCategories: '9 Categories',
    statVerified: 'Verified YouTube Videos',

    categoryAll: 'All',
    categoryProgramming: 'Programming Languages',
    categoryEditing: 'Editing Softwares',
    categoryAi: 'AI Related',
    categoryData: 'Data Analyst',
    categoryWebDev: 'Web & App Development',
    categoryTrading: 'Trading & Stock Market',
    categoryHacking: 'Hacking & Security',
    categoryStudy: 'Study & MNC Interviews',
    categoryComputer: 'Computer Basics',

    filterAllLevels: 'All Levels',
    filterBeginner: 'Beginner',
    filterIntermediate: 'Intermediate',
    filterAdvanced: 'Advanced',
    filterBadges: 'All Badges',
    filterAudioLang: 'Audio Language',
    coursesFound: 'Courses Found',
    noCoursesFound: 'No courses match your selected filter criteria.',
    resetFilters: 'Reset Filters',

    youtubeCourse: 'YouTube Course',
    enrolledBadge: 'Enrolled',
    completedBadge: 'Completed',
    startCourseBtn: 'Start Learning',
    continueCourseBtn: 'Continue Learning',

    tabVideo: 'Video & Lessons',
    tabNotes: 'Notes & Snippets',
    tabQuiz: 'Quiz & Test',
    tabAskAi: 'Ask AI Mentor',
    enrollActionBtn: 'Enroll in Course (Free)',
    enrolledStatusBtn: 'Enrolled • Learning Active',
    downloadCertificateBtn: 'View Certificate',
    modulesTitle: 'Course Curriculum & Lessons',
    quizTitle: 'Knowledge Check Quiz',
    submitQuizBtn: 'Submit Quiz Answers',
    quizScoreText: 'Your Quiz Score',

    myDashboard: 'My Learning Dashboard',
    enrolledCoursesTab: 'Enrolled Courses',
    certificatesTab: 'Certificates Earned',
    bookmarkedTab: 'Saved Bookmarks',

    footerDesc:
      'EduPulse is a free online learning platform providing curated YouTube video courses with interactive quizzes, notes, certificates, and AI mentoring.',
    quickLinks: 'Quick Links',
    copyright: '© 2026 EduPulse PRO. All rights reserved.',
  },

  hi: {
    brandSub: 'ऑनलाइन कोर्सेज प्लेटफॉर्म',
    searchPlaceholder: 'पायथन, वीडियो एडिटिंग, AI, ट्रेडिंग खोजें...',
    aiMentorBtn: 'AI मेंटर',
    signInBtn: 'साइन इन करें',
    joinFreeBtn: 'मुफ्त जुड़ें',
    myCourses: 'मेरे कोर्स और प्रमाणपत्र',
    signOut: 'साइन आउट',
    languageSelect: 'भाषा (Language)',

    heroBadge: '100% नि:शुल्क जीवन भर पहुंच • सत्यापित यूट्यूब कोर्स',
    heroTitlePrefix: 'मांग वाले कौशल सीखें ',
    heroTitleHighlight: 'चुनिंदा ऑनलाइन कोर्सेज से',
    heroSubtitle:
      'प्रोग्रामिंग, AI, वीडियो एडिटिंग, स्टॉक ट्रेडिंग, साइबर सुरक्षा और परीक्षा की तैयारी के 180 से अधिक हाथ से चुने गए यूट्यूब कोर्स देखें।',
    heroSearchBtn: 'खोजें',
    statCourses: '180+ कोर्सेज',
    statFree: '100% मुफ्त पहुंच',
    statCategories: '9 श्रेणियां',
    statVerified: 'सत्यापित यूट्यूब वीडियो',

    categoryAll: 'सभी कोर्सेज',
    categoryProgramming: 'प्रोग्रामिंग भाषाएं',
    categoryEditing: 'वीडियो एडिटिंग सॉफ्टवेयर',
    categoryAi: 'AI और मशीन लर्निंग',
    categoryData: 'डेटा एनालिस्ट',
    categoryWebDev: 'वेब और ऐप डेवलपमेंट',
    categoryTrading: 'ट्रेडिंग और शेयर बाजार',
    categoryHacking: 'हैकिंग और सुरक्षा',
    categoryStudy: 'पढ़ाई और इंटरव्यू',
    categoryComputer: 'कंप्यूटर बेसिक',

    filterAllLevels: 'सभी स्तर',
    filterBeginner: 'शुरुआती (Beginner)',
    filterIntermediate: 'मध्यम (Intermediate)',
    filterAdvanced: 'उन्नत (Advanced)',
    filterBadges: 'सभी बैज',
    filterAudioLang: 'ऑडियो भाषा',
    coursesFound: 'कोर्स मिले',
    noCoursesFound: 'आपकी चुनी गई श्रेणियों के लिए कोई कोर्स नहीं मिला।',
    resetFilters: 'फ़िल्टर रीसेट करें',

    youtubeCourse: 'यूट्यूब कोर्स',
    enrolledBadge: 'नामांकित (Enrolled)',
    completedBadge: 'पूरा हुआ',
    startCourseBtn: 'सीखना शुरू करें',
    continueCourseBtn: 'पढ़ाई जारी रखें',

    tabVideo: 'वीडियो और पाठ',
    tabNotes: 'नोट्स और कोड',
    tabQuiz: 'क्विज टेस्ट',
    tabAskAi: 'AI मेंटर से पूछें',
    enrollActionBtn: 'कोर्स में प्रवेश लें (मुफ्त)',
    enrolledStatusBtn: 'नामांकित • पढ़ाई जारी',
    downloadCertificateBtn: 'प्रमाणपत्र देखें',
    modulesTitle: 'पाठ्यक्रम और अध्याय',
    quizTitle: 'ज्ञान परीक्षा क्विज',
    submitQuizBtn: 'उत्तर जमा करें',
    quizScoreText: 'आपका क्विज स्कोर',

    myDashboard: 'मेरा लर्निंग डैशबोर्ड',
    enrolledCoursesTab: 'नामांकित कोर्स',
    certificatesTab: 'प्राप्त प्रमाणपत्र',
    bookmarkedTab: 'सेव किए गए कोर्स',

    footerDesc:
      'EduPulse एक मुफ्त ऑनलाइन शिक्षण मंच है जो इंटरैक्टिव क्विज़, नोट्स, प्रमाणपत्र और AI मेंटरिंग के साथ चुने हुए यूट्यूब कोर्स प्रदान करता है।',
    quickLinks: 'त्वरित लिंक',
    copyright: '© 2026 EduPulse PRO. सर्वाधिकार सुरक्षित।',
  },

  te: {
    brandSub: 'పూర్తి స్థాయిలో ఆన్‌లైన్ కోర్సులు',
    searchPlaceholder: 'పైథాన్, వీడియో ఎడిటింగ్, AI, ట్రేడింగ్ వెతకండి...',
    aiMentorBtn: 'AI మెంటార్',
    signInBtn: 'సైన్ ఇన్',
    joinFreeBtn: 'ఉచితంగా చేరండి',
    myCourses: 'నా కోర్సులు & సర్టిఫికెట్లు',
    signOut: 'సైన్ అవుట్',
    languageSelect: 'భాష (Language)',

    heroBadge: '100% ఉచిత లైఫ్‌టైమ్ యాక్సెస్ • వెరిఫైడ్ యూట్యూబ్ కోర్సులు',
    heroTitlePrefix: 'అద్భుతమైన స్కిల్స్ నేర్చుకోండి ',
    heroTitleHighlight: 'ఆన్‌లైన్ కోర్సులతో',
    heroSubtitle:
      'ప్రోగ్రామింగ్, AI, వీడియో ఎడిటింగ్, స్టాక్ మార్కెట్, సైబర్ సెక్యూరిటీ మరియు ఇంటర్వ్యూ ప్రిపరేషన్‌లలో 180+ ఎంచుకున్న ఉచిత యూట్యూబ్ కోర్సులు.',
    heroSearchBtn: 'వెతుకు',
    statCourses: '180+ కోర్సులు',
    statFree: '100% ఉచితం',
    statCategories: '9 కేటగిరీలు',
    statVerified: 'వెరిఫైడ్ యూట్యూబ్ వీడియోలు',

    categoryAll: 'అన్ని కోర్సులు',
    categoryProgramming: 'ప్రోగ్రామింగ్ లాంగ్వేజెస్',
    categoryEditing: 'ఎడిటింగ్ సాఫ్ట్‌వేర్',
    categoryAi: 'AI & మిషన్ లెర్నింగ్',
    categoryData: 'డేటా అనలిస్ట్',
    categoryWebDev: 'వెబ్ & యాప్ డెవలప్‌మెంట్',
    categoryTrading: 'ట్రేడింగ్ & స్టాక్ మార్కెట్',
    categoryHacking: 'హ్యాకింగ్ & సెక్యూరిటీ',
    categoryStudy: 'స్టడీ & ఇంటర్వ్యూస్',
    categoryComputer: 'కంప్యూటర్ బేసిక్స్',

    filterAllLevels: 'అన్ని లెవెల్స్',
    filterBeginner: 'బిగినర్ (Beginner)',
    filterIntermediate: 'ఇంటర్మీడియట్',
    filterAdvanced: 'అడ్వాన్స్‌డ్',
    filterBadges: 'అన్ని బ్యాడ్జీలు',
    filterAudioLang: 'ఆడియో లాంగ్వేజ్',
    coursesFound: 'కోర్సులు లభించాయి',
    noCoursesFound: 'మీరు ఎంచుకున్న ఫిల్టర్‌కు సరిపోయే కోర్సులు లేవు.',
    resetFilters: 'ఫిల్టర్లు రీసెట్ చేయి',

    youtubeCourse: 'యూట్యూబ్ కోర్స్',
    enrolledBadge: 'ఎన్‌రోల్ చేయబడింది',
    completedBadge: 'పూర్తయింది',
    startCourseBtn: 'నేర్చుకోవడం ప్రారంభించు',
    continueCourseBtn: 'నేర్చుకోవడం కొనసాగించు',

    tabVideo: 'వీడియో & పాఠాలు',
    tabNotes: 'నోట్స్ & కోడ్',
    tabQuiz: 'క్విజ్ టెస్ట్',
    tabAskAi: 'AI మెంటార్‌ని అడగండి',
    enrollActionBtn: 'ఉచితంగా కోర్సులో చేరండి',
    enrolledStatusBtn: 'ఎన్‌రోల్ చేయబడింది • యాక్టివ్',
    downloadCertificateBtn: 'సర్టిఫికేట్ చూడండి',
    modulesTitle: 'కోర్సు పాఠ్యాంశాలు',
    quizTitle: 'నాలెడ్జ్ చెక్ క్విజ్',
    submitQuizBtn: 'సమాధానాలు సమర్పించండి',
    quizScoreText: 'మీ క్విజ్ స్కోరు',

    myDashboard: 'నా లెర్నింగ్ డాష్‌బోర్డ్',
    enrolledCoursesTab: 'చేరిన కోర్సులు',
    certificatesTab: 'పొందిన సర్టిఫికెట్లు',
    bookmarkedTab: 'సేవ్ చేసిన కోర్సులు',

    footerDesc:
      'EduPulse అనేది ఉచిత ఆన్‌లైన్ లెర్నింగ్ ప్లాట్‌ఫారమ్. ఇక్కడ నాణ్యమైన యూట్యూబ్ కోర్సులు, క్విజ్‌లు, నోట్స్ మరియు AI మెంటార్ అందుబాటులో ఉంటాయి.',
    quickLinks: 'త్వరిత లింకులు',
    copyright: '© 2026 EduPulse PRO. సర్వహక్కులూ ప్రత్యేకించబడ్డాయి.',
  },

  mr: {
    brandSub: 'संपूर्ण मोफत ऑनलाईन कोर्सेस',
    searchPlaceholder: 'पायथन, व्हिडिओ एडिटिंग, AI, ट्रेडिंग शोधा...',
    aiMentorBtn: 'AI मेंटर',
    signInBtn: 'साइन इन करा',
    joinFreeBtn: 'मोफत सामील व्हा',
    myCourses: 'माझे कोर्सेस आणि प्रमाणपत्रे',
    signOut: 'साइन आउट',
    languageSelect: 'भाषा (Language)',

    heroBadge: '100% मोफत आयुष्यभरासाठी • पडताळलेले यूट्यूब कोर्सेस',
    heroTitlePrefix: 'नवीन कौशल्ये शिका ',
    heroTitleHighlight: 'निवडक ऑनलाईन कोर्सेसद्वारे',
    heroSubtitle:
      'प्रोग्रामिंग, AI, व्हिडिओ एडिटिंग, शेअर बाजार, सायबर सुरक्षा आणि परीक्षा तयारीचे 180 पेक्षा जास्त यूट्यूब कोर्सेस मोफत शिका.',
    heroSearchBtn: 'शोधा',
    statCourses: '180+ कोर्सेस',
    statFree: '100% मोफत',
    statCategories: '9 श्रेणी',
    statVerified: 'पडताळलेले यूट्यूब व्हिडिओ',

    categoryAll: 'सर्व कोर्सेस',
    categoryProgramming: 'प्रोग्रामिंग भाषा',
    categoryEditing: 'एडिटिंग सॉफ्टवेअर',
    categoryAi: 'AI आणि मशीन लर्निंग',
    categoryData: 'डेटा ॲनालिस्ट',
    categoryWebDev: 'वेब आणि ॲप डेव्हलपमेंट',
    categoryTrading: 'ट्रेडिंग आणि शेअर बाजार',
    categoryHacking: 'हॅकिंग आणि सुरक्षा',
    categoryStudy: 'अभ्यास आणि मुलाखत',
    categoryComputer: 'संगणक मूलभूत',

    filterAllLevels: 'सर्व स्तर',
    filterBeginner: 'शुरुवातीचा (Beginner)',
    filterIntermediate: 'मध्यम',
    filterAdvanced: 'प्रगत (Advanced)',
    filterBadges: 'सर्व बॅज',
    filterAudioLang: 'ऑडिओ भाषा',
    coursesFound: 'कोर्सेस सापडले',
    noCoursesFound: 'तुमच्या फिल्टरनुसार कोणतेही कोर्सेस सापडले नाहीत.',
    resetFilters: 'फिल्टर रिसेट करा',

    youtubeCourse: 'यूट्यूब कोर्स',
    enrolledBadge: 'नोंदणीकृत',
    completedBadge: 'पूर्ण झाले',
    startCourseBtn: 'शिकण्यास सुरुवात करा',
    continueCourseBtn: 'शिकणे सुरू ठेवा',

    tabVideo: 'व्हिडिओ आणि धडे',
    tabNotes: 'नोट्स आणि कोड',
    tabQuiz: 'क्विझ परीक्षा',
    tabAskAi: 'AI मेंटरला विचारा',
    enrollActionBtn: 'मोफत प्रवेश घ्या',
    enrolledStatusBtn: 'प्रवेश घेतला • शिकणे सुरू',
    downloadCertificateBtn: 'प्रमाणपत्र पहा',
    modulesTitle: 'अभ्यासक्रम आणि धडे',
    quizTitle: 'ज्ञान चाचणी क्विझ',
    submitQuizBtn: 'उत्तर सबमिट करा',
    quizScoreText: 'तुमचा क्विझ स्कोर',

    myDashboard: 'माझे लर्निंग डॅशबोर्ड',
    enrolledCoursesTab: 'नोंदणी केलेले कोर्सेस',
    certificatesTab: 'मिळालेले प्रमाणपत्र',
    bookmarkedTab: 'सेव्ह केलेले कोर्सेस',

    footerDesc:
      'EduPulse हे एक मोफत ऑनलाईन लर्निंग प्लॅटफॉर्म आहे जे यूट्यूब व्हिडिओंवर आधारित कोर्सेस, नोट्स, क्विझ आणि AI मार्गदर्शन पुरवते.',
    quickLinks: 'क्विक लिंक्स',
    copyright: '© 2026 EduPulse PRO. सर्व हक्क सुरक्षित.',
  },

  ta: {
    brandSub: 'முழுமையான ஆன்லைன் படிப்புகள்',
    searchPlaceholder: 'பைதான், வீடியோ எடிட்டிங், AI, டிரேடிங் தேடவும்...',
    aiMentorBtn: 'AI வழிகாட்டி',
    signInBtn: 'உள்நுழைக',
    joinFreeBtn: 'இலவசமாக சேருங்கள்',
    myCourses: 'எனது படிப்புகள் & சான்றிதழ்கள்',
    signOut: 'வெளியேறு',
    languageSelect: 'மொழி (Language)',

    heroBadge: '100% இலவச வாழ்நாள் அணுகல் • சரிபார்க்கப்பட்ட யூடியூப் படிப்புகள்',
    heroTitlePrefix: 'புதிய திறன்களைக் கற்றுக்கொள்ளுங்கள் ',
    heroTitleHighlight: 'சிறந்த ஆன்லைன் படிப்புகள் மூலம்',
    heroSubtitle:
      'புரோகிராமிங், AI, வீடியோ எடிட்டிங், பங்குச்சந்தை, சைபர் பாதுகாப்பு மற்றும் நேர்காணல் தயாரிப்புக்கான 180+ யூடியூப் படிப்புகள்.',
    heroSearchBtn: 'தேடுக',
    statCourses: '180+ படிப்புகள்',
    statFree: '100% இலவசம்',
    statCategories: '9 பிரிவுகள்',
    statVerified: 'சரிபார்க்கப்பட்ட யூடியூப் வீடியோக்கள்',

    categoryAll: 'அனைத்து படிப்புகளும்',
    categoryProgramming: 'புரோகிராமிங் மொழிகள்',
    categoryEditing: 'எடிட்டிங் மென்பொருள்',
    categoryAi: 'AI மற்றும் மெஷின் லேர்னிங்',
    categoryData: 'டேட்டா அனலிஸ்ட்',
    categoryWebDev: 'வெப் & ஆப் டெவலப்மென்ட்',
    categoryTrading: 'டிரேடிங் & பங்குச்சந்தை',
    categoryHacking: 'ஹேக்கிங் & பாதுகாப்பு',
    categoryStudy: 'படிப்பு & நேர்காணல்',
    categoryComputer: 'கணினி அடிப்படை',

    filterAllLevels: 'அனைத்து நிலைகளும்',
    filterBeginner: 'தொடக்க நிலை (Beginner)',
    filterIntermediate: 'நடுத்தர நிலை',
    filterAdvanced: 'உயர் நிலை (Advanced)',
    filterBadges: 'அனைத்து பேட்ஜ்கள்',
    filterAudioLang: 'ஆடியோ மொழி',
    coursesFound: 'படிப்புகள் கண்டறியப்பட்டன',
    noCoursesFound: 'நீங்கள் தேர்ந்தெடுத்த வடிப்பானிற்கு படிப்புகள் எதுவும் இல்லை.',
    resetFilters: 'வடிப்பானை மீட்டமைக்க',

    youtubeCourse: 'யூடியூப் படிப்பு',
    enrolledBadge: 'சேர்க்கப்பட்டது',
    completedBadge: 'முடிந்தது',
    startCourseBtn: 'கற்கத் தொடங்குங்கள்',
    continueCourseBtn: 'தொடர்ந்து கற்றுக்கொள்ளுங்கள்',

    tabVideo: 'வீடியோ & பாடங்கள்',
    tabNotes: 'குறிப்புகள் & கோட்',
    tabQuiz: 'வினாடி வினா',
    tabAskAi: 'AI வழிகாட்டிகளிடம் கேட்க',
    enrollActionBtn: 'இலவசமாக சேருங்கள்',
    enrolledStatusBtn: 'சேர்க்கப்பட்டது • கற்றல் செயலில் உள்ளது',
    downloadCertificateBtn: 'சான்றிதழைப் பார்க்கவும்',
    modulesTitle: 'பாடத்திட்டம் & பாடங்கள்',
    quizTitle: 'அறிவு சோதனை வினாடி வினா',
    submitQuizBtn: 'பதில்களைச் சமர்ப்பிக்கவும்',
    quizScoreText: 'உங்கள் வினாடி வினா மதிப்பெண்',

    myDashboard: 'எனது கற்றல் டாஷ்போர்டு',
    enrolledCoursesTab: 'சேர்ந்த படிப்புகள்',
    certificatesTab: 'பெற்ற சான்றிதழ்கள்',
    bookmarkedTab: 'சேமிக்கப்பட்ட படிப்புகள்',

    footerDesc:
      'EduPulse என்பது யூடியூப் படிப்புகள், குறிப்புகள், வினாடி வினாக்கள் மற்றும் AI வழிகாட்டலை வழங்கும் இலவச ஆன்லைன் கற்றல் தளமாகும்.',
    quickLinks: 'விரைவு இணைப்புகள்',
    copyright: '© 2026 EduPulse PRO. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
  },

  kn: {
    brandSub: 'ಪೂರ್ಣ ಉಚಿತ ಆನ್‌ಲೈನ್ ಕೋರ್ಸ್‌ಗಳು',
    searchPlaceholder: 'ಪೈಥಾನ್, ವೀಡಿಯೊ ಎಡಿಟಿಂಗ್, AI, ಟ್ರೇಡಿಂಗ್ ಹುಡುಕಿ...',
    aiMentorBtn: 'AI ಮಾರ್ಗದರ್ಶಿ',
    signInBtn: 'ಸೈನ್ ಇನ್ ಮಾಡಿ',
    joinFreeBtn: 'ಉಚಿತವಾಗಿ ಸೇರಿ',
    myCourses: 'ನನ್ನ ಕೋರ್ಸ್‌ಗಳು & ಸರ್ಟಿಫಿಕೇಟ್‌ಗಳು',
    signOut: 'ಸೈನ್ ಔಟ್',
    languageSelect: 'ಭಾಷೆ (Language)',

    heroBadge: '100% ಉಚಿತ ಜೀವಿತಾವಧಿ ಪ್ರವೇಶ • ಪರಿಶೀಲಿಸಿದ ಯೂಟ್ಯೂಬ್ ಕೋರ್ಸ್‌ಗಳು',
    heroTitlePrefix: 'ಅತ್ಯುತ್ತಮ ಕೌಶಲ್ಯಗಳನ್ನು ಕಲಿಯಿರಿ ',
    heroTitleHighlight: 'ಆನ್‌ಲೈನ್ ಕೋರ್ಸ್‌ಗಳೊಂದಿಗೆ',
    heroSubtitle:
      'ಪ್ರೋಗ್ರಾಮಿಂಗ್, AI, ವೀಡಿಯೊ ಎಡಿಟಿಂಗ್, ಶೇರ್ ಮಾರುಕಟ್ಟೆ, ಸೈಬರ್ ಭದ್ರತೆ ಮತ್ತು ಸಂದರ್ಶನದ ಸಿದ್ಧತೆಗಾಗಿ 180+ ಉಚಿತ ಯೂಟ್ಯೂಬ್ ಕೋರ್ಸ್‌ಗಳು.',
    heroSearchBtn: 'ಹುಡುಕಿ',
    statCourses: '180+ ಕೋರ್ಸ್‌ಗಳು',
    statFree: '100% ಉಚಿತ',
    statCategories: '9 ವರ್ಗಗಳು',
    statVerified: 'ಪರಿಶೀಲಿಸಿದ ಯೂಟ್ಯೂಬ್ ವೀಡಿಯೊಗಳು',

    categoryAll: 'ಎಲ್ಲಾ ಕೋರ್ಸ್‌ಗಳು',
    categoryProgramming: 'ಪ್ರೋಗ್ರಾಮಿಂಗ್ ಭಾಷೆಗಳು',
    categoryEditing: 'ಎಡಿಟಿಂಗ್ ಸಾಫ್ಟ್‌ವೇರ್',
    categoryAi: 'AI & ಮಿಷನ್ ಲರ್ನಿಂಗ್',
    categoryData: 'ಡೇಟಾ ಅನಾಲಿಸ್ಟ್',
    categoryWebDev: 'ವೆಬ್ & ಆಪ್ ಡೆವಲಪ್‌ಮೆಂಟ್',
    categoryTrading: 'ಟ್ರೇಡಿಂಗ್ & ಶೇರ್ ಮಾರುಕಟ್ಟೆ',
    categoryHacking: 'ಹ್ಯಾಕಿಂಗ್ & ಭದ್ರತೆ',
    categoryStudy: 'ಅಧ್ಯಯನ & ಸಂದರ್ಶನ',
    categoryComputer: 'ಕಂಪ್ಯೂಟರ್ ಮೂಲಗಳು',

    filterAllLevels: 'ಎಲ್ಲಾ ಹಂತಗಳು',
    filterBeginner: 'ಆರಂಭಿಕ (Beginner)',
    filterIntermediate: 'ಮಧ್ಯಮ',
    filterAdvanced: 'ಸುಧಾರಿತ (Advanced)',
    filterBadges: 'ಎಲ್ಲಾ ಬ್ಯಾಡ್ಜ್‌ಗಳು',
    filterAudioLang: 'ಆಡಿಯೋ ಭಾಷೆ',
    coursesFound: 'ಕೋರ್ಸ್‌ಗಳು ಸಿಕ್ಕಿವೆ',
    noCoursesFound: 'ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಫಿಲ್ಟರ್‌ಗೆ ಯಾವುದೇ ಕೋರ್ಸ್‌ಗಳು ಸಿಗಲಿಲ್ಲ.',
    resetFilters: 'ಫಿಲ್ಟರ್ ರಿಸೆಟ್ ಮಾಡಿ',

    youtubeCourse: 'ಯೂಟ್ಯೂಬ್ ಕೋರ್ಸ್',
    enrolledBadge: 'ನೋಂದಾಯಿಸಲಾಗಿದೆ',
    completedBadge: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    startCourseBtn: 'ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ',
    continueCourseBtn: 'ಕಲಿಕೆ ಮುಂದುವರಿಸಿ',

    tabVideo: 'ವೀಡಿಯೊ & ಪಾಠಗಳು',
    tabNotes: 'ನೋಟ್ಸ್ & ಕೋಡ್',
    tabQuiz: 'ಕ್ವಿಜ್ ಪರೀಕ್ಷೆ',
    tabAskAi: 'AI ಮಾರ್ಗದರ್ಶಿಯನ್ನು ಕೇಳಿ',
    enrollActionBtn: 'ಉಚಿತವಾಗಿ ಸೇರಿಕೊಳ್ಳಿ',
    enrolledStatusBtn: 'ನೋಂದಾಯಿಸಲಾಗಿದೆ • ಸಕ್ರಿಯ',
    downloadCertificateBtn: 'ಪ್ರಮಾಣಪತ್ರ ವೀಕ್ಷಿಸಿ',
    modulesTitle: 'ಪಠ್ಯಕ್ರಮ & ಪಾಠಗಳು',
    quizTitle: 'ಜ್ಞಾನ ಪರೀಕ್ಷೆ ಕ್ವಿಜ್',
    submitQuizBtn: 'ಉತ್ತರಗಳನ್ನು ಸಲ್ಲಿಸಿ',
    quizScoreText: 'ನಿಮ್ಮ ಕ್ವಿಜ್ ಸ್ಕೋರ್',

    myDashboard: 'ನನ್ನ ಲರ್ನಿಂಗ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    enrolledCoursesTab: 'ನೋಂದಾಯಿತ ಕೋರ್ಸ್‌ಗಳು',
    certificatesTab: 'ಪಡೆದ ಪ್ರಮಾಣಪತ್ರಗಳು',
    bookmarkedTab: 'ಸೇವ್ ಮಾಡಿದ ಕೋರ್ಸ್‌ಗಳು',

    footerDesc:
      'EduPulse ಎಂಬುದು ಉಚಿತ ಆನ್‌ಲೈನ್ ಕಲಿಕಾ ವೇದಿಕೆಯಾಗಿದ್ದು, ಯೂಟ್ಯೂಬ್ ಕೋರ್ಸ್‌ಗಳು, ನೋಟ್ಸ್‌ಗಳು, ಕ್ವಿಜ್‌ಗಳು ಮತ್ತು AI ಮಾರ್ಗದರ್ಶನವನ್ನು ನೀಡುತ್ತದೆ.',
    quickLinks: 'ಕ್ವಿಕ್ ಲಿಂಕ್‌ಗಳು',
    copyright: '© 2026 EduPulse PRO. ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.',
  },

  bn: {
    brandSub: 'সম্পূর্ণ ফ্রি অনলাইন কোর্স',
    searchPlaceholder: 'পাইথন, ভিডিও এডিটিং, AI, ট্রেডিং খুঁজুন...',
    aiMentorBtn: 'AI মেন্টর',
    signInBtn: 'সাইন ইন',
    joinFreeBtn: 'ফ্রিতে যোগ দিন',
    myCourses: 'আমার কোর্স ও সার্টিফিকেট',
    signOut: 'সাইন আউট',
    languageSelect: 'ভাষা (Language)',

    heroBadge: '১০০% ফ্রি লাইফটাইম এক্সেস • ভেরিফাইড ইউটিউব কোর্স',
    heroTitlePrefix: 'চাহিদাসম্পন্ন স্কিল শিখুন ',
    heroTitleHighlight: 'অনলাইন কোর্সের মাধ্যমে',
    heroSubtitle:
      'প্রোগ্রামিং, AI, ভিডিও এডিটিং, স্টক মার্কেট, সাইবার সিকিউরিটি ও ইন্টারভিউ প্রস্তুতির জন্য ১৮০টিরও বেশি ফ্রি ইউটিউব কোর্স।',
    heroSearchBtn: 'খুঁজুন',
    statCourses: '১৮০+ কোর্স',
    statFree: '১০০% ফ্রি এক্সেস',
    statCategories: '৯টি ক্যাটাগরি',
    statVerified: 'ভেরিফাইড ইউটিউব ভিডিও',

    categoryAll: 'সকল কোর্স',
    categoryProgramming: 'প্রোগ্রামিং ল্যাঙ্গুয়েজ',
    categoryEditing: 'এডিটিং সফটওয়্যার',
    categoryAi: 'AI ও মেশিন লার্নিং',
    categoryData: 'ডাটা এনালিস্ট',
    categoryWebDev: 'ওয়েব ও অ্যাপ ডেভেলপমেন্ট',
    categoryTrading: 'ট্রেডিং ও শেয়ার বাজার',
    categoryHacking: 'হ্যাকিং ও সিকিউরিটি',
    categoryStudy: 'পড়াশোনা ও ইন্টারভিউ',
    categoryComputer: 'কম্পিউটার বেসিকস',

    filterAllLevels: 'সকল লেভেল',
    filterBeginner: 'বিগিনার (Beginner)',
    filterIntermediate: 'ইন্টারমিডিয়েট',
    filterAdvanced: 'অ্যাডভান্সড',
    filterBadges: 'সকল ব্যাজ',
    filterAudioLang: 'অডিও ভাষা',
    coursesFound: 'টি কোর্স পাওয়া গেছে',
    noCoursesFound: 'আপনার ফিল্টারের সাথে মিল থাকা কোনো কোর্স পাওয়া যায়নি।',
    resetFilters: 'ফিল্টার রিসেট করুন',

    youtubeCourse: 'ইউটিউব কোর্স',
    enrolledBadge: 'এনরোল্ড',
    completedBadge: 'সম্পন্ন',
    startCourseBtn: 'শেখা শুরু করুন',
    continueCourseBtn: 'শেখা চালিয়ে যান',

    tabVideo: 'ভিডিও ও লেসন',
    tabNotes: 'নোটস ও কোড',
    tabQuiz: 'কুইজ টেস্ট',
    tabAskAi: 'AI মেন্টরকে জিজ্ঞাসা করুন',
    enrollActionBtn: 'ফ্রিতে কোর্সে যুক্ত হোন',
    enrolledStatusBtn: 'এনরোল্ড • শেখা চলছে',
    downloadCertificateBtn: 'সার্টিফিকেট দেখুন',
    modulesTitle: 'কোর্স সিলেবাস ও লেসন',
    quizTitle: 'নলেজ চেক কুইজ',
    submitQuizBtn: 'উত্তর জমা দিন',
    quizScoreText: 'আপনার কুইজ স্কোর',

    myDashboard: 'আমার লার্নিং ড্যাশবোর্ড',
    enrolledCoursesTab: 'এনরোল করা কোর্স',
    certificatesTab: 'প্রাপ্ত সার্টিফিকেট',
    bookmarkedTab: 'সেভ করা কোর্স',

    footerDesc:
      'EduPulse একটি ফ্রি অনলাইন লার্নিং প্ল্যাটফর্ম যেখানে নোটস, কুইজ, সার্টিফিকেট ও AI মেন্টরিং সহ ইউটিউব কোর্স সরবরাহ করা হয়।',
    quickLinks: 'কুইক লিঙ্কস',
    copyright: '© 2026 EduPulse PRO. সর্বস্বত্ব সংরক্ষিত।',
  },
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import Logo from '../components/Logo';
import LockModal from '../components/LockModal';
import AiSkillMatcher from '../components/AiSkillMatcher';
import { Sparkles, ArrowRight, Building2, Rocket, Award, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

const COMPANIES_SHOWCASE = [
  { id: 'c1', name: 'Google', role: 'Software Engineer', package: '45.0 LPA', location: 'Bangalore', type: 'Full-time', skills: ['React', 'System Design', 'Algorithms'] },
  { id: 'c2', name: 'Microsoft', role: 'SDE Intern', package: '38.5 LPA', location: 'Hyderabad', type: 'Full-time', skills: ['C++', 'Azure', 'Data Structures'] },
  { id: 'c3', name: 'Amazon', role: 'Frontend Engineer', package: '32.0 LPA', location: 'Remote', type: 'Full-time', skills: ['React', 'JavaScript', 'CSS'] },
  { id: 'c4', name: 'Uber', role: 'Backend Specialist', package: '42.0 LPA', location: 'Bangalore', type: 'Full-time', skills: ['Node.js', 'PostgreSQL', 'Go'] }
];

export default function Landing() {
  const navigate = useNavigate();
  const [lockModalOpen, setLockModalOpen] = useState(false);
  const [lockTitle, setLockTitle] = useState("Authentication Required");
  const [lockMessage, setLockMessage] = useState("Sign in or create a free account to unlock full placement features.");

  const triggerAuthModal = (title, message) => {
    setLockTitle(title || "Authentication Required");
    setLockMessage(message || "Sign in or create a free account to unlock full placement features.");
    setLockModalOpen(true);
  };

  return (
    <div className="min-h-dvh bg-[#121212] text-zinc-100 font-sans relative overflow-x-hidden">
      
      {/* TOP ANNOUNCEMENT BANNER */}
      <Banner />

      {/* TOP NAVBAR */}
      <header className="h-20 border-b border-white/10 bg-[#121212]/80 backdrop-blur-xl sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
        <Logo size="md" />

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#matcher" className="hover:text-white transition-colors">AI Skill Matcher</a>
          <a href="#companies" className="hover:text-white transition-colors">Visiting Companies</a>
          <a href="#ats" className="hover:text-white transition-colors">ATS Scanner</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(239,68,68,0.3)] flex items-center gap-2 cursor-pointer"
          >
            <span>Sign In / Register</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        {/* Glow background circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs sm:text-sm rounded-full mb-6">
          <Sparkles size={16} />
          <span>Next-Gen Placement & Recruitment Portal</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
          Accelerate Campus Placement with <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-orange-400">
            AI Precision & Real-Time Analytics
          </span>
        </h1>

        <p className="text-zinc-400 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
          PlaceTrack AI bridges top talent, hiring companies, and campus recruitment officers. Match your skills, parse resumes with AI ATS, and apply directly to top opportunities.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold rounded-2xl text-base transition-all shadow-[0_0_30px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Get Started & Unlock Access</span>
            <ArrowRight size={20} />
          </button>

          <a
            href="#matcher"
            className="w-full sm:w-auto px-8 py-4 bg-[#1e1e1e] border border-[#333] hover:border-zinc-500 text-zinc-300 hover:text-white font-bold rounded-2xl text-base transition-colors flex items-center justify-center gap-2"
          >
            <span>Try AI Matcher Demo</span>
          </a>
        </div>
      </section>

      {/* LIVE RECRUITMENT MARQUEE TICKER */}
      <div className="bg-[#18181c] border-y border-[#333] py-4 overflow-hidden">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-xs sm:text-sm font-semibold text-zinc-400 shrink-0">
            <span className="flex items-center gap-2"><Award className="text-orange-400" size={16} /> Rahul K. placed at <strong>Google</strong> (45 LPA)</span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-2"><Award className="text-orange-400" size={16} /> Priya S. placed at <strong>Microsoft</strong> (38.5 LPA)</span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-2"><Award className="text-orange-400" size={16} /> Amit P. placed at <strong>Amazon</strong> (32 LPA)</span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-2"><Building2 className="text-red-400" size={16} /> 45+ Visiting Companies Active</span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-2"><ShieldCheck className="text-green-400" size={16} /> 82% Batch Placed Rate</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE AI SKILL MATCHER SECTION */}
      <section id="matcher" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <AiSkillMatcher onRequireAuth={triggerAuthModal} />
      </section>

      {/* VISITING COMPANIES SHOWCASE */}
      <section id="companies" className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Visiting Hiring Partners</h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">Live active campus placement drives and stipend opportunities.</p>
          </div>

          <button
            onClick={() => triggerAuthModal("Sign In to View All Companies", "Register or sign in to browse full eligibility details and apply.")}
            className="px-4 py-2.5 bg-[#1e1e1e] border border-[#333] hover:border-red-500/50 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>View All Opportunities</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COMPANIES_SHOWCASE.map((comp) => (
            <div key={comp.id} className="bg-[#18181c] border border-[#333] hover:border-red-500/40 rounded-2xl p-5 flex flex-col h-full transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 font-black text-lg">
                  {comp.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-md bg-red-500/10 text-red-300 border border-red-500/20 uppercase tracking-wide">
                  {comp.package}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">{comp.name}</h3>
              <p className="text-zinc-400 font-medium text-xs mb-4">{comp.role}</p>

              <div className="mt-auto pt-4 border-t border-[#2d2d2d] space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {comp.skills.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#121212] border border-[#333] text-zinc-400 rounded text-[10px] font-medium">
                      {s}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => triggerAuthModal(`Apply to ${comp.name}`, `Sign in as a Student to submit your application for the ${comp.role} role.`)}
                  className="w-full py-2.5 bg-gradient-to-r from-red-600/10 to-rose-600/10 hover:from-red-600/20 hover:to-rose-600/20 text-red-400 font-bold text-xs rounded-xl border border-red-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ATS CHECKER PREVIEW SECTION */}
      <section id="ats" className="py-16 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-red-950/40 via-[#18181c] to-[#121212] border border-red-500/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs rounded-full mb-4">
                <Rocket size={14} />
                <span>AI Resume Parsing Engine</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                Test Your Resume Against Top Applicant Tracking Systems
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Simulate corporate ATS parsers. Discover missing keyword gaps, structural scores, and formatting issues before sending applications to recruiters.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300 font-medium">
                  <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                  <span>Semantic Keyword Density & Skill Gap Detection</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300 font-medium">
                  <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                  <span>Real-time ATS Compatibility Match Rating</span>
                </div>
              </div>

              <button
                onClick={() => triggerAuthModal("Unlock AI ATS Scanner", "Sign in or create a free account to upload your PDF resume and get instant AI feedback.")}
                className="px-8 py-4 bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold rounded-2xl text-sm transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Upload & Scan Resume</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="bg-[#121212] border border-[#333] rounded-2xl p-6 shadow-2xl text-center space-y-4">
              <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto">
                <Rocket size={32} />
              </div>
              <h4 className="text-lg font-bold text-white">Drag & Drop Resume Demo</h4>
              <p className="text-zinc-500 text-xs">PDF / DOCX files supported up to 10MB</p>
              <div className="p-8 border-2 border-dashed border-[#444] rounded-xl bg-[#18181c] text-zinc-400 text-xs">
                Click Upload to test parser
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM FEATURES GRID */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">Complete Placement Ecosystem</h2>
          <p className="text-zinc-400 text-sm font-medium">Designed for Students, Corporate Recruiters, and Placement Administrators.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#18181c] border border-[#333] rounded-2xl p-6">
            <div className="w-12 h-12 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center justify-center mb-4">
              <Building2 size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Visiting Companies</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">Explore active recruitment drives, CTC packages, location details, and skill requirements in real time.</p>
          </div>

          <div className="bg-[#18181c] border border-[#333] rounded-2xl p-6">
            <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center mb-4">
              <Rocket size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI ATS Resume Checker</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">Simulate Applicant Tracking System parsing algorithms to optimize your resume impact before applying.</p>
          </div>

          <div className="bg-[#18181c] border border-[#333] rounded-2xl p-6">
            <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl flex items-center justify-center mb-4">
              <Award size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Student & Placement Analytics</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">Track batch selection percentages, top packages, branch distribution, and upcoming interview schedules.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#121212] py-12 px-4 sm:px-8 text-center text-zinc-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo size="sm" />
          <p>© 2026 PlaceTrack AI. All rights reserved. Next-Gen Campus Recruitment Platform.</p>
          <button
            onClick={() => navigate('/login')}
            className="text-red-400 font-bold hover:underline cursor-pointer"
          >
            Sign In to Portal →
          </button>
        </div>
      </footer>

      {/* LOCK MODAL FOR GUEST ACTIONS */}
      <LockModal
        isOpen={lockModalOpen}
        onClose={() => setLockModalOpen(false)}
        title={lockTitle}
        message={lockMessage}
      />
    </div>
  );
}

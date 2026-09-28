import { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AiSkillMatcher({ onRequireAuth }) {
  const [skillsInput, setSkillsInput] = useState('React, Node.js, Python, Data Structures');
  const [branch, setBranch] = useState('CSE');
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState({
    score: 88,
    matchedCompanies: [
      { name: 'Google', role: 'Software Engineer', match: '92%', package: '45 LPA' },
      { name: 'Microsoft', role: 'SDE Intern', match: '88%', package: '38.5 LPA' },
      { name: 'Amazon', role: 'Frontend Engineer', match: '84%', package: '32 LPA' }
    ]
  });

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!skillsInput.trim()) return;
    setCalculating(true);

    setTimeout(() => {
      const skillsArray = skillsInput.split(',').map(s => s.trim().toLowerCase());
      let baseScore = 70;
      if (skillsArray.includes('react') || skillsArray.includes('node.js')) baseScore += 10;
      if (skillsArray.includes('c++') || skillsArray.includes('python') || skillsArray.includes('data structures')) baseScore += 8;

      const finalScore = Math.min(Math.max(baseScore, 65), 98);

      setResult({
        score: finalScore,
        matchedCompanies: [
          { name: 'Google', role: 'Software Engineer', match: `${finalScore}%`, package: '45 LPA' },
          { name: 'Microsoft', role: 'SDE Intern', match: `${finalScore - 3}%`, package: '38.5 LPA' },
          { name: 'Amazon', role: 'Frontend Engineer', match: `${finalScore - 6}%`, package: '32 LPA' }
        ]
      });
      setCalculating(false);
    }, 600);
  };

  return (
    <div className="bg-[#18181c] border border-[#333] hover:border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs rounded-full mb-2">
            <Sparkles size={14} />
            <span>Interactive AI Feature Preview</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">AI Placement Match Calculator</h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">Enter your technical skills to calculate instant recruitment compatibility.</p>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Your Skills (Comma Separated)</label>
          <input
            type="text"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="e.g. React, Java, Python, SQL"
            className="w-full px-4 py-3 bg-[#121212] border border-[#444] rounded-xl text-white text-sm focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Branch</label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full px-4 py-3 bg-[#121212] border border-[#444] rounded-xl text-white text-sm focus:border-red-500 outline-none transition-all cursor-pointer"
          >
            <option>CSE</option>
            <option>ECE</option>
            <option>IT</option>
            <option>ME</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <button
            type="submit"
            disabled={calculating}
            className="w-full py-3 bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50 text-sm flex items-center justify-center gap-2"
          >
            {calculating ? 'Analyzing Semantics...' : 'Calculate AI Match Score'}
          </button>
        </div>
      </form>

      {/* RESULT SECTION */}
      <div className="bg-[#121212] border border-[#2d2d2d] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="text-center md:border-r md:border-[#333] md:pr-6">
          <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 mb-1">
            {result.score}%
          </div>
          <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">Simulated Match Score</p>
          <p className="text-[11px] text-zinc-500 mt-1">High compatibility with Top Startups & MNCs</p>
        </div>

        <div className="md:col-span-2 space-y-2.5">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Recommended Opportunities</p>
          {result.matchedCompanies.map((c, i) => (
            <div key={i} className="flex items-center justify-between bg-[#1e1e1e] p-2.5 rounded-xl border border-[#333] text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                <div>
                  <span className="font-bold text-white">{c.name}</span>
                  <span className="text-zinc-400 text-[11px] ml-2">({c.role})</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-orange-400 font-bold">{c.package}</span>
                <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 font-extrabold rounded text-[10px]">
                  {c.match} Match
                </span>
              </div>
            </div>
          ))}

          <button
            onClick={() => onRequireAuth("Sign In to Save AI Score", "Create a free account or sign in to save your match profile and apply directly.")}
            className="w-full mt-3 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sign In to Save Profile & Apply</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

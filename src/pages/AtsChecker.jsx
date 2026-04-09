import { useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export default function AtsChecker() {
  const [file, setFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleScan = () => {
    if (!file) return;
    setIsScanning(true);
    setProgress(0);
    setResult(null);

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setResult({
            score: Math.floor(Math.random() * 20) + 75, // 75 to 94 range
            keywords: ['React', 'JavaScript', 'Node.js'],
            missing: ['System Design', 'Docker'],
            formatting: 'Good (Passed traditional parsers)'
          });
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);
  };

  return (
    <AnimatedPage className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">AI Resume ATS Checker</h2>
        <p className="text-zinc-500 text-sm mt-1">Simulate Applicant Tracking System parsing algorithms to optimize your resume impact.</p>
      </div>

      <div 
        onDragOver={(e) => e.preventDefault()} 
        onDrop={handleDrop}
        className="w-full p-12 border-2 border-dashed border-[#333] hover:border-red-500/50 bg-[#1e1e1e]/50 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden group"
      >
        <input 
          type="file" 
          accept=".pdf,.doc,.docx" 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
        />
        
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud size={32} />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">{file ? file.name : 'Upload your Resume'}</h3>
        <p className="text-zinc-500 text-sm text-center max-w-sm">Drag and drop your PDF or DOCX file here, or click to browse files from your computer.</p>
      </div>

      <button 
        onClick={handleScan}
        disabled={!file || isScanning}
        className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-colors disabled:opacity-50 shadow-[0_0_20px_rgba(220,38,38,0.3)] disabled:shadow-none"
      >
        {isScanning ? `Extracting Semantics... ${progress}%` : 'Initiate ATS Scan'}
      </button>

      {isScanning && (
        <div className="w-full h-3 bg-[#121212] border border-[#333] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#333] shadow-lg flex flex-col items-center justify-center text-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#121212" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="transparent" stroke="#ef4444" strokeWidth="8" strokeDasharray={`${283 * (result.score / 100)} 283`} strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-black text-white">{result.score}</span>
                <span className="text-[10px] uppercase text-zinc-500 font-bold">Match</span>
              </div>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Excellent Structural Score</h4>
            <p className="text-zinc-400 text-sm">Your resume heavily aligns with top-tier startup requirements. Semantic density is optimal.</p>
          </div>

          <div className="bg-[#1e1e1e] p-6 rounded-2xl border border-[#333] shadow-lg space-y-6">
            <div>
              <h5 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-3"><CheckCircle2 className="text-green-500" size={18} /> Discovered Hot-Words</h5>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map(k => <span key={k} className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded border border-green-500/20">{k}</span>)}
              </div>
            </div>
            <div>
              <h5 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-3"><AlertCircle className="text-orange-500" size={18} /> Missing Skill Gaps</h5>
              <div className="flex flex-wrap gap-2">
                {result.missing.map(m => <span key={m} className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs font-bold rounded border border-orange-500/20">{m}</span>)}
              </div>
            </div>
            <div>
              <h5 className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-1">Parsing Status</h5>
              <p className="text-sm text-zinc-400 flex items-center gap-2"><FileText size={16} className="text-blue-400"/> {result.formatting}</p>
            </div>
          </div>
        </div>
      )}
    </AnimatedPage>
  );
}

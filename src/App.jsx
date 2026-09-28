import { Routes, Route, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Companies from './pages/Companies';
import Internships from './pages/Internships';
import Search from './pages/Search';
import AtsChecker from './pages/AtsChecker';
import Interviews from './pages/Interviews';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Lock, ArrowRight } from 'lucide-react';

const LockedOverlay = ({ pageTitle = "Protected Feature" }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#121212]/85 backdrop-blur-md z-20 flex flex-col items-center justify-center text-center p-6 rounded-3xl border border-red-500/20 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4 shadow-inner">
          <Lock size={32} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
          Sign In Required to Access {pageTitle}
        </h2>
        <p className="text-zinc-400 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
          Create a free account or sign in to view live student directories, ATS resume scores, company drives, and recruitment analytics.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-extrabold rounded-2xl text-sm transition-all shadow-[0_0_25px_rgba(239,68,68,0.4)] flex items-center gap-2 cursor-pointer"
        >
          <span>Sign In / Create Free Account</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

const PrivateRoute = ({ children, pageTitle = "Feature" }) => {
  const { token, loading } = useContext(AuthContext);
  if (loading) return null;
  return token ? children : <Layout><LockedOverlay pageTitle={pageTitle} /></Layout>;
};

function AppRoutes() {
  const { token, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/" element={token ? <Layout><Dashboard /></Layout> : <Landing />} />
      <Route path="/students" element={<PrivateRoute pageTitle="Student Directory"><Students /></PrivateRoute>} />
      <Route path="/companies" element={<PrivateRoute pageTitle="Visiting Companies"><Companies /></PrivateRoute>} />
      <Route path="/internships" element={<PrivateRoute pageTitle="Active Internships"><Internships /></PrivateRoute>} />
      <Route path="/search" element={<PrivateRoute pageTitle="Search Aggregator"><Search /></PrivateRoute>} />
      <Route path="/ats-checker" element={<PrivateRoute pageTitle="AI ATS Checker"><AtsChecker /></PrivateRoute>} />
      <Route path="/interviews" element={<PrivateRoute pageTitle="Interview Rounds"><Interviews /></PrivateRoute>} />
      <Route path="/reports" element={<PrivateRoute pageTitle="Analytics & Reports"><Reports /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute pageTitle="Account Settings"><Settings /></PrivateRoute>} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="w-full h-full min-h-screen bg-[#121212]">
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

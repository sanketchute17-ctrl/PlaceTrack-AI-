import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Layout from './components/Layout';
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

const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center min-h-[60vh] bg-[#1e1e1e] rounded-xl border border-[#333] shadow-sm p-8">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-red-500/10 rounded-full mx-auto flex items-center justify-center border border-red-500/20">
        <span className="text-red-400 font-bold text-xl">{title[0]}</span>
      </div>
      <h2 className="text-xl font-semibold text-zinc-100">{title} Loaded</h2>
      <p className="text-sm text-zinc-500">Component successfully routed.</p>
    </div>
  </div>
);

const NotFound = () => (
  <div className="flex items-center justify-center min-h-[60vh] bg-[#1e1e1e] rounded-xl border border-[#333] shadow-sm p-8">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-red-50 rounded-full mx-auto flex items-center justify-center border border-red-200">
        <span className="text-red-500 font-bold text-xl">404</span>
      </div>
      <h2 className="text-2xl font-bold text-zinc-100">Page Not Found</h2>
      <p className="text-zinc-400">The page you are looking for does not exist.</p>
    </div>
  </div>
);

const PrivateRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);
  if (loading) return null; // Wait for initial mount
  return token ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
      <Route path="/students" element={<PrivateRoute><Layout><Students /></Layout></PrivateRoute>} />
      <Route path="/companies" element={<PrivateRoute><Layout><Companies /></Layout></PrivateRoute>} />
      <Route path="/internships" element={<PrivateRoute><Layout><Internships /></Layout></PrivateRoute>} />
      <Route path="/search" element={<PrivateRoute><Layout><Search /></Layout></PrivateRoute>} />
      <Route path="/ats-checker" element={<PrivateRoute><Layout><AtsChecker /></Layout></PrivateRoute>} />
      <Route path="/interviews" element={<PrivateRoute><Layout><Interviews /></Layout></PrivateRoute>} />
      <Route path="/reports" element={<PrivateRoute><Layout><Reports /></Layout></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Layout><Settings /></Layout></PrivateRoute>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
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

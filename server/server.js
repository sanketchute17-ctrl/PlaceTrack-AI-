import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 Supabase Connect
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder_key';
const isSupabaseConfigured = supabaseUrl !== 'https://placeholder.supabase.co' && supabaseKey !== 'placeholder_key';

if (!isSupabaseConfigured) {
  console.warn("⚠️ SUPABASE_URL or SUPABASE_ANON_KEY is missing. Using in-memory fallback store for auth and data.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ---------------- IN-MEMORY FALLBACK STORE ----------------
const fallbackUsers = [
  { id: 'demo_1', name: 'Demo Student', email: 'student@test.com', passwordHash: bcrypt.hashSync('123456', 10), role: 'student' },
  { id: 'demo_2', name: 'Demo Company', email: 'company@test.com', passwordHash: bcrypt.hashSync('123456', 10), role: 'company' },
  { id: 'demo_3', name: 'Demo Admin', email: 'admin@test.com', passwordHash: bcrypt.hashSync('123456', 10), role: 'admin' },
];

const fallbackStudents = [
  { id: 's1', name: 'Rahul Kumar', email: 'rahul@college.edu', branch: 'CSE', skills: ['React', 'Node.js', 'Java'], placementStatus: 'Selected', resumeScore: 88 },
  { id: 's2', name: 'Priya Sharma', email: 'priya@college.edu', branch: 'ECE', skills: ['Python', 'SQL', 'C++'], placementStatus: 'Shortlisted', resumeScore: 82 },
  { id: 's3', name: 'Amit Patel', email: 'amit@college.edu', branch: 'IT', skills: ['JavaScript', 'HTML/CSS'], placementStatus: 'Unplaced', resumeScore: 75 }
];

const fallbackCompanies = [
  { id: 'c1', name: 'Google', role: 'Software Engineer', package: '45.0', location: 'Bangalore', type: 'Full-time', eligibility: ['React', 'Data Structures', 'System Design'] },
  { id: 'c2', name: 'Microsoft', role: 'SDE Intern', package: '38.5', location: 'Hyderabad', type: 'Full-time', eligibility: ['C++', 'Algorithms', 'Azure'] },
  { id: 'c3', name: 'Amazon', role: 'Frontend Engineer', package: '32.0', location: 'Remote', type: 'Full-time', eligibility: ['React', 'JavaScript', 'CSS'] }
];

const fallbackPlacements = [
  { id: 'p1', studentId: 's1', companyId: 'c1', status: 'Selected', package: '45.0 LPA' },
  { id: 'p2', studentId: 's2', companyId: 'c2', status: 'Shortlisted', package: '38.5 LPA' }
];

// Helper to sign JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret_fallback', { expiresIn: '30d' });
};

// ---------------- ROUTES ----------------

// Health check
app.get(["/", "/api"], (req, res) => {
  res.json({ status: "ok", message: "🚀 PlaceTrack AI API is active" });
});

// ➤ Register New User
app.post(["/api/auth/register", "/auth/register"], async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanRole = role.trim().toLowerCase();

    // 1. Try Supabase registration if configured
    if (isSupabaseConfigured) {
      try {
        const { data: existingUsers } = await supabase.from('users').select('*').eq('email', cleanEmail);
        if (existingUsers && existingUsers.length > 0) {
          return res.status(400).json({ message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const { data, error } = await supabase
          .from('users')
          .insert([{ name, email: cleanEmail, password: hashedPassword, role: cleanRole }])
          .select();

        if (!error && data && data.length > 0) {
          const user = data[0];
          const token = generateToken(user.id);
          return res.json({ _id: user.id, name: user.name, email: user.email, role: user.role, token });
        }
      } catch (dbErr) {
        console.warn("Supabase register error, falling back to memory store:", dbErr.message);
      }
    }

    // 2. Fallback to Memory Store
    const existing = fallbackUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email: cleanEmail,
      passwordHash: hashedPassword,
      role: cleanRole
    };

    fallbackUsers.push(newUser);
    const token = generateToken(newUser.id);

    return res.json({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      token
    });

  } catch (err) {
    console.error("Auth Error:", err);
    res.status(500).json({ message: "Server Error during registration: " + err.message });
  }
});

// ➤ Login User
app.post(["/api/auth/login", "/auth/login"], async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Supabase login if configured
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('users').select('*').eq('email', cleanEmail);
        if (!error && data && data.length > 0) {
          const user = data[0];
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            const token = generateToken(user.id);
            return res.json({ _id: user.id, name: user.name, email: user.email, role: user.role, token });
          }
        }
      } catch (dbErr) {
        console.warn("Supabase login error, falling back to memory store:", dbErr.message);
      }
    }

    // 2. Fallback to Memory Store
    const user = fallbackUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id);
    return res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });

  } catch (err) {
    console.error("Auth Error:", err);
    res.status(500).json({ message: "Server Error during login: " + err.message });
  }
});

// ➤ Add Student
app.post(["/api/students", "/students"], async (req, res) => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('students').insert([req.body]).select();
      if (!error && data) return res.json(data[0] || req.body);
    }
    const newStudent = { id: 'st_' + Date.now(), ...req.body };
    fallbackStudents.push(newStudent);
    res.json(newStudent);
  } catch (err) {
    res.status(500).json({ error: "Database error", message: err.message });
  }
});

// ➤ Get Students
app.get(["/api/students", "/students"], async (req, res) => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('students').select('*');
      if (!error && data) return res.json(data);
    }
    res.json(fallbackStudents);
  } catch (err) {
    res.json(fallbackStudents);
  }
});

// ➤ Add Company
app.post(["/api/companies", "/companies"], async (req, res) => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('companies').insert([req.body]).select();
      if (!error && data) return res.json(data[0] || req.body);
    }
    const newCompany = { id: 'cmp_' + Date.now(), ...req.body };
    fallbackCompanies.push(newCompany);
    res.json(newCompany);
  } catch (err) {
    res.status(500).json({ error: "Database error", message: err.message });
  }
});

// ➤ Get Companies
app.get(["/api/companies", "/companies"], async (req, res) => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('companies').select('*');
      if (!error && data) return res.json(data);
    }
    res.json(fallbackCompanies);
  } catch (err) {
    res.json(fallbackCompanies);
  }
});

// ➤ Add Placement
app.post(["/api/placements", "/placements"], async (req, res) => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('placements').insert([req.body]).select();
      if (!error && data) return res.json(data[0] || req.body);
    }
    const newPlacement = { id: 'plc_' + Date.now(), ...req.body };
    fallbackPlacements.push(newPlacement);
    res.json(newPlacement);
  } catch (err) {
    res.status(500).json({ error: "Database error", message: err.message });
  }
});

// ➤ Get Placements
app.get(["/api/placements", "/placements"], async (req, res) => {
  try {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('placements').select('*');
      if (!error && data) return res.json(data);
    }
    res.json(fallbackPlacements);
  } catch (err) {
    res.json(fallbackPlacements);
  }
});

// ➤ Add Internship (Local JSON Fallback)
const internshipsFile = path.join(__dirname, 'internships.json');

app.post(["/api/internships", "/internships"], async (req, res) => {
  try {
    let internships = [];
    if (fs.existsSync(internshipsFile)) {
      try {
        internships = JSON.parse(fs.readFileSync(internshipsFile, 'utf8'));
      } catch (e) {
        internships = [];
      }
    }
    const newInternship = { 
      id: "int_" + Date.now(), 
      ...req.body,
      created_at: new Date().toISOString()
    };
    internships.push(newInternship);
    try {
      fs.writeFileSync(internshipsFile, JSON.stringify(internships, null, 2));
    } catch (writeErr) {
      console.warn("Local JSON write warning:", writeErr.message);
    }
    res.json(newInternship);
  } catch (err) {
    res.status(500).json({ error: "IO error", message: err.message });
  }
});

// ➤ Get Internships (Local JSON Fallback)
app.get(["/api/internships", "/internships"], async (req, res) => {
  try {
    let internships = [];
    if (fs.existsSync(internshipsFile)) {
      try {
        internships = JSON.parse(fs.readFileSync(internshipsFile, 'utf8'));
      } catch (e) {
        internships = [];
      }
    }
    res.json(internships);
  } catch (err) {
    res.json([]);
  }
});

// ➤ Interview Hooks (Local JSON Fallback)
const interviewsFile = path.join(__dirname, 'interviews.json');
app.post(["/api/interviews", "/interviews"], async (req, res) => {
  try {
    let arr = [];
    if (fs.existsSync(interviewsFile)) {
      try {
        arr = JSON.parse(fs.readFileSync(interviewsFile, 'utf8'));
      } catch (e) {
        arr = [];
      }
    }
    const item = { id: "iv_" + Date.now(), ...req.body, created_at: new Date().toISOString() };
    arr.push(item);
    try {
      fs.writeFileSync(interviewsFile, JSON.stringify(arr, null, 2));
    } catch (writeErr) {
      console.warn("Local JSON write warning:", writeErr.message);
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "IO error", message: err.message });
  }
});

app.get(["/api/interviews", "/interviews"], async (req, res) => {
  try {
    let arr = [];
    if (fs.existsSync(interviewsFile)) {
      try {
        arr = JSON.parse(fs.readFileSync(interviewsFile, 'utf8'));
      } catch (e) {
        arr = [];
      }
    }
    res.json(arr);
  } catch (err) {
    res.json([]);
  }
});

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔌 Database Mode: ${isSupabaseConfigured ? 'Supabase Active' : 'In-Memory Fallback Active'}`);
  });
}

export default app;
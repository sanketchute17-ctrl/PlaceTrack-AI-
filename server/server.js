// Load env
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔗 Supabase Connect
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder_key';

if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.warn("⚠️ Warning: SUPABASE_URL or SUPABASE_ANON_KEY is missing in .env. Using fallback variables, database queries will fail until provided.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ---------------- ROUTES ----------------

// Health check
app.get("/", (req, res) => {
  res.send("🚀 API running with Supabase PostgreSQL...");
});

// Health check for Vercel API
app.get("/api", (req, res) => {
  res.json({ message: "🚀 PlaceTrack API serverless endpoint active" });
});

// ➤ Register New User
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    const { data: existingUsers } = await supabase.from('users').select('*').eq('email', email);
    if (existingUsers && existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword, role }])
      .select();

    if (error) throw error;

    const user = data[0];
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret_fallback', { expiresIn: '30d' });

    res.json({ _id: user.id, name: user.name, email: user.email, role: user.role, token });
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(500).json({ message: err.message || "Database err! Make sure your Supabase `users` table is created." });
  }
});

// ➤ Login User
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Use select('*') WITHOUT .single() to avoid errors when user doesn't exist
    const { data, error } = await supabase.from('users').select('*').eq('email', email);
    
    if (error) {
      console.error("Supabase Query Error:", error);
      return res.status(500).json({ message: "Database error during login: " + error.message });
    }

    if (!data || data.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = data[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret_fallback', { expiresIn: '30d' });

    res.json({ _id: user.id, name: user.name, email: user.email, role: user.role, token });
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(500).json({ message: "Server Error during login: " + err.message });
  }
});

// ➤ Add Student
app.post("/api/students", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('students')
      .insert([req.body])
      .select();

    if (error) throw error;
    res.json(data[0] || req.body);
  } catch (err) {
    console.error("Supabase Error:", err.message);
    res.status(500).json({ error: "Database error", message: err.message });
  }
});

// ➤ Get Students
app.get("/api/students", async (req, res) => {
  try {
    const { data, error } = await supabase.from('students').select('*');
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error("Supabase Error:", err.message);
    res.status(500).json({ error: "Database error", message: err.message });
  }
});

// ➤ Add Company
app.post("/api/companies", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('companies')
      .insert([req.body])
      .select();

    if (error) throw error;
    res.json(data[0] || req.body);
  } catch (err) {
    console.error("Supabase Error:", err.message);
    res.status(500).json({ error: "Database error", message: err.message });
  }
});

// ➤ Get Companies
app.get("/api/companies", async (req, res) => {
  try {
    const { data, error } = await supabase.from('companies').select('*');
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error("Supabase Error:", err.message);
    res.status(500).json({ error: "Database error", message: err.message });
  }
});

// ➤ Add Placement
app.post("/api/placements", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('placements')
      .insert([req.body])
      .select();

    if (error) throw error;
    res.json(data[0] || req.body);
  } catch (err) {
    console.error("Supabase Error:", err.message);
    res.status(500).json({ error: "Database error", message: err.message });
  }
});

// ➤ Add Internship (Local JSON Fallback)
const fs = require('fs');
const path = require('path');
const internshipsFile = path.join(__dirname, 'internships.json');

app.post("/api/internships", async (req, res) => {
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
      console.warn("Local JSON write warning (read-only filesystem):", writeErr.message);
    }
    res.json(newInternship);
  } catch (err) {
    console.error("Local Save Error:", err.message);
    res.status(500).json({ error: "IO error", message: err.message });
  }
});

// ➤ Get Internships (Local JSON Fallback)
app.get("/api/internships", async (req, res) => {
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
    console.error("Local Read Error:", err.message);
    res.status(500).json({ error: "IO error", message: err.message });
  }
});

// ➤ Interview Hooks (Local JSON Fallback)
const interviewsFile = path.join(__dirname, 'interviews.json');
app.post("/api/interviews", async (req, res) => {
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
      console.warn("Local JSON write warning (read-only filesystem):", writeErr.message);
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: "IO error", message: err.message });
  }
});
app.get("/api/interviews", async (req, res) => {
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
    res.status(500).json({ error: "IO error", message: err.message });
  }
});

// ➤ Get Placements
app.get("/api/placements", async (req, res) => {
  try {
    const { data, error } = await supabase.from('placements').select('*');
    if (error) throw error;
    res.json(data || []);
  } catch (err) {
    console.error("Supabase Error:", err.message);
    res.status(500).json({ error: "Database error", message: err.message });
  }
});

// ---------------- SERVER ----------------

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔌 Database Mode: Supabase PostgreSQL Active`);
  });
}

module.exports = app;
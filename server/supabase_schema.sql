-- Run this directly in your Supabase SQL Editor to initialize your database structure for PlaceTrack AI

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  branch TEXT,
  skills TEXT[],
  "placementStatus" TEXT DEFAULT 'Unplaced',
  "resumeScore" INTEGER DEFAULT 0,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  package NUMERIC,
  eligibility TEXT[],
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE placements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "studentId" TEXT,
  "companyId" TEXT,
  status TEXT DEFAULT 'Applied',
  package NUMERIC,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

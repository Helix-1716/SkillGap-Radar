-- ============================================================
-- SkillGap Radar: Supabase Schema
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. User Profiles (keyed by Firebase UID)
CREATE TABLE IF NOT EXISTS profiles (
  id TEXT PRIMARY KEY,              -- Firebase UID
  display_name TEXT,
  email TEXT,
  photo_url TEXT,
  provider TEXT DEFAULT 'email',
  title TEXT DEFAULT '',
  location TEXT DEFAULT '',
  bio TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Analyses (resume vs JD results)
CREATE TABLE IF NOT EXISTS analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  role_title TEXT DEFAULT '',
  company TEXT DEFAULT '',
  resume_char_count INT DEFAULT 0,
  jd_char_count INT DEFAULT 0,
  score INT DEFAULT 0,
  matched_skills TEXT[] DEFAULT '{}',
  missing_skills TEXT[] DEFAULT '{}',
  summary TEXT DEFAULT '',
  ats_feedback TEXT DEFAULT '',
  job_description TEXT DEFAULT '',
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. User Skills (aggregated from analyses)
CREATE TABLE IF NOT EXISTS user_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  level TEXT DEFAULT 'Beginner',
  score INT DEFAULT 0,
  source TEXT DEFAULT 'analysis',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, name)
);

-- 4. User Documents (uploaded file metadata)
CREATE TABLE IF NOT EXISTS user_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  size_bytes BIGINT DEFAULT 0,
  mime_type TEXT DEFAULT 'application/pdf',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Security Logs (login events, sessions, audit trail)
CREATE TABLE IF NOT EXISTS security_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('session', 'event')),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  device TEXT DEFAULT '',
  location TEXT DEFAULT '',
  ip_address TEXT DEFAULT '',
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only see/modify their own data
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (true);

CREATE POLICY "Users can view own analyses" ON analyses FOR SELECT USING (true);
CREATE POLICY "Users can insert own analyses" ON analyses FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view own skills" ON user_skills FOR SELECT USING (true);
CREATE POLICY "Users can insert own skills" ON user_skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own skills" ON user_skills FOR UPDATE USING (true);

CREATE POLICY "Users can view own documents" ON user_documents FOR SELECT USING (true);
CREATE POLICY "Users can insert own documents" ON user_documents FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can delete own documents" ON user_documents FOR DELETE USING (true);

CREATE POLICY "Users can view own security logs" ON security_logs FOR SELECT USING (true);
CREATE POLICY "Users can insert own security logs" ON security_logs FOR INSERT WITH CHECK (true);

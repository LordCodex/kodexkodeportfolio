-- Supabase Schema for Portfolio Rebuild

-- 1. Projects Table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    gradient VARCHAR(255),
    tags TEXT[], -- array of strings
    stats JSONB,
    features JSONB,
    url VARCHAR(255),
    external_url VARCHAR(255),
    cta_text VARCHAR(100) DEFAULT 'View Live',
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enabled projects are visible to everyone" ON projects FOR SELECT USING (is_enabled = true);
CREATE POLICY "Admins can select all projects" ON projects FOR SELECT TO authenticated USING (true);


-- 2. Skills Table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(100) NOT NULL,
    is_enabled BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security for skills
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enabled skills are visible to everyone" ON skills FOR SELECT USING (is_enabled = true);
CREATE POLICY "Admins can select all skills" ON skills FOR SELECT TO authenticated USING (true);



-- 3. Settings Table (Emails, Whatsapp, CV Link)
CREATE TABLE settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security for settings
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings are visible to everyone" ON settings FOR SELECT USING (true);
CREATE POLICY "Admins can insert settings" ON settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update settings" ON settings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete settings" ON settings FOR DELETE TO authenticated USING (true);

-- Adding Admin Policies for previous tables (which were already RLS enabled)
CREATE POLICY "Admins can insert projects" ON projects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update projects" ON projects FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete projects" ON projects FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admins can insert skills" ON skills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admins can update skills" ON skills FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Admins can delete skills" ON skills FOR DELETE TO authenticated USING (true);

-- Insert Default Settings
INSERT INTO settings (key, value, description) VALUES 
('email', 'michaelolaitan6@gmail.com', 'Primary Contact Email'),
('whatsapp_number', '2348149390329', 'Primary WhatsApp Number'),
('cv_link', 'https://drive.google.com/uc?export=download&id=170CE2QJrZI3fvcgd6FnKoZ7jn65f81wa', 'Resume Google Drive Link'),
('twitter_url', 'https://twitter.com/lanre_olat', 'Twitter Profile Link'),
('linkedin_url', 'https://www.linkedin.com/in/lanreolat', 'LinkedIn Profile Link'),
('instagram_url', 'https://www.instagram.com/lanre_olat/', 'Instagram Profile Link'),
('facebook_url', 'https://web.facebook.com/michaeloreoluwa5', 'Facebook Profile Link'),
('github_url', 'https://github.com/LordCodex', 'GitHub Profile Link');

-- Insert Initial Skills
INSERT INTO skills (name, icon, sort_order) VALUES
('Vue.js', 'mdi:vuejs', 1),
('Nuxt 3', 'mdi:nuxt', 2),
('Tailwind CSS', 'mdi:tailwind', 3),
('JavaScript', 'mdi:language-javascript', 4),
('TypeScript', 'mdi:language-typescript', 5),
('PHP', 'simple-icons:php', 6),
('Laravel', 'simple-icons:laravel', 7),
('InertiaJS', 'simple-icons:inertia', 8),
('Flutter', 'simple-icons:flutter', 9),
('Dart', 'simple-icons:dart', 10),
('Golang', 'simple-icons:go', 11),
('GSAP', 'mdi:animation-play', 12),
('Git', 'mdi:git', 13);

-- Insert Initial Projects
INSERT INTO projects (title, description, url, gradient, tags, sort_order) VALUES
('Skolvex', 'A comprehensive school management and portal software designed for modern educational institutions, featuring tiered pricing models and advanced analytics.', 'https://skolvex.vercel.app/', 'from-blue-900 via-primary/50 to-purple-900', ARRAY['Nuxt 3', 'TailwindCSS', 'Vue'], 1),
('Belugar', 'A premium platform designed with a modern aesthetic, focusing on delivering a seamless user experience and dynamic interactions.', 'https://belugar.com/', 'from-emerald-900 via-teal-800 to-primary/40', ARRAY['Vue ecosystem', 'Premium UI', 'Web App'], 2),
('Joyland Royal School', 'A professional and sleek website for a school, featuring a robust admissions flow, event tracking, and academic showcasing.', 'https://joylandroyalschool.com.ng/', 'from-indigo-900 via-purple-800 to-primary/30', ARRAY['Nuxt 3', 'Tailwind', 'Interactive'], 3),
('Yeerlo', 'An innovative web product featuring responsive design and high-performance digital interactions tailored for a growing audience.', 'https://yeerlo.com/', 'from-orange-900 via-red-800 to-primary/60', ARRAY['Modern Web', 'Performance', 'UI/UX'], 4),
('Ifrika', 'A rich digital platform designed to connect and empower, utilizing modern frontend architectures.', 'https://ifrika.com/', 'from-slate-800 via-gray-900 to-primary/20', ARRAY['Frontend Arc', 'Ecosystem', 'Scale'], 5),
('Isabi Bot', 'An intelligent conversational bot interface built to provide automated assistance and smart interactions.', 'https://isabi-bot.vercel.app/', 'from-primary/80 via-rose-800 to-pink-900', ARRAY['AI/Bot', 'Vue', 'Tailwind'], 6),
('Partyworld', 'An event and party management platform with vibrant aesthetics and robust functional capabilities.', 'https://partyworld1.com/', 'from-fuchsia-900 via-purple-900 to-primary/50', ARRAY['Events', 'Web Platform', 'Dynamic'], 7),
('Nim Innovative', 'A corporate innovation showcase featuring smooth animations, modern typography, and clean layouts.', 'https://niminnovative.vercel.app/', 'from-cyan-900 via-blue-900 to-primary/40', ARRAY['Corporate', 'Animation', 'Clean UI'], 8),
('School Portal 360', 'A secure and scalable login portal for 360liteent educational management suite.', 'https://schoolportal.360liteent.com.ng/login', 'from-violet-900 via-indigo-900 to-primary/30', ARRAY['Authentication', 'Portal', 'Security'], 9),
('Murems Consult', 'A professional consultancy website focused on delivering precise business strategies and financial planning tools.', '#', 'from-gray-800 via-zinc-800 to-primary/20', ARRAY['Consulting', 'Legacy', 'Business'], 10),
('Exam Practice', 'An interactive platform for students to simulate exam environments and track their preparation progress.', '#', 'from-amber-900 via-orange-900 to-primary/50', ARRAY['EdTech', 'Interactive', 'Dashboard'], 11);

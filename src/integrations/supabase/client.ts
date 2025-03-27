import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hjxhxnbgvcvroelqmalb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqeGh4bmJndmN2cm9lbHFtYWxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNjMyNTEsImV4cCI6MjA1ODYzOTI1MX0.UIvOgcEZtDBR6tgzH5V70F68gdDUCN7JD1rhcBMim_o";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
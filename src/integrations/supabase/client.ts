// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ajpwrmnmvjstlnprzxls.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqcHdybW5tdmpzdGxucHJ6eGxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyODE1NjMsImV4cCI6MjA2Mjg1NzU2M30.RrBruyWwrpT2Al5mKObjfX41OQg9Ro8-uCgfFo1xzBI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
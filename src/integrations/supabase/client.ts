// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rpsgcekegbdvcopeelfk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwc2djZWtlZ2JkdmNvcGVlbGZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MjU5NTgsImV4cCI6MjA2MDIwMTk1OH0.9P165-qG3qXolVlLfq_AUz4gtlZmobFnsNgmfqzMXcg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
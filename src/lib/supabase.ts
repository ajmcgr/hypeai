import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cttirpxnbtkjqfmhyswp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0dGlycHhuYnRranFmbWh5c3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxMDY5MTEsImV4cCI6MjA3ODY4MjkxMX0.4Xo8BMfY4aoPXf74LI371rixO27I0gvedMZtjKIpkt4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

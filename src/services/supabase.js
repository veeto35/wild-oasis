
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://sajevehqcjvuapjkfnwb.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhamV2ZWhxY2p2dWFwamtmbndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0MTI1MDMsImV4cCI6MjA1MDk4ODUwM30.sUSxXlR0s2OYX2b7YGQJv2kZ87lzwE_0K9d1RXJRt_Y"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
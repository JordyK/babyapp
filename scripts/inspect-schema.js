const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://dmtnjzmwkaprsuoscfrr.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtdG5qem13a2FwcnN1b3NjZnJyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODQ5NDMwNiwiZXhwIjoyMDk0MDcwMzA2fQ.KUHEKLmt5td6DIevm2ptKZJbKf7e5G5AbyQ4cDAaiSs';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inspectSchema() {
  console.log('=== DATABASE SCHEMA INSPECTION ===\n');

  // Use SQL to get detailed schema information
  const { data: schemaData, error: schemaError } = await supabase
    .rpc('exec_sql', { 
      sql: `
        SELECT 
          table_name,
          column_name,
          data_type,
          is_nullable,
          column_default,
          ordinal_position
        FROM information_schema.columns 
        WHERE table_schema = 'public'
        ORDER BY table_name, ordinal_position;
      `
    });

  if (schemaError) {
    console.log('RPC not available, trying direct table inspection\n');
    
    // Direct table inspection
    const existingTables = ['profiles', 'onboarding_answers', 'checklist_items'];

    for (const tableName of existingTables) {
      console.log(`\n=== Table: ${tableName} ===`);
      
      const { data: sampleData, error: error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (error) {
        console.log(`Error: ${error.message}`);
      } else {
        if (sampleData && sampleData.length > 0) {
          console.log(`Columns:`, Object.keys(sampleData[0]));
          console.log(`Sample row:`, JSON.stringify(sampleData[0], null, 2));
        } else {
          console.log(`Table is empty`);
        }
      }
    }
  } else {
    console.log('Schema data:', schemaData);
  }
}

inspectSchema();

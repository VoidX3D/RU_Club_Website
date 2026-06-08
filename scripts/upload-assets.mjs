import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, '../public/static/assets');

const supabaseUrl = 'https://jquzfvhtgbyrssvvhoio.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxdXpmdmh0Z2J5cnNzdnZob2lvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MDkxMzQwNywiZXhwIjoyMDk2NDg5NDA3fQ.10CtKEBBVjzY5NRq0USw2o9itGmaiEiIH-t4zsyaLZk';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function uploadFile(localPath, storagePath) {
  const content = fs.readFileSync(localPath);
  const { error } = await supabase.storage
    .from('ruclub')
    .upload(storagePath, content, { upsert: true, contentType: getMimeType(localPath) });
  if (error) {
    console.error(`FAIL: ${storagePath} — ${error.message}`);
  } else {
    console.log(`OK: ${storagePath}`);
  }
}

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
  };
  return map[ext] || 'application/octet-stream';
}

async function uploadDir(dirPath, baseStoragePath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const storagePath = `${baseStoragePath}/${entry.name}`;
    if (entry.isDirectory()) {
      await uploadDir(fullPath, storagePath);
    } else {
      await uploadFile(fullPath, storagePath);
    }
  }
}

(async () => {
  console.log('Starting asset upload to Supabase Storage...\n');

  // Upload everything under static/assets/
  await uploadDir(assetsDir, 'static/assets');

  console.log('\nVerifying uploads...');
  const { data: files, error } = await supabase.storage.from('ruclub').list('static/assets', { limit: 200 });
  if (error) {
    console.error('Verify failed:', error.message);
  } else {
    console.log(`Total files in storage: ${files.length}`);
    // Show counts by subdirectory
    const counts = {};
    for (const f of files) {
      const prefix = f.name.split('/')[0];
      counts[prefix] = (counts[prefix] || 0) + 1;
    }
    for (const [dir, count] of Object.entries(counts)) {
      console.log(`  ${dir}: ${count} files`);
    }
  }

  console.log('\nDone!');
})();

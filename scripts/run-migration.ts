import * as dotenv from 'dotenv';
import { execSync } from 'child_process';
import path from 'path';

// Load environment variables from multiple possible locations
const envFiles = ['.env.local', '.env.development.local', '.env'];
let envLoaded = false;

for (const envFile of envFiles) {
  const envPath = path.join(process.cwd(), envFile);
  const result = dotenv.config({ path: envPath });
  if (!result.error) {
    console.log(`✅ Loaded environment variables from: ${envFile}`);
    envLoaded = true;
    break;
  }
}

// Also try to load from default .env
if (!envLoaded) {
  dotenv.config();
}

// Debug: show current directory and available env vars
console.log('🔍 Current working directory:', process.cwd());
console.log('🔍 Looking for DATABASE_URL...');

// Check if DATABASE_URL exists
let databaseUrl = process.env.DATABASE_URL;

// If not found in env, use the one from knexfile.ts
if (!databaseUrl) {
  console.log('🔄 DATABASE_URL not found in environment, using fallback from knexfile...');
  databaseUrl = 'postgresql://taskdb_owner:npg_LRkA4nfVa2CI@ep-soft-mountain-a8bm2qnl-pooler.eastus2.azure.neon.tech/taskdb?sslmode=require';
  process.env.DATABASE_URL = databaseUrl;
}

if (!databaseUrl) {
  console.error('\n❌ ERROR: DATABASE_URL is not defined!');
  console.error('Please create a .env.local file with DATABASE_URL');
  process.exit(1);
}

console.log('✅ DATABASE_URL found:', databaseUrl.substring(0, 30) + '...');
console.log('🚀 Running migrations...');

try {
  // Run knex migrate with proper configuration
  const command = 'npx knex migrate:latest --knexfile knexfile.ts';
  execSync(command, {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: { ...process.env }
  });
  
  console.log('✅ Migrations completed successfully!');
} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
} 
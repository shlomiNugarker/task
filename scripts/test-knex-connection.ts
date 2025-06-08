import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Check DATABASE_URL before importing db
let databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.log('🔄 DATABASE_URL not found in environment, using fallback...');
  databaseUrl = 'postgresql://taskdb_owner:npg_LRkA4nfVa2CI@ep-soft-mountain-a8bm2qnl-pooler.eastus2.azure.neon.tech/taskdb?sslmode=require';
  process.env.DATABASE_URL = databaseUrl;
}

import db from '../lib/db/knex';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    console.log(`Using DATABASE_URL: ${process.env.DATABASE_URL?.substring(0, 30)}...`);
    
    // Test basic connection
    await db.raw('SELECT 1');
    console.log('✅ Database connection successful');
    
    // Check if tasks table exists
    const hasTasksTable = await db.schema.hasTable('tasks');
    console.log(`✅ Tasks table exists: ${hasTasksTable}`);
    
    if (hasTasksTable) {
      const tasksCount = await db('tasks').count('id as count').first();
      console.log(`✅ Tasks count: ${tasksCount?.count || 0}`);
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await db.destroy();
    process.exit(0);
  }
}

testConnection();
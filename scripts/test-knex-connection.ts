import db from '../lib/db/knex';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    
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
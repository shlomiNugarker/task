import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import pool from '../lib/db/postgres';

async function setupDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('יוצר טבלת tasks...');
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log('✅ טבלת tasks נוצרה בהצלחה!');
  } catch (error) {
    console.error('❌ שגיאה ביצירת הטבלה:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

setupDatabase();
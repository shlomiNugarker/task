import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import pool from '../lib/db/postgres';

async function testConnection() {
  try {
    console.log('בודק חיבור לדטאבייס...');
    const client = await pool.connect();
    const result = await client.query('SELECT 1 as test');
    client.release();
    console.log('✅ החיבור לדטאבייס הצליח!');
    console.log('תוצאת הבדיקה:', result.rows[0]);
  } catch (error) {
    console.error('❌ שגיאה בחיבור לדטאבייס:', error);
  } finally {
    await pool.end();
  }
}

testConnection();
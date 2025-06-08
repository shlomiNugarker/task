import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

console.log('בדיקת משתני סביבה...\n');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl || databaseUrl.includes('username:password@host')) {
  console.log('❌ DATABASE_URL לא הוגדר נכון!');
  console.log('\nאנא עקוב אחר השלבים הבאים:');
  console.log('1. היכנס לאתר https://neon.tech');
  console.log('2. צור חשבון חדש או התחבר');
  console.log('3. צור פרויקט חדש');
  console.log('4. במסך הראשי, לחץ על "Connect"');
  console.log('5. העתק את Connection String');
  console.log('6. הדבק אותו בקובץ .env.local במקום הערך הנוכחי\n');
  console.log('הדוגמא צריכה להיראות כך:');
  console.log('DATABASE_URL=postgresql://neondb_owner:AbC123@ep-xyz-123.us-east-1.aws.neon.tech/neondb?sslmode=require');
} else {
  console.log('✅ DATABASE_URL הוגדר!');
  console.log('URL:', databaseUrl.replace(/:[^:]*@/, ':***@')); // Hide password
  console.log('\nכעת תוכל להריץ:');
  console.log('npm run db:test');
  console.log('npm run db:setup');
}
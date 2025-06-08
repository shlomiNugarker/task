# מערכת ניהול משימות

פרויקט Next.js עם TypeScript, Tailwind CSS ו-PostgreSQL (באמצעות pg).

## התקנה

1. התקן את התלויות:
```bash
npm install
```

2. הגדר את משתני הסביבה:
   - עדכן את הקובץ `.env.local` עם פרטי החיבור לדטאבייס NeonDB שלך
   - החלף את `DATABASE_URL` במחרוזת החיבור שלך

3. בדוק את החיבור לדטאבייס:
```bash
npm run db:test
```

4. הקם את הדטאבייס:
```bash
npm run db:setup
```

5. הפעל את השרת:
```bash
npm run dev
```

## שימוש

- עבור לכתובת: `http://localhost:3000`
- לחץ על "עבור למשימות" כדי להתחיל לנהל משימות
- הוסף משימות חדשות ורא את הרשימה מתעדכנת

## מבנה הפרויקט

- `app/` - דפי Next.js ו-API routes
- `lib/db/` - הגדרות דטאבייס ומודלים
- `scripts/` - סקריפטים לניהול דטאבייס

## פקודות דטאבייס

- `npm run db:test` - בדיקת חיבור לדטאבייס
- `npm run db:setup` - יצירת טבלת tasks

## הגדרת NeonDB

1. היכנס לאתר [neon.tech](https://neon.tech)
2. צור חשבון חדש או התחבר
3. צור פרויקט חדש (Create Project)
4. בחר שם לדטאבייס ואזור
5. לאחר יצירת הפרויקט, עבור ל-Dashboard
6. לחץ על "Connection Details" או "Connect"
7. העתק את ה-Connection String (יראה כך):
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
8. הדבק אותה בקובץ `.env.local` במקום `DATABASE_URL`

### דוגמא לקובץ .env.local:
```
DATABASE_URL=postgresql://neondb_owner:AbCdEf123456@ep-cool-math-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
```
const dotenv = require('dotenv');                      // מייבא את dotenv – מאפשר להשתמש במשתני סביבה מתוך קובץ .env
dotenv.config();                                       // טוען את משתני הסביבה לתוך process.env (למשל PORT, DB_URL וכו')

const express = require('express');                    // מייבא את Express – מסגרת ליצירת שרתים באינטרנט
const path = require('path');                          // מייבא את path – ספרייה לניהול נתיבים בצורה חוצת פלטפורמות
const expressLayouts = require('express-ejs-layouts'); // מאפשר להשתמש ב-layout קבוע לכל הדפים (כמו תבנית בסיס)
const methodOverride = require('method-override');     // תוסף שמאפשר להשתמש ב־PUT ו־DELETE בטפסי HTML (שבמקור תומכים רק ב־GET/POST)

const app = express();                                 // יוצר מופע של אפליקציית Express

// ===== הגדרות תבניות EJS =====
app.set('view engine', 'ejs');                         // מגדיר את מנוע התבניות כ־EJS (קבצי .ejs יתורגמו ל־HTML)
app.set('views', path.join(__dirname, 'views'));       // מגדיר את מיקום תיקיית התצוגות (views)
app.use(expressLayouts);                               // מפעיל את התמיכה ב־layout קבוע (פריסת עמודים אחידה)
app.set('layout', 'layout');                           // מגדיר את קובץ ברירת המחדל לפריסה – views/layout.ejs

// ===== קבצים סטטיים (CSS, JS, תמונות) =====
app.use(express.static(path.join(__dirname, 'public'))); // מגדיר את התיקייה public כנגישה מהדפדפן (לדוגמה: /css/style.css)

// ===== תמיכה בבקשות מסוג JSON וטפסים =====
app.use(express.json());                               // מאפשר לקלוט ולפענח בקשות מסוג JSON (למשל מ־fetch/AJAX)
app.use(express.urlencoded({ extended: true }));       // מאפשר לפענח מידע שמגיע מטפסים בפורמט URL Encoded

// ===== תמיכה בפעולות PUT/DELETE בטפסים =====
app.use(methodOverride('_method'));                    // מאפשר לשלוח טופס עם method=PUT או DELETE דרך שדה בשם _method

// ===== ראוטים =====
const viewRoutes = require('./routes/viewRoutes');     // מייבא את הנתיבים של התצוגה (דפים שמבוססים על EJS)
app.use('/', viewRoutes);                              // מפעיל את כל הראוטים תחת הנתיב הראשי (כמו '/', '/books', וכו')

module.exports = app;                                  // מייצא את האפליקציה לשימוש בקובץ server.js

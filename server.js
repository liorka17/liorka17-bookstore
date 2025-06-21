const http = require('http');                     // מייבא את המודול המובנה http – משמש ליצירת שרת HTTP פשוט
const app = require('./app');                     // מייבא את קובץ app.js שמכיל את הגדרות ה־Express, ראוטים, תצוגות וכו'
const { connectToDb } = require('./db');          // מייבא את הפונקציה שמתחברת למסד הנתונים (MongoDB)
const PORT = process.env.PORT || 5000;            // מגדיר את הפורט שהשרת יאזין עליו – לפי משתנה סביבה או 5000 כברירת מחדל

connectToDb((err) => {                            // קורא לפונקציית התחברות למסד – ומעביר לה callback
    if (!err) {                                   // אם אין שגיאה (התחברות הצליחה):
        console.log("✅ Connected to DB");        // מדפיס שהחיבור הצליח

        const server = http.createServer(app);    // יוצר שרת HTTP על בסיס אפליקציית Express שהוגדרה ב־app.js

        server.listen(PORT, '0.0.0.0', () => {     // מאזין על כל כתובות ה-IP (0.0.0.0) בפורט שהוגדר
            console.log(`Server started on port ${PORT}`); // מדפיס שהשרת התחיל לפעול
        });

    } else {
        console.log("❌ Failed to connect to DB"); // אם הייתה שגיאה – מדפיס שנכשל בהתחברות למסד הנתונים
    }
});

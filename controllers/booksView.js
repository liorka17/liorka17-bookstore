const { getDb } = require('../db');                  // מייבא את פונקציית getDb לקבלת חיבור למסד הנתונים
const { ObjectId } = require('mongodb');             // מייבא את ObjectId כדי לטפל בזיהוי לפי מזהה במסד MongoDB

// ======================= תצוגת כל הספרים =======================
exports.renderAllBooks = (req, res) => {
    const db = getDb();                              // מקבל את החיבור למסד הנתונים
    let books = [];                                  // יוצר מערך זמני לאחסון הספרים מהמסד

    db.collection('books')                           // ניגש לאוסף books
        .find()                                      // מבצע שאילת find שמחזירה את כל הספרים
        .forEach(book => books.push(book))           // דוחף כל ספר לתוך המערך
        .then(() => {
            res.render('pages/books', {              // מציג את העמוד books.ejs
                title: 'רשימת ספרים',                // כותרת העמוד
                books,                               // שולח את מערך הספרים
                error: null,                         // ללא שגיאה
                pageStyle: 'books'                   // טוען CSS ייעודי לעמוד זה (books.css)
            });
        })
        .catch(() => {
            res.render('pages/books', {
                title: 'רשימת ספרים',
                books: [],
                error: "שגיאה בטעינת ספרים",        // במידה ויש שגיאה, מציג שגיאה
                pageStyle: 'books'
            });
        });
};

// ======================= תצוגת טופס הוספת ספר =======================
exports.renderNewForm = (req, res) => {
    res.render('pages/new', {
        title: 'הוסף ספר',
        pageStyle: 'form',                            // טוען עיצוב form.css
        error: null                                   // ללא הודעת שגיאה התחלתית
    });
};

// ======================= יצירת ספר חדש =======================
exports.createBookView = (req, res) => {
    const db = getDb();
    const title = req.body.title?.trim();             // קורא את השדה title ומנקה רווחים
    const author = req.body.author?.trim();           // קורא את author
    const price = parseFloat(req.body.price);         // ממיר את המחיר למספר

    // בדיקת תקינות של כל השדות
    if (!title || !author || isNaN(price)) {
        return res.render('pages/new', {              // אם משהו לא תקין – מציג את הטופס שוב עם שגיאה
            title: 'הוסף ספר',
            pageStyle: 'form',
            error: 'יש למלא את כל השדות כראוי'
        });
    }

    db.collection('books')
        .insertOne({ title, author, price })           // מוסיף את הספר למסד
        .then(() => res.redirect('/'))                 // במידה וההוספה הצליחה – חזרה לעמוד הבית
        .catch(() => res.redirect('/?error=שגיאה בהוספה')); // שגיאה כללית בהוספה
};

// ======================= תצוגת טופס עריכת ספר =======================
exports.renderEditForm = (req, res) => {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) return res.redirect('/'); // בודק אם המזהה תקין

    db.collection('books')
        .findOne({ _id: new ObjectId(id) })              // מחפש את הספר לפי ה-ID
        .then(book => {
            if (!book) return res.redirect('/');         // אם לא נמצא הספר – חזרה
            res.render('pages/edit', {                   // אחרת מציג את טופס העריכה
                title: 'ערוך ספר',
                book,
                pageStyle: 'form',
                error: null
            });
        })
        .catch(() => res.redirect('/'));                 // במקרה של שגיאה – חזרה
};

// ======================= עדכון ספר קיים =======================
exports.updateBookView = (req, res) => {                     // מייצא את הפונקציה כך שתהיה נגישה בראוטר
    const db = getDb();                                       // מקבל את החיבור למסד הנתונים (MongoDB)
    const id = req.params.id;                                 // לוקח את מזהה הספר מה-URL (לדוגמה: /books/123)
    const title = req.body.title?.trim();                     // מקבל את ערך השדה title מהטופס ומסיר רווחים מסביב
    const author = req.body.author?.trim();                   // מקבל את ערך השדה author ומנקה רווחים
    const price = parseFloat(req.body.price);                 // ממיר את הערך שהתקבל בשדה price ממחרוזת למספר (float)


    // בדיקת תוקף מזהה + תקינות שדות
    if (!ObjectId.isValid(id) || !title || !author || isNaN(price)) return res.redirect('/');

    db.collection('books')
        .updateOne(
            { _id: new ObjectId(id) },                  // לפי מזהה
            { $set: { title, author, price } }          // מעדכן את השדות
        )
        .then(() => res.redirect('/'))                  // לאחר העדכון – חוזר לרשימת הספרים
        .catch(() => res.redirect('/'));                // במקרה של שגיאה
};

// ======================= מחיקת ספר לפי מזהה =======================
exports.deleteBookView = (req, res) => {
    const db = getDb();
    const id = req.params.id;

    if (!ObjectId.isValid(id)) return res.redirect('/');

    db.collection('books')
        .deleteOne({ _id: new ObjectId(id) })           // מוחק את הספר לפי מזהה
        .then(() => res.redirect('/'))                  // לאחר מחיקה – חוזר לרשימה
        .catch(() => res.redirect('/'));                // שגיאה – חוזר
};

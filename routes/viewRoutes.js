const express = require('express'); // מייבא את ספריית Express
const router = express.Router();    // יוצר מופע של Router – לניהול הנתיבים
const bookViewController = require('../controllers/booksView'); // מייבא את הקונטרולר שאחראי על הלוגיקה של התצוגות

// תצוגת כל הספרים (דף הבית)
router.get('/', bookViewController.renderAllBooks);

// טופס להוספת ספר חדש
router.get('/books/new', bookViewController.renderNewForm);

// שליחת טופס יצירת ספר חדש
router.post('/books', bookViewController.createBookView);

// טופס עריכה של ספר קיים לפי מזהה
router.get('/books/:id/edit', bookViewController.renderEditForm);

// שליחת טופס עדכון ספר קיים לפי מזהה
router.put('/books/:id', bookViewController.updateBookView);

// מחיקת ספר לפי מזהה
router.delete('/books/:id', bookViewController.deleteBookView);

module.exports = router; // מייצא את הראוטר לשימוש בקובץ הראשי (כמו server.js או app.js)

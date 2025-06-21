// const { getDb } = require('../db');
// const { ObjectId } = require('mongodb');

// // מחזיר את כל הספרים
// exports.getAllBooks = (req, res) => {
//     const db = getDb();
//     let books = [];

//     db.collection('books')
//         .find()
//         .forEach(book => books.push(book))
//         .then(() => res.status(200).json(books))
//         .catch(() => res.status(500).json({ error: "Could not fetch the documents." }));
// };

// // מחזיר ספר לפי מזהה
// exports.getBookById = (req, res) => {
//     const db = getDb();
//     const id = req.params.id;

//     if (ObjectId.isValid(id)) {
//         db.collection('books')
//           .findOne({ _id: new ObjectId(id) })
//           .then(doc => res.status(200).json(doc))
//           .catch(() => res.status(500).json({ error: "Could not fetch the documents." }));
//     } else {
//         res.status(500).json({ error: "Not a valid Document id" });
//     }
// };

// // יוצר ספר חדש
// exports.createBook = (req, res) => {
//     const db = getDb();
//     const newBook = {
//         title: req.body.title,
//         author: req.body.author,
//         price: req.body.price
//     };

//     db.collection('books')
//       .insertOne(newBook)
//       .then(result => res.status(201).json(result))
//       .catch(() => res.status(500).json({ error: 'Could not create new document' }));
// };

// // מעדכן ספר לפי מזהה
// exports.updateBook = (req, res) => {
//     const db = getDb();
//     const id = req.params.id;

//     if (ObjectId.isValid(id)) {
//         const updates = {
//             title: req.body.title,
//             author: req.body.author,
//             price: req.body.price
//         };

//         db.collection('books')
//           .updateOne({ _id: new ObjectId(id) }, { $set: updates })
//           .then(result => {
//               if (result.matchedCount === 0) {
//                   res.status(404).json({ error: "Book not found" });
//               } else {
//                   res.status(200).json({ message: "Book updated" });
//               }
//           })
//           .catch(() => res.status(500).json({ error: "Could not update the document." }));
//     } else {
//         res.status(400).json({ error: "Invalid document ID format" });
//     }
// };

// // מוחק ספר לפי מזהה
// exports.deleteBook = (req, res) => {
//     const db = getDb();
//     const id = req.params.id;

//     if (ObjectId.isValid(id)) {
//         db.collection('books')
//           .deleteOne({ _id: new ObjectId(id) })
//           .then(result => {
//               if (result.deletedCount === 0) {
//                   res.status(404).json({ error: "Book not found" });
//               } else {
//                   res.status(200).json({ message: "Book deleted" });
//               }
//           })
//           .catch(() => res.status(500).json({ error: "Could not delete the document." }));
//     } else {
//         res.status(400).json({ error: "Invalid document ID format" });
//     }
// };

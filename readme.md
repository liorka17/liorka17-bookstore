#  Bookstore App – Book Management System

This project is a full-stack Node.js application for managing a list of books using MongoDB as the database, Express.js for the backend, and EJS (Embedded JavaScript) as the view engine for rendering dynamic HTML pages. It supports full CRUD operations (Create, Read, Update, Delete) and provides both local and cloud MongoDB connectivity using environment variables.

---

##  How to Run the Project

### 1. Download and install

```bash
git clone https://github.com/liorka17/bookstore.git
cd bookstore
npm install
```

### 2. Create a `.env` file in the root directory

```env
DB_URL=mongodb://localhost:27017/bookstore
# Or for MongoDB Atlas:
# DB_URL=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/bookstore
```

### 3. Run the app

```bash
npm start
# Or for development:
npm run dev
```

### 4. Open in your browser

```
http://localhost:5000
```

---

##  Project Architecture Overview

The project follows a clean and modular **MVC-like structure**:

```
bookstore/
│
├── controllers/           # Server-side logic (e.g., render, update, delete)
│   └── booksView.js
│
├── routes/                # Express route definitions (connects URL paths to controller logic)
│   └── viewRoutes.js
│
├── views/                 # EJS templates – HTML structure for client-side
│   ├── layout.ejs         # Main layout (used by all pages)
│   ├── index.ejs          # Book listing page
│   ├── new.ejs            # Form to add a book
│   ├── edit.ejs           # Form to edit a book
│   └── partials/          # Shared components like header and footer
│       ├── header.ejs
│       └── footer.ejs
│
├── public/                # Static assets like CSS
│   └── style.css
│
├── db.js                  # MongoDB connection handler
├── app.js                 # App configuration and middleware
├── server.js              # App entry point (runs Express)
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
└── data/books.json        # Sample JSON data for MongoDB
```

---

## 🏗️ How the Server Loads, Connects, and Handles Data

When you start the Bookstore App, this is what happens step by step:

1. **Server Startup & Middleware Loading**
    - The main entry point is `server.js`, which imports the Express app from `app.js` and starts listening on the configured port (`5000` by default).
    - In `app.js`, essential middlewares are set up:
        - **Body parsing** for handling POST requests and forms.
        - **Method override** for supporting PUT and DELETE HTTP methods via forms.
        - **Static file serving** from the `/public` directory (for CSS, client-side JS, etc).
        - **View engine**: EJS is configured as the template engine for all HTML rendering.

2. **Environment Variables & Database Selection**
    - The app loads environment variables from `.env` using `dotenv`.
    - The variable `DB_URL` determines whether the app connects to a **local MongoDB** (e.g., Compass) or a **cloud MongoDB Atlas** cluster.

3. **Database Connection**
    - On server boot, `db.js` reads `DB_URL` and establishes a connection to the MongoDB server.
    - If the connection fails, the app will not start, and you’ll see an error in the console.
    - Once connected, the MongoDB collection `books` is ready for CRUD operations.

4. **Application Routing & Rendering**
    - All user requests are handled via routes defined in `/routes` (such as `viewRoutes.js`).
    - Each route points to a controller function in `/controllers/booksView.js`.
        - Example:  
          - Visiting `/books` will trigger the function to fetch all books from the database and render the EJS template `books.ejs`.
          - Visiting `/books/new` renders the form for adding a new book.
          - POST, PUT, DELETE requests are handled in controllers and update the database accordingly.
    - EJS templates in `/views` are rendered with data from the database, producing dynamic HTML pages for the client.

5. **How Data Flows**
    - On each page load, the server queries MongoDB for the needed data.
    - That data is injected into the EJS template and sent as a ready-made HTML page to the user's browser.
    - CSS files from `/public/css/` are automatically linked in the layout, ensuring a consistent, modern look on all pages.

6. **Development & Live Reload**
    - During development, `nodemon` is used (via `npm run dev`) to auto-restart the server when code changes are detected.
    - No need to manually restart or refresh the server after every update.

---

**Summary:**  
- The app loads environment variables, connects to MongoDB, sets up all middleware, and registers all routes and controllers.
- All page rendering is server-side via EJS, using live data from the database.
- Static assets (CSS, JS) are loaded automatically from the `public` folder for a smooth user experience.

---

##  Technologies Used

- **Node.js** – JavaScript runtime environment
- **Express.js** – Backend web framework
- **MongoDB** – NoSQL document database
- **EJS** – Templating engine to embed JS into HTML
- **CSS** – Styling
- **Nodemon** – Auto-restart development server on file changes

---

##  Why Nodemon?

In development, we use **nodemon** instead of the regular `node` command to automatically reload the server whenever we make changes to the code.

-  No need to manually restart the server
-  Faster development workflow
-  Instantly reflects changes in routes, controllers, or templates

Configured in `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Just run:
```bash
npm run dev
```

…and you're good to go!

---

##  How the Frontend Works (EJS)

EJS templates render HTML pages dynamically from the server:

- `layout.ejs`: Defines the overall structure (header, body, footer)
- `index.ejs`: Lists all books using a `forEach` loop over the data
- `new.ejs`: Form to add a new book (POST to `/books`)
- `edit.ejs`: Pre-filled form to edit an existing book (PUT via method override)
- `partials/`: Shared header and footer included via `<%- include('...') %>`

EJS allows direct JavaScript logic inside HTML:
```ejs
<% books.forEach(book => { %>
  <tr>
    <td><%= book.title %></td>
  </tr>
<% }) %>
```

---

##  Main Server Functions (booksView.js)

- `renderAllBooks()` – Loads all books from the DB
- `renderNewBookForm()` – Renders form to add a new book
- `createBook()` – Inserts a new book to the DB with validation
- `renderEditBookForm()` – Loads a book into the edit form
- `updateBook()` – Updates book data
- `deleteBook()` – Deletes a book by ID

---

##  LocalDB & CloudDB Support

- Easily switch between MongoDB **Compass (local)** and **Atlas (cloud)** by changing the `DB_URL` value in `.env`.
- The code uses `process.env.DB_URL` dynamically via `dotenv`.

---

##  Sample Data (books.json)

We included a sample file with 30 books.

**Import to MongoDB Compass**:

1. Open Compass and connect to:
   ```
   mongodb://localhost:27017
   ```

2. Create database: `bookstore`, collection: `books`

3. Click `ADD DATA > Import File`

4. Choose `books.json`  
   File type: `JSON`

5. Click `IMPORT`

---

##  Testing

-  Add new books
-  Edit and update
-  Delete books
-  View all records
-  Validation for missing fields
-  Error handling for bad IDs or DB failures

---

##  Project Info

- Author: **Lior Kalendrov**
- Final Semester Project – Databases Course
- Lecturer: **Nir Hadar**
- GitHub: [github.com/liorka17/bookstore](https://github.com/liorka17/bookstore)

---

##  Notes

- Use `npm run dev` during development.
- Use `npm start` for production.
- Don't forget your `.env` file with the correct DB URL.
- You can import `books.json` into MongoDB Compass to test with real data.

---

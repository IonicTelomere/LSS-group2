const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const axios = require('axios');

// Initialize the express application
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'lss-database-1.cresoi04ckm5.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',                  // Replace with your MySQL username
    password: 'lsspassword!!1',     // Replace with your MySQL password
    database: 'lssdb',              // Replace with your MySQL database name
    port: 3306                      // MySQL default port
});

// Helper function to use async/await with mysql2
const queryDatabase = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                reject(err); // Reject the promise if there's an error
            } else {
                resolve(results); // Resolve the promise with the results
            }
        });
    });
};

// POST route to handle data insertion or fetching
app.post('/insert', async (req, res) => {
    console.log("Received POST request to /insert");
    console.log("Request body:", req.body);

    const query = 'SELECT * FROM SubjectMonthlySchedule';

    try {
        const results = await queryDatabase(query);  // Await the promise
        res.status(200).json(results);  // Send the query results as JSON
    } catch (error) {
        console.error('Detailed Error:', error);  // Log the error for debugging
        res.status(500).json({ message: "An error occurred while processing your request.", error: error.message });  // Send more detailed error message to the client
    }
});

// Connect to the RDS database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to RDS MySQL:', err.stack);
        return;
    }
    console.log('Connected to RDS MySQL as ID ' + connection.threadId);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Login
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    const query = `
        SELECT users.password, roles.role_name
        FROM users
        JOIN roles ON users.role_id = roles.role_id
        WHERE users.email = ?`;

        connection.execute(query, [email], async (err, results) => {
            if (err) return res.status(500).json({ message: "Database Error" });

            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            const user = results[0];

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invild email or password" });
            }

            res.json({ role: user.role_name });
        });
});

app.get("/api/courses", (req, res) => {
    const query = 'SELECT * FROM courses';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: 'Failed to fetch courses' });
        } else {
            res.json(results);
        }
    });
});

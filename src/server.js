const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const axios = require('axios');
const path = require('path');

// Initialize the express application
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});


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

    const query = 'SELECT * FROM LecturerSchedule';

    try {
        const results = await queryDatabase(query);  // Await the promise
        res.status(200).json(results);  // Send the query results as JSON
    } catch (error) {
        console.error('Detailed Error:', error);  // Log the error for debugging
        // Send more detailed error message to the client
        res.status(500).json({ message: "An error occurred while processing your request.", error: error.message });
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
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    // Query to get user by email
    const query = "SELECT * FROM APP_USER WHERE Email = ?";
    connection.execute(query, [email], (err, results) => {
        if (err) {
            return res.status(500).send("Error querying the database.");
        }

        if (results.length === 0) {
            return res.status(401).send("Invalid email or password.");
        }

        // Compare password with hashed password stored in database
        const user = results[0];
        bcrypt.compare(password, user.PasswordHash, (err, isMatch) => {
            if (err) {
                return res.status(500).send("Error comparing passwords.");
            }

            if (!isMatch) {
                return res.status(401).send("Invalid email or password.");
            }

            // Return user data, including role
            return res.json({
                UserID: user.UserID,
                RoleID: user.RoleID,  // Return RoleID for role-based redirection
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
            });
        });
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


// Registration API endpoint
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, role, proficiency, preference, preference1, preference2, workload, email, password } = req.body;
  
    if (!email || !password || !role || !firstName || !lastName) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const query = 'CALL AddUser(?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(query, [email, hashedPassword, role, firstName, lastName, preference, preference1, preference2, workload || null], (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Database error' });
        }
        res.status(200).json({ message: 'User registered successfully' });
      });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  });

// Assign Subjects to Lecturers
  app.post('/assign-subject', (req, res) => {
    const { subjectInstanceID, lecturerID } = req.body;

    // Validate inputs
    if (!subjectInstanceID || !lecturerID) {
        return res.status(400).json({ error: 'SubjectInstanceID and LecturerID are required' });
    }

    // Call the stored procedure
    const query = 'CALL AllocateLecturer(?, ?, @resultMessage); SELECT @resultMessage AS resultMessage;';
    db.query(query, [subjectInstanceID, lecturerID], (err, results) => {
        if (err) {
            console.error('Error calling procedure:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Extract the result message from the output
        const resultMessage = results[1][0]?.resultMessage;
        if (resultMessage === 'This subject is already assigned') {
            return res.status(400).json({ error: resultMessage });
        }

        res.status(200).json({ message: resultMessage });
    });
});


// Route: Update Lecturer Availability
app.post('/update-availability', (req, res) => {
    const { lecturerId, dayOfWeek, availability } = req.body;

    if (!lecturerId || !dayOfWeek || availability === undefined) {
        return res.status(400).json({ error: 'lecturerId, dayOfWeek, and availability are required' });
    }

    const query = `
        INSERT INTO lecturer_availability (lecturer_id, day_of_week, available)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE available = ?;
    `;

    db.query(query, [lecturerId, dayOfWeek, availability, availability], (err) => {
        if (err) {
            console.error('Error updating availability:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Availability updated successfully' });
    });
});
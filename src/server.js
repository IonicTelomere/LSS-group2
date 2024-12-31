// Importing required modules
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
const router = express.Router();

// Serve the React build folder as static files
app.use(express.static(path.join(__dirname, "build")));

// Redirect all routes to the React app (for front-end routing)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Middleware setup
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());  // Parse incoming JSON requests

// MySQL connection setup
const connection = mysql.createConnection({
    host: 'lss-database-1.cresoi04ckm5.ap-southeast-2.rds.amazonaws.com',  // RDS host URL
    user: 'admin',  // MySQL username
    password: 'lsspassword!!1',  // MySQL password
    database: 'lssdb',  // MySQL database name
    port: 3306  // Default MySQL port
});

// Helper function to use async/await with mysql2
const queryDatabase = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, results) => {
            if (err) {
                reject(err); // Reject if there is an error
            } else {
                resolve(results); // Resolve with the results
            }
        });
    });
};

// POST route for fetching data from the UpcomingUnallocatedSubjectInstances table
app.post('/insert', async (req, res) => {
    console.log("Received POST request to /insert");
    console.log("Request body:", req.body);

    const query = 'SELECT * FROM UpcomingUnallocatedSubjectInstances';

    try {
        const results = await queryDatabase(query);  // Await the query result
        res.status(200).json(results);  // Send query results as JSON response
    } catch (error) {
        console.error('Detailed Error:', error);  // Log the error for debugging
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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Login API - authenticate user and return user details
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required.");
    }

    const query = "SELECT * FROM APP_USER WHERE Email = ?";
    connection.execute(query, [email], (err, results) => {
        if (err) {
            return res.status(500).send("Error querying the database.");
        }

        if (results.length === 0) {
            return res.status(401).send("Invalid email or password.");
        }

        const user = results[0];
        bcrypt.compare(password, user.PasswordHash, (err, isMatch) => {
            if (err) {
                return res.status(500).send("Error comparing passwords.");
            }

            if (!isMatch) {
                return res.status(401).send("Invalid email or password.");
            }

            // Return user data along with role ID for role-based access control
            return res.json({
                UserID: user.UserID,
                RoleID: user.RoleID,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
            });
        });
    });
});

// API to fetch courses
app.get("/api/courses", (req, res) => {
    const query = 'SELECT * FROM courses';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            res.status(500).json({ error: 'Failed to fetch courses' });
        } else {
            res.json(results);  // Return course data
        }
    });
});

// Registration API - adds a new user to the system
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, role, preference, preference1, preference2, workload, email, password } = req.body;
  
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

// API to assign a lecturer to a subject
app.post('/assign-subject', (req, res) => {
    const { subjectId, lecturerId } = req.body;

    if (!subjectId || !lecturerId) {
        return res.status(400).json({ error: 'subjectId and lecturerId are required' });
    }

    const query = 'CALL AllocateLecturer(?, ?); ';
    
    connection.query(query, [subjectId, lecturerId], (err, results) => {
        if (err) {
            console.error('Error calling procedure:', err);
            return res.status(500).json({ error: 'Database error' });
        }
    });
});

// API to display subject information
app.post('/displaysubject', async (req, res) => {
    const query = 'SELECT * FROM LecturerSubjectReference';

    try {
        const results = await queryDatabase(query);  // Await the query result
        res.status(200).json(results);  // Return subject data
    } catch (error) {
        console.error('Detailed Error:', error);  // Log error for debugging
        res.status(500).json({ message: "An error occurred while processing your request.", error: error.message });
    }
});

// API to fetch lecturer schedule
app.post('/lecturer', async (req, res) => {
    const query = 'SELECT * FROM LecturerSchedule';

    try {
        const results = await queryDatabase(query);  // Await the query result
        res.status(200).json(results);  // Return schedule data
    } catch (error) {
        console.error('Detailed Error:', error);  // Log error for debugging
        res.status(500).json({ message: "An error occurred while processing your request.", error: error.message });
    }
});

// API to edit lecturer details
app.put('/api/lecturers/:id', (req, res) => {
    const lecturerId = req.params.id;
  
    const sql = 'SELECT * FROM LecturerDetails WHERE UserID = ?';
  
    connection.query(
      sql,
      [lecturerId],
      (err, results) => {
        if (err) {
          console.error('Error retrieving lecturer data:', err);
          return res.status(500).json({ message: 'Failed to retrieve lecturer data' });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: 'Lecturer not found' });
        }
  
        return res.status(200).json(results[0]);
      }
    );
});

// API to add a subject
app.post('/api/addsubject', (req, res) => {
    const { subjectCode, subjectName } = req.body;

    if (!subjectCode || !subjectName) {
        return res.status(400).json({ error: 'Subject code and name are required.' });
    }

    const query = 'CALL Add_Subject(?, ?)';
    connection.query(query, [subjectCode, subjectName], (err, result) => {
        if (err) {
            console.error('Error adding subject:', err);
            return res.status(500).json({ error: 'Failed to add subject.' });
        }
        res.status(200).json({ message: 'Subject added successfully!' });
    });
});

// API to add subject instance
app.post('/add-subject-instance', (req, res) => {
    const { subjectcode, startdate, noofenrolments } = req.body;

    if (!subjectcode || !startdate || !noofenrolments) {
        return res.status(400).json({ error: 'Subject code, start date, and number of enrolments are required' });
    }

    const query = 'CALL Add_Subject_Instance(?, ?, ?)';
    connection.query(query, [subjectcode, startdate, noofenrolments], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error adding subject instance' });
        }
        return res.status(200).json({ message: 'Subject instance added successfully' });
    });
});

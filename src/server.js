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

    const query = 'SELECT * FROM UpcomingUnallocatedSubjectInstances';

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
      return res.status(500).json({ message: err.sqlMessage || 'Failed to create user' });
    }
  });


  app.post('/assign-subject', (req, res) => {
    const { subjectId, lecturerId } = req.body;  // Changed to subjectId

    if (!subjectId || !lecturerId) {
        return res.status(400).json({ error: 'subjectId and lecturerId are required' });
    }

    const query = 'CALL AllocateLecturer(?, ?); ';
    
    connection.query(query, [subjectId, lecturerId], (err, results) => {
        if (err) {
            console.error('Error calling procedure:', err);
            return res.status(500).json({ message: err.sqlMessage || 'Failed to assign lecturer to subject' });
        }

        // Extract result message from the output
        /*const resultMessage = results[1][0]?.resultMessage;
        if (resultMessage === 'This subject is already assigned') {
            return res.status(400).json({ error: resultMessage });
        }*/

        //res.status(200).json({ message: resultMessage });
    });
});



app.post('/displaysubject', async (req, res) => {
    console.log("Received POST request to /insert");
    console.log("Request body:", req.body);

    const query = 'SELECT * FROM LecturerSubjectReference';

    try {
        const results = await queryDatabase(query);  // Await the promise
        res.status(200).json(results);  // Send the query results as JSON
    } catch (error) {
        console.error('Detailed Error:', error);  // Log the error for debugging
        // Send more detailed error message to the client
        res.status(500).json({ message: "An error occurred while processing your request.", error: error.message });
    }
});

app.post('/lecturer', async (req, res) => {
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


// Editing Lecturer Information
  // API route to update lecturer info using stored procedure
  app.put('/api/lecturers/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, preference, preference1, preference2, workload } = req.body;
  
    // Update lecturer information using the procedure
    const sql = `
      CALL Edit_Lecturer(?, ?, ?, ?, ?, ?, ?);
    `;
  
    connection.query(
      sql,
      [id, firstName, lastName, preference, preference1, preference2, workload],
      (err, results) => {
        if (err) {
          console.error('Error updating lecturer:', err);
          return res.status(500).json({ message: err.sqlMessage || 'Failed to update lecturer information' });
        }
  
        res.status(200).json({ message: 'Lecturer updated successfully' });
      }
    );
  });
  

  
  
  

// Route to add a subject
app.post('/api/addsubject', (req, res) => {
    const { subjectCode, subjectName } = req.body;

    // Validate input
    if (!subjectCode || !subjectName) {
        return res.status(400).json({ error: 'Subject code and name are required.' });
    }

    const query = 'CALL Add_Subject (?,?)';
    connection.query(query, [subjectCode, subjectName], (err, result) => {
        if (err) {
            console.error('Error adding subject:', err);

            // If it's a SQL error related to SIGNAL (custom error), capture and send it
            if (err.code === '45000') {
                return res.status(400).json({ error: err.message });
            }

            return res.status(500).json({ message: err.sqlMessage || 'Failed to add subject' });
        }
        res.status(200).json({ message: 'Subject added successfully!' });
    });
});


app.post('/lecturerdetails', async (req, res) => {
    console.log("Received POST request to /insert");
    console.log("Request body:", req.body);

    const query = 'SELECT * FROM LecturerDetails';

    try {
        const results = await queryDatabase(query);  // Await the promise
        res.status(200).json(results);  // Send the query results as JSON
    } catch (error) {
        console.error('Detailed Error:', error);  // Log the error for debugging
        // Send more detailed error message to the client
        res.status(500).json({ message: "An error occurred while processing your request.", error: error.message });
        
    }
});


app.post('/api/addsubjectinstance', (req, res) => {
    console.log('Request Body:', req.body);
    const { subjectCodeInstance, startdate, noofenrolments } = req.body;

    // Input validation
    if (!subjectCodeInstance || !startdate || !noofenrolments) {
        return res.status(400).json({ error: 'Subject ID, Start Date, and Number of Enrolments are required.' });
    }

    // Query to call the stored procedure
    const query = 'CALL Add_Subject_Instance (?, ?, ?)';

    // Execute the query
    connection.query(query, [subjectCodeInstance, startdate, noofenrolments], (err, result) => {
        if (err) {
            console.error('Error adding subject instance:', err);

            // Check if the error is a custom MySQL error (raised by SIGNAL)
            if (err.sqlMessage) {
                return res.status(400).json({ error: err.sqlMessage });
            }

            // General server error
            return res.status(500).json({ message: 'Failed to add subject instance.' });
        }

        // Success message
        res.status(200).json({ message: 'Subject instance added successfully!' });
    });
});

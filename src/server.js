const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

// Initialize the express application
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

// MySQL database connection
const connection = mysql.createConnection({
    host: 'lss-database-1.cresoi04ckm5.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',                  // Replace with your MySQL username
    password: 'lsspassword!!1',     // Replace with your MySQL password
    database: 'lssdb',              // Replace with your MySQL database name
    port: 3306                      // MySQL default port
});

// Helper function to use async/await with mysql2
const queryDatabase = (query, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Token secret
const JWT_SECRET = 'your-secret-key'; // Replace with a strong secret key

// Authentication middleware
const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId; // Attach userId to request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// User login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const query = 'SELECT * FROM USER WHERE Email = ?';
    connection.execute(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error querying the database.' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = results[0];
        bcrypt.compare(password, user.PasswordHash, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing passwords.' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const token = jwt.sign({ userId: user.UserID }, JWT_SECRET, { expiresIn: '1h' });
            res.json({
                token,
                UserID: user.UserID,
                RoleID: user.RoleID, // Return RoleID for role-based redirection
                FirstName: user.FirstName,
                LastName: user.LastName,
                Email: user.Email,
            });
        });
    });
});

// User registration
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

// Fetch filtered LecturerSchedule for events
app.get('/api/lecturer-events', authenticateUser, async (req, res) => {
    const query = 'SELECT * FROM LecturerSchedule WHERE UserID = ? ORDER BY StartDate';

    try {
        const results = await queryDatabase(query, [req.userId]);
        const formattedResults = results.map(schedule => ({
            date: schedule.StartDate,
            title: schedule.Title || `Lecture: ${schedule.Subject}`, // Adjust as needed
        }));
        res.status(200).json(formattedResults);
    } catch (error) {
        console.error('Error fetching LecturerSchedule:', error);
        res.status(500).json({ message: 'Failed to fetch LecturerSchedule', error: error.message });
    }
});

// Fetch all courses
app.get('/api/courses', (req, res) => {
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

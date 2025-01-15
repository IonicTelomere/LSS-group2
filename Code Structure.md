Frontend Structure:

The frontend is built using React and leverages React-Bootstrap for styling and layout. The RegisterPage component provides a user registration interface. Here's a breakdown of its structure and key components:
________________________________________
1. Component Structure
•	Functional Component: RegisterPage is a functional React component using hooks like useState to manage local state.
•	State Management: State variables are used to handle input values (e.g., email, password, role) and application-specific states like error.
•	Dynamic Behavior: Conditional rendering is employed to show/hide additional fields based on the selected role (e.g., preferences are shown if the role is "Lecturer").
•	Timeout Management: Uses setTimeout to track inactivity.
•	User Activity Monitoring: Listens for mouse, keyboard, and click events to reset the timer.
•	Uses useNavigate to redirect to the login page upon timeout.
•	Calls logoutUser from UserContext to clear the user session.
________________________________________
2. Form Elements
•	Inputs: Includes various form fields like text inputs (for names and email), password fields, dropdown menus (for roles, preferences, workload), and conditional fields based on user role.
•	Validation: Basic validation is implemented (e.g., password matching and required fields).
•	Error Display: Errors are shown using the error state.
________________________________________
3. Styling and Layout
•	React-Bootstrap Components:
o	Container, Row, Col: To manage the layout.
o	Button, Form, Nav: For form inputs, buttons, and navigation.
•	Custom Styles:
o	Inline styles are used for specific UI components, like logo dimensions, card layout, and button colors.
________________________________________
4. Logic
•	Event Handlers:
o	handleSubmit: Handles form submission by making a POST request to the backend via Axios.
o	handlePreferenceChange functions: Update preferences dynamically.
•	Conditional Fields:
o	Preference fields (Preference 1, 2, 3) are rendered only for the "Lecturer" role.
•	Role-Specific Data:
o	Based on the role, different fields (like preferences) are displayed.
________________________________________
5. API Communication
•	Axios:
o	Used for making POST requests to the backend endpoint (/api/register) with user input data.
________________________________________
6. Navigation
•	Sidebar Navigation:
o	Includes navigation to an admin page and a logout button.
o	Example routes: /manager, /managersummary, /editlecturer.

________________________________________
7. Assets
•	Logo:
o	An image (logo) is imported and displayed in the header.





Backend Structure:

1. Server Initialization
•	Express.js is used to set up the server and routes:
JavaScript
const express = require('express');
const app = express();
const PORT = 3000;
•	Middleware:
o	cors: Enables cross-origin requests.
o	body-parser: Parses incoming JSON data in requests.
2. Database Connection
•	The backend uses MySQL as the database, connected via mysql2:
JavaScript
const connection = mysql.createConnection({
    host: 'lss-database-1.cresoi04ckm5.ap-southeast-2.rds.amazonaws.com',
    user: 'admin',
    password: 'lsspassword!!1',
    database: 'lssdb',
    port: 3306
});
•	Provides helper function queryDatabase for executing queries with async/await.
3. API Endpoints
The backend exposes a variety of endpoints for different functionalities:
Authentication
•	Login (/api/login):
o	Verifies email and password using bcrypt.
o	Returns user details including RoleID for role-based access.
User Management
•	Register (/api/register):
o	Registers a user with hashed passwords and validates inputs.
o	Utilizes a stored procedure (AddUser) to insert user data.
Data Retrieval
•	Fetch Courses (/api/courses):
o	Retrieves all courses from the database.
•	Lecturer Details (/lecturerdetails):
o	Fetches lecturer-specific data.
Data Modification
•	Edit Lecturer (/api/lecturers/:id):
o	Updates lecturer information using the stored procedure Edit_Lecturer.
Subject Management
•	Add Subject (/api/addsubject):
o	Adds a new subject using the Add_Subject stored procedure.
•	Assign Lecturer (/assign-subject):
o	Assigns a lecturer to a subject using the AllocateLecturer stored procedure.
•	Add Subject Instance (/api/addsubjectinstance):
o	Adds a subject instance with details like start date and enrollments.
4. Error Handling
•	Ensures detailed error responses are returned:
JavaScript
res.status(500).json({ message: "An error occurred while processing your request.", error: error.message });
5. Role-Based Logic
•	Role IDs (e.g., RoleID in the user object) allow for role-based functionalities (e.g., admin, lecturer).
________________________________________
Integration
1.	Frontend Interactions:
o	The frontend sends API requests using axios or similar libraries.
o	Endpoints like /api/login or /api/register return JSON data for the frontend to display or use (e.g., redirecting based on role).
2.	Backend Responses:
o	All endpoints return consistent JSON responses with appropriate HTTP status codes (200, 400, 500).


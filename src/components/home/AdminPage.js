import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { Toast, ToastContainer, Button, Form } from 'react-bootstrap'; // Import additional components
import logo from "../Img/LSS.png";
import LogoutButton from '../auth/Logout'; // Component for handling user logout

function AdminPage() {
    const session = useSession(); // Hook to access the current session
    const supabase = useSupabaseClient(); // Client for interacting with Supabase
    const { isLoading } = useSessionContext(); // Indicates if the session context is loading
    const [note, setNote] = useState(""); // State for the note input
    const [notes, setNotes] = useState([]); // State for storing notes and timestamps
    const [notifications, setNotifications] = useState([]); // State for notifications

    // Sample notifications data for the admin
    const sampleNotifications = [
        { type: 'Info', time: 'Just Now', message: 'New user registered successfully!' },
        { type: 'Warning', time: '5 mins ago', message: 'Server maintenance scheduled for tonight.' },
    ];

    useEffect(() => {
        // Load notes from localStorage when the component mounts
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
    }, []);

    useEffect(() => {
        // Save notes to localStorage whenever it changes
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    if (isLoading) {
        return <></>; // Render nothing if the session context is loading
    }

    // Function to add a new note with timestamp
    const addNote = () => {
        if (note) {
            const timestamp = new Date().toLocaleString(); // Get the current timestamp
            setNotes((prev) => [...prev, { text: note, timestamp }]); // Add note with timestamp
            setNotifications((prev) => [...prev, { type: 'Success', time: 'Just Now', message: `Note added: "${note}"` }]);
            setNote(""); // Clear the note input
        }
    };

    // Function to handle key press event on note input
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission
            addNote(); // Call the function to add note
        }
    };

    // Function to delete a note by its index
    const deleteNote = (index) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
        setNotifications((prev) => [...prev, { type: 'Warning', time: 'Just Now', message: `Note deleted.` }]);
    };

    // Function to handle user sign-out
    async function signOut() {
        await supabase.auth.signOut();
    }

    return (
        <Container>
            <Row>
                <Col>
                    {/* Logo section */}
                    <div className="text-center mb-4" style={{ marginBottom: '30px' }}>
                        <img
                            src={logo}
                            alt="LSS Logo"
                            style={{
                                width: "250px",
                                height: "auto",
                                padding: '20px 0px 0px 0px',
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                    <h1 style={{ color: '#064789' }}>Admin Page</h1>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        {/* Navigation panel */}
                        <Nav
                            defaultActiveKey="/home"
                            className="flex-column"
                            style={{
                                backgroundColor: '#EBF2FA',
                                padding: '20px',
                                borderRadius: '30px',
                                marginRight: '20px',
                                width: '250px',
                            }}
                        >
                            <Nav.Link
                                href="/register"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    backgroundColor: '#427AA1',
                                    color: 'white',
                                    textAlign: 'center',
                                    marginBottom: '10px',
                                }}
                            >
                                Register New Users
                            </Nav.Link>
                            <LogoutButton />
                        </Nav>

                        {/* Main content area */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                gap: '20px',
                            }}
                        >
                            {/* Notifications section */}
                            <div
                                style={{
                                    backgroundColor: '#EBF2FA',
                                    padding: '20px',
                                    borderRadius: '30px',
                                    textAlign: 'center',
                                }}
                            >
                                <h3 style={{ color: '#064789', textAlign: 'left' }}>Notifications</h3>
                                {/* Toast Container for displaying notifications */}
                                <ToastContainer className="position-static" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                                    {
                                        // Map through the notifications and create a Toast for each
                                        sampleNotifications.map((notif, index) => (
                                            <div key={index} style={{ flex: '0 0 calc(30% - 20px)' }}>
                                                <Toast>
                                                    <Toast.Header>
                                                        <strong className="me-auto">{notif.type}</strong>
                                                        <small>{notif.time}</small>
                                                    </Toast.Header>
                                                    <Toast.Body>{notif.message}</Toast.Body>
                                                </Toast>
                                            </div>
                                        ))
                                    }
                                </ToastContainer>
                            </div>

                            {/* Notes Section */}
                            <div
                                style={{
                                    backgroundColor: '#EBF2FA',
                                    padding: '40px',
                                    borderRadius: '30px',
                                    textAlign: 'left',
                                }}
                            >
                                <h3 style={{ color: '#064789' }}>General Notes</h3>
                                <Form inline>
                                    <Form.Control
                                        type="text"
                                        placeholder="Add a note"
                                        value={note}
                                        onChange={(e) => setNote(e.target.value)}
                                        onKeyPress={handleKeyPress} // Add key press handler
                                        style={{ marginRight: '10px', width: '60%' }}
                                    />
                                    <Button variant="primary" onClick={addNote} style={{ marginTop: '10px' }}>Add Note</Button>
                                </Form>
                                <ul style={{ marginTop: '20px', listStyleType: 'none', paddingLeft: 0 }}>
                                    {notes.map((n, index) => (
                                        <li key={index} style={{ padding: '10px 0', display: 'flex', alignItems: 'center' }}>
                                            {n.text} <small style={{ marginLeft: '10px', color: '#888' }}>{n.timestamp}</small>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                style={{ marginLeft: '10px' }}
                                                onClick={() => deleteNote(index)}
                                            >
                                                Delete
                                            </Button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminPage; // Export component

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DatePicker from 'react-date-picker';
import { useState } from 'react';
import LogoutButton from '../auth/Logout'; // Component for handling user logout

function AdminPage() {
    const session = useSession(); // Hook to access the current session
    const supabase = useSupabaseClient(); // Client for interacting with Supabase
    const { isLoading } = useSessionContext(); // Indicates if the session context is loading
    const [start, setStart] = useState(new Date()); // State for the start date of an event
    const [end, setEnd] = useState(new Date()); // State for the end date of an event
    const [eventName, setEventName] = useState(""); // State for the event name
    const [eventDescription, setEventDescription] = useState(""); // State for the event description

    if (isLoading) {
        return <></>; // Render nothing if the session context is loading
    }

    // Function to handle Google Sign-In for OAuth
    async function googleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'https://www.googleapis.com/auth/calendar.events' // Requesting calendar events scope
            }
        });
        if (error) {
            alert("Error Logging in to Google");
            console.log(error);
        }
    }

    // Function to create a new Google Calendar event
    async function createCalendarEvent() {
        console.log("Creating calendar event");
        const event = {
            'summary': eventName, // Event title
            'description': eventDescription, // Event description
            'start': {
                'dateTime': start.toISOString(), // Convert start date to ISO string
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // Get user's timezone
            },
            'end': {
                'dateTime': end.toISOString(), // Convert end date to ISO string
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // Get user's timezone
            }
        };
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + session.provider_token, // Use session's provider token
                'Content-Type': 'application/json' // Specify JSON content type
            },
            body: JSON.stringify(event) // Serialize event object to JSON
        }).then((data) => data.json())
          .then((data) => {
            console.log(data);
            alert("Event created ", event);
        });
    }

    // Function to handle user sign-out
    async function signOut() {
        await supabase.auth.signOut();
    }
    console.log(session); // Debug: Log session details
    console.log(start); // Debug: Log start date

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Admin Page</h1>
                    <div
                        style={{
                            display: 'flex', // Arrange elements horizontally
                            alignItems: 'flex-start', // Align items at the top
                        }}
                    >
                        {/* Navigation panel */}
                        <Nav
                            defaultActiveKey="/home"
                            className="flex-column"
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '20px',
                                borderRadius: '30px',
                                marginRight: '20px',
                                width: '250px', // Fixed width for consistent layout
                            }}
                        >
                            <Nav.Link
                                href="/register" // Redirect to register page
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textAlign: 'center',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                    borderColor: 'white',
                                }}>Register New Users</Nav.Link>
                            <LogoutButton /> {/* Logout button */}
                        </Nav>

                        {/* Main content area: Notes and Calendar */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column', // Stack Notes and Calendar vertically
                                flex: 1, // Take up remaining space
                                gap: '20px', // Space between Notes and Calendar
                            }}
                        >
                            {/* Notes section */}
                            <div
                                style={{
                                    backgroundColor: 'lightblue',
                                    padding: '40px',
                                    borderRadius: '30px',
                                    textAlign: 'center',
                                    width: '100%',
                                    maxWidth: '1000px', // Optional: Limit max width
                                }}
                            >
                                <div style={{ width: "400px", margin: "30px auto" }}>
                                    { session ? 
                                        <>
                                            <h2>Hey there {session.user.email}</h2>
                                            <p>Start of your event</p>
                                            <DatePicker onChange={setStart} value={start} /> {/* Start date picker */}
                                            <p>End of your event</p>
                                            <DatePicker onChange={setEnd} value={end} /> {/* End date picker */}
                                            <p>Event name</p>
                                            <input type="text" onChange={(e) => setEventName(e.target.value)} /> {/* Event name input */}
                                            <p>Event description</p>
                                            <input type="text" onChange={(e) => setEventDescription(e.target.value)} /> {/* Event description input */}
                                            <hr />
                                            <Button onClick={() => createCalendarEvent()}>Create Calendar Event</Button> {/* Create event */}
                                            <p></p>
                                            <Button onClick={() => signOut()}>Sign Out</Button> {/* Sign out button */}
                                        </>
                                        :
                                        <>
                                            <Button onClick={() => googleSignIn()}>Sign In With Google</Button> {/* Google Sign-In */}
                                        </>
                                    }
                                </div>
                                <p>Notes/Announcements</p>
                            </div>

                            {/* Calendar section */}
                            <div
                                style={{
                                    backgroundColor: 'lightblue',
                                    padding: '10px',
                                    borderRadius: '30px',
                                    textAlign: 'left',
                                    width: '100%',
                                    maxWidth: '1000px', // Optional: Limit max width
                                }}
                            >
                                <iframe
                                    title="Google Calendar"
                                    src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Australia%2FMelbourne&showPrint=0&src=bWFqb3JtYW4yNDBAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4uYXVzdHJhbGlhbiNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039BE5&color=%2333B679&color=%230B8043"
                                    style={{
                                        border: 'solid 1px #777',
                                        width: '100%',
                                        height: '600px',
                                        borderRadius: '30px',
                                    }}
                                    frameBorder="0"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AdminPage; // Export component

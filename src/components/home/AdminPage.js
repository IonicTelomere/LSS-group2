import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DatePicker from 'react-date-picker';
import { useState } from 'react';

function AdminPage() {
    const session = useSession(); // Tokes, When session exists we have user
    const supabase = useSupabaseClient();// Talk to supabase
    const { isLoading } = useSessionContext();
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");

    if (isLoading) {
        return<></>
    }

    async function googleSignIn() {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'https://www.googleapis.com/auth/calendar.events'
            }
        });
        if (error) {
            alert("Error Logging in to Google")
            console.log(error);
        }
    }

    async function createCalendarEvent() {
        console.log("Creating calendar event");
        const event = {
            'summary': eventName,
            'description': eventDescription,
            'start': {
                'dateTime': start.toISOString(), // Date.toISOString() ->
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
            },
            'end': {
                'dateTime': end.toISOString(), // Date.toISOString() ->
                'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone // America/Los_Angeles
            }
        }
        await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' + session.provider_token,
                'Content-Type': 'application/json' // Access token for google
            },
            body: JSON.stringify(event)
        }).then((data) => {
            return data.json();
        }).then((data) => {
            console.log(data);
            alert("Event created ", event);
        });
    }


    async function signOut() {
        await supabase.auth.signOut();
    }
    console.log(session);
    console.log(start);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Lecturer Page</h1>
                    <div
                        style={{
                            display: 'flex', // Enables horizontal layout
                            alignItems: 'flex-start', // Aligns items at the top
                            gap: '20px', // Adds space between Nav and content
                        }}
                    >
                        {/* Nav Div */}
                        <Nav
                            defaultActiveKey="/home"
                            className="flex-column"
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '20px 20px 540px',
                                borderRadius: '30px',
                                width: '130px', // Fixed width for consistent layout
                            }}
                        >
                            <Nav.Link
                                href="/home"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textDecoration: 'none',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}
                            >
                                Active
                            </Nav.Link>
                            <Nav.Link
                                eventKey="link-1"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textDecoration: 'none',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}
                            >
                                Link
                            </Nav.Link>
                            <Nav.Link
                                eventKey="link-2"
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'black',
                                    textDecoration: 'none',
                                    backgroundColor: 'white',
                                    marginBottom: '10px',
                                }}
                            >
                                Link
                            </Nav.Link>
                            <Nav.Link
                                eventKey="disabled"
                                disabled
                                style={{
                                    padding: '10px',
                                    borderRadius: '5px',
                                    color: 'gray',
                                    backgroundColor: '#f0f0f0',
                                }}
                            >
                                Disabled
                            </Nav.Link>
                        </Nav>

                        {/* Notes and Calendar Divs */}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column', // Stacks Notes and Calendar vertically
                                flex: 1, // Ensures it takes up remaining space
                                gap: '20px', // Adds space between Notes and Calendar
                            }}
                        >
                            {/* Notes Div */}
                            <div
                                style={{
                                    backgroundColor: 'lightblue',
                                    padding: '40px',
                                    borderRadius: '30px',
                                    textAlign: 'center',
                                    width: '100%',
                                    maxWidth: '1000px', // Optional: Limits max width
                                }}
                                >
                                <div style={{ width: "400px", margin: "30px auto" }}>
                                    { session ? 
                                        <>
                                            <h2>Hey there {session.user.email}</h2>
                                            <p>Start of your event</p>
                                            <DatePicker onChange={setStart} value={start} style={{ width: '250px', fontSize: '16px' }} />
                                            <p>End of your event</p>
                                            <DatePicker onChange={setEnd} value={end} style={{
                                                width: '300px',
                                                padding: '10px',
                                                fontSize: '16px',
                                                height: '50px',
                                            }} />
                                            <p>Event name</p>
                                            <input type="text" onChange={(e) => setEventName(e.target.value)} />
                                            <p>Event description</p>
                                            <input type="text" onChange={(e) => setEventDescription(e.target.value)} />
                                            <hr />
                                            <Button onClick={() => createCalendarEvent()}>Create Calendar Event</Button>
                                            <p></p>
                                            <Button onClick={() => signOut()}>Sign Out</Button>
                                        </>
                                        :
                                        <>
                                            <Button onClick={() => googleSignIn()}>Sign In With Google</Button>
                                        </>
                                    }
                                </div>
                                <p>Notes/Announcements</p>
                            </div>

                            {/* Calendar Div */}
                            <div
                                style={{
                                    backgroundColor: 'lightblue',
                                    padding: '10px',
                                    borderRadius: '30px',
                                    textAlign: 'left',
                                    width: '100%',
                                    maxWidth: '1000px', // Optional: Limits max width
                                }}
                            >
                                <iframe
                                    title="This is a unique title"
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

    )
}


export default AdminPage;
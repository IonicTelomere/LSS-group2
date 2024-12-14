import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import axios from 'axios';
import LogoutButton from '../auth/Logout';

// Setup localizer for react-big-calendar
const localizer = momentLocalizer(moment);

function LecturerNotification() {
    const [events, setEvents] = useState([]);
    const [view, setView] = useState('month'); // Default to month view
    const [error, setError] = useState(null);

    // Fetch events data from the server
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Ensure the user is logged in and token is stored
                const response = await axios.get('http://localhost:3000/api/lecturer-events', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setEvents(response.data); // Assuming data is in [{ date: '2024-11-27', title: 'Event 1' }]
            } catch (error) {
                setError('Failed to load events.');
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    // Format events to match the calendar's required format
    const formattedEvents = events.map(event => ({
        start: new Date(event.date), // Assume event.date is in 'YYYY-MM-DD' format
        end: new Date(event.date),   // Assuming events are all-day events
        title: event.title,
    }));

    // Render Year View
    const renderYearView = () => {
        const months = [];
        const currentYear = new Date().getFullYear();

        for (let i = 0; i < 12; i++) {
            months.push(
                <Col key={i} style={{ padding: '10px' }}>
                    <h3>{moment().month(i).format('MMMM')}</h3>
                    <Calendar
                        localizer={localizer}
                        events={formattedEvents.filter(event => moment(event.start).month() === i)}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 250 }}
                        views={['month']}
                    />
                </Col>
            );
        }
        return (
            <Row style={{ display: 'flex', flexWrap: 'wrap' }}>
                {months}
            </Row>
        );
    };

    return (
        <Container>
            <Row>
                <h1>Lecturer Page</h1>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '20px',
                    }}
                >
                    {/* Navigation Sidebar */}
                    <Nav
                        defaultActiveKey="/home"
                        className="flex-column"
                        style={{
                            backgroundColor: 'lightblue',
                            padding: '20px 20px 610px',
                            borderRadius: '30px',
                            width: '250px',
                        }}
                    >
                        <Nav.Link href="/home">Home Page</Nav.Link>
                        <Nav.Link eventKey="link-1">Navigation2</Nav.Link>
                        <LogoutButton />
                    </Nav>

                    {/* Main Content */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            gap: '20px',
                        }}
                    >
                        {/* Notifications Section */}
                        <div
                            style={{
                                backgroundColor: 'lightblue',
                                padding: '40px 50px 40px',
                                borderRadius: '30px',
                                textAlign: 'center',
                            }}
                        >
                            <ToastContainer className="position-static" style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
                                <Toast>
                                    <Toast.Header>
                                        <strong className="me-auto">Urgent</strong>
                                        <small>1 min ago</small>
                                    </Toast.Header>
                                    <Toast.Body>You have a meeting today at 6:30 PM for subject CSEXXX.</Toast.Body>
                                </Toast>
                            </ToastContainer>
                        </div>

                        {/* Calendar Section */}
                        <div style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '30px' }}>
                            <div style={{ marginBottom: '20px' }}>
                                {/* Toggle Year View and Month View */}
                                <button onClick={() => setView(view === 'month' ? 'year' : 'month')}>
                                    Switch to {view === 'month' ? 'Year View' : 'Month View'}
                                </button>
                            </div>

                            {view === 'month' ? (
                                <Calendar
                                    localizer={localizer}
                                    events={formattedEvents}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: 500 }}
                                    views={['month', 'week', 'day', 'agenda']}
                                />
                            ) : (
                                renderYearView()
                            )}
                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    );
}

export default LecturerNotification;

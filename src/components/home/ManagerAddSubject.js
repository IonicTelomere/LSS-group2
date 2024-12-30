// Import required libraries
import React, { useState } from 'react';
import axios from 'axios';

const AddSubject = () => {
    const [subjectCode, setSubjectCode] = useState('');
    const [subjectName, setSubjectName] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        if (!subjectCode || !subjectName) {
            setMessage('Both Subject Code and Subject Name are required.');
            return;
        }

        try {
            // Post data to the API
            const response = await axios.post('http://localhost:5000/api/addsubject', {
                subjectCode,
                subjectName,
            });

            if (response.status === 200) {
                setMessage('Subject added successfully!');
                setSubjectCode(''); // Clear input fields
                setSubjectName('');
            } else {
                setMessage('Failed to add subject.');
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <h2>Add a New Subject</h2>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Subject Code:
                        <input
                            type="text"
                            value={subjectCode}
                            onChange={(e) => setSubjectCode(e.target.value)}
                            placeholder="Enter Subject Code"
                            required
                        />
                    </label>
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>
                        Subject Name:
                        <input
                            type="text"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                            placeholder="Enter Subject Name"
                            required
                        />
                    </label>
                </div>

                <button type="submit">Add Subject</button>
            </form>

            {message && <p style={{ color: 'blue', marginTop: '20px' }}>{message}</p>}
        </div>
    );
};

export default AddSubject;
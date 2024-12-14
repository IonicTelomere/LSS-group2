import React, { useState } from 'react';
import axios from 'axios';

function DataBase() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch the token from localStorage or your auth state
            const token = localStorage.getItem('authToken'); // Replace with your token retrieval logic
            const response = await axios.get('http://localhost:3000/api/lecturer-schedule', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(response.data); // Set the received data to state
        } catch (err) {
            setError('Error fetching data from the backend');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Data from Backend</h1>
            <button onClick={fetchData} disabled={loading}>
                {loading ? 'Loading...' : 'Fetch Data'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, i) => (
                                    <td key={i}>{JSON.stringify(value)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
}

export default DataBase;

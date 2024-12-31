import React, { useState } from "react";
import axios from "axios";

const AddSubject = () => {
  // State variables to manage subject code, subject name, and message
  const [subjectCode, setSubjectCode] = useState(""); 
  const [subjectName, setSubjectName] = useState("");
  const [message, setMessage] = useState(""); // Stores message content
  const [messageType, setMessageType] = useState(""); // Stores message type (success or error)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if both subject code and subject name are provided
    if (!subjectCode || !subjectName) {
      setMessage("Both Subject Code and Subject Name are required.");
      setMessageType("error"); // Set message type to error
      return; // Stop execution if fields are empty
    }

    try {
      // Send POST request to the backend API with subject data
      const response = await axios.post(
        "http://localhost:5000/api/addsubject",
        {
          subjectCode, // Pass subject code to the server
          subjectName, // Pass subject name to the server
        }
      );

      // Check if the request was successful (status code 200)
      if (response.status === 200) {
        setMessage("Subject added successfully!"); // Success message
        setMessageType("success"); // Set message type to success
        setSubjectCode(""); // Clear the input field for subject code
        setSubjectName(""); // Clear the input field for subject name
      } else {
        setMessage("Failed to add subject."); // Error message if response status is not 200
        setMessageType("error"); // Set message type to error
      }
    } catch (error) {
      // Catch any errors that occur during the request
      setMessage(`Error: ${error.message}`); // Display the error message
      setMessageType("error"); // Set message type to error
    }
  };

  // Dynamic styling based on message type
  const messageStyle = {
    color: messageType === "success" ? "green" : "red", // Green for success, red for error
    marginTop: "20px",
    fontWeight: "bold",
  };

  return (
    <div style={{ margin: "20px" }}>
      <h2>Add a New Subject</h2>

      {/* Form to input subject details */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>
            Subject Code:
            {/* Input field for subject code */}
            <input
              type="text"
              value={subjectCode} // Bind input value to state
              onChange={(e) => setSubjectCode(e.target.value)} // Update state on change
              placeholder="Enter Subject Code"
              required // Makes this field required
            />
          </label>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>
            Subject Name:
            {/* Input field for subject name */}
            <input
              type="text"
              value={subjectName} // Bind input value to state
              onChange={(e) => setSubjectName(e.target.value)} // Update state on change
              placeholder="Enter Subject Name"
              required // Makes this field required
            />
          </label>
        </div>

        {/* Button to submit the form */}
        <button type="submit">Add Subject</button>
      </form>

      {/* Display success or error message */}
      {message && <p style={messageStyle}>{message}</p>}
    </div>
  );
};

export default AddSubject;

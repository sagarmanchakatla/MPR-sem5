import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Meeting = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("username", username);
    navigate("/room"); // Navigate to the room route
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label
            htmlFor="username"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#28a745",
            color: "#fff",
            cursor: "pointer",
            width: "100%",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Meeting;

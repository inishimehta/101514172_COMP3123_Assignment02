import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    date_of_joining: "",
    department: "",
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!token) {
      setError("You must be logged in.");
      return;
    }

    try {
      // 1) create employee (JSON)
      const createRes = await axios.post(
        `${BASE_URL}/api/v1/emp/employees`,
        {
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          position: employee.position,
          salary: employee.salary,
          date_of_joining: employee.date_of_joining,
          department: employee.department,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newId = createRes.data.employee_id;

      // 2) if a file is selected, upload it
      if (file) {
        const formData = new FormData();
        formData.append("photo", file);

        await axios.post(
          `${BASE_URL}/api/v1/emp/employees/${newId}/photo`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      setMessage("Employee created successfully.");
      setTimeout(() => navigate("/employees"), 800);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create employee."
      );
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <br />
          <input
            type="text"
            name="first_name"
            value={employee.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>Last Name</label>
          <br />
          <input
            type="text"
            name="last_name"
            value={employee.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>Position</label>
          <br />
          <input
            type="text"
            name="position"
            value={employee.position}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>Salary</label>
          <br />
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>Date of Joining</label>
          <br />
          <input
            type="date"
            name="date_of_joining"
            value={employee.date_of_joining}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>Department</label>
          <br />
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginTop: "0.5rem" }}>
          <label>Profile Picture (optional)</label>
          <br />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Add Employee
        </button>
        <button
          type="button"
          style={{ marginLeft: "0.5rem", marginTop: "1rem" }}
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
}

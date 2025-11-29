import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

export default function UpdateEmployee() {
  const { id } = useParams(); // employee_id
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchEmployee = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/emp/employees/${id}`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        setEmployee(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load employee details."
        );
      }
    };

    fetchEmployee();
  }, [id, navigate, token]);

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

    try {
      // update basic fields
      await axios.put(
        `${BASE_URL}/api/v1/emp/employees/${id}`,
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
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );

      // upload photo if selected
      if (file) {
        const formData = new FormData();
        formData.append("photo", file);

        const res = await axios.post(
          `${BASE_URL}/api/v1/emp/employees/${id}/photo`,
          formData,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setEmployee((prev) => ({
          ...prev,
          photo_url: res.data.photo_url,
        }));
      }

      setMessage("Employee updated successfully.");
      setTimeout(() => navigate("/employees"), 800);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update employee."
      );
    }
  };

  if (!employee) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>Loading...</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Update Employee</h1>
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
            value={
              employee.date_of_joining
                ? employee.date_of_joining.substring(0, 10)
                : ""
            }
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
          <label>Profile Picture</label>
          <br />
          {employee.photo_url && (
            <img
              src={`${BASE_URL}${employee.photo_url}`}
              alt="profile"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                display: "block",
                marginBottom: "0.5rem",
              }}
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button type="submit" style={{ marginTop: "1rem" }}>
          Save Changes
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

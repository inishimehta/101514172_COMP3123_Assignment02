import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

export default function ViewEmployee() {
  const { id } = useParams(); // employee_id
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchEmployee = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/emp/employees/${id}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          }
        );
        setEmployee(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load employee details."
        );
      }
    };

    fetchEmployee();
  }, [id, navigate, token]);

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
      <h1>View Employee</h1>

      <p>
        <strong>First Name:</strong> {employee.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {employee.last_name}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Position:</strong> {employee.position}
      </p>
      <p>
        <strong>Salary:</strong> {employee.salary}
      </p>
      <p>
        <strong>Date of Joining:</strong>{" "}
        {employee.date_of_joining?.substring(0, 10)}
      </p>
      <p>
        <strong>Department:</strong> {employee.department}
      </p>

      {employee.photo_url && (
        <p>
          <strong>Profile Picture:</strong>
          <br />
          <img
            src={`${BASE_URL}${employee.photo_url}`}
            alt="profile"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              marginTop: "0.5rem",
            }}
          />
        </p>
      )}

      <button onClick={() => navigate(`/employees/update/${id}`)}>
        Go to Update
      </button>
      <button
        style={{ marginLeft: "0.5rem" }}
        onClick={() => navigate("/employees")}
      >
        Back to List
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

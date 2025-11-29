import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3001";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchEmployees = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/emp/employees`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        });
        setEmployees(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load employees. Please try again."
        );
      }
    };

    fetchEmployees();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/v1/emp/employees`, {
        params: { eid: id },
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      setEmployees((prev) => prev.filter((e) => e.employee_id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete employee."
      );
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const q = search.toLowerCase();
    return (
      emp.first_name.toLowerCase().includes(q) ||
      emp.last_name.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q) ||
      emp.position.toLowerCase().includes(q) ||
      emp.department.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Employee List</h1>
        <div>
          <button
            onClick={() => navigate("/employees/add")}
            style={{ marginRight: "1rem" }}
          >
            Add Employee
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
        <input
          type="text"
          placeholder="Search by name, email, position, department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "350px", padding: "4px" }}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <table border="1" cellPadding="8" style={{ marginTop: "0.5rem" }}>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.employee_id}>
              <td>{emp.first_name}</td>
              <td>{emp.last_name}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>
                <button
                  onClick={() => navigate(`/employees/view/${emp.employee_id}`)}
                  style={{ marginRight: "0.5rem" }}
                >
                  View
                </button>
                <button
                  onClick={() =>
                    navigate(`/employees/update/${emp.employee_id}`)
                  }
                  style={{ marginRight: "0.5rem" }}
                >
                  Update
                </button>
                <button onClick={() => handleDelete(emp.employee_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredEmployees.length === 0 && (
            <tr>
              <td colSpan="6">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

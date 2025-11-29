import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BASE_URL } from "../config";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchDept, setSearchDept] = useState("");
  const [searchPos, setSearchPos] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/v1/emp/employees`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          }
        );
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
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete employee."
      );
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const n = searchName.toLowerCase();
    const d = searchDept.toLowerCase();
    const p = searchPos.toLowerCase();
    const fullName = `${emp.first_name} ${emp.last_name}`.toLowerCase();

    return (
      (n === "" ||
        emp.first_name.toLowerCase().includes(n) ||
        emp.last_name.toLowerCase().includes(n) ||
        fullName.includes(n)) &&
      (d === "" || emp.department.toLowerCase().includes(d)) &&
      (p === "" || emp.position.toLowerCase().includes(p))
    );
  });

  // --- styles matching app theme ---
  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background:
      "radial-gradient(circle at top left, #1f2933 0, #020617 55%, #000000 100%)",
    color: "#f9fafb",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.75rem 2.5rem",
    borderBottom: "1px solid rgba(148, 163, 184, 0.25)",
    backdropFilter: "blur(8px)",
  };

  const brandStyle = {
    letterSpacing: "0.25em",
    fontSize: "0.95rem",
    fontWeight: 600,
  };

  const navRightStyle = {
    display: "flex",
    gap: "1rem",
    fontSize: "0.9rem",
  };

  const navLinkStyle = (active) => ({
    cursor: "pointer",
    color: active ? "#fbbf24" : "#e5e7eb",
    borderBottom: active ? "2px solid #fbbf24" : "2px solid transparent",
    paddingBottom: "0.15rem",
  });

  const mainStyle = {
    flex: 1,
    padding: "2rem 3rem",
  };

  const titleRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: 600,
  };

  const addBtnStyle = {
    padding: "0.55rem 1.1rem",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#020617",
    color: "#f9fafb",
    boxShadow: "0 0 0 1px rgba(148,163,184,0.4)",
    cursor: "pointer",
    fontSize: "0.9rem",
  };

  const searchRowStyle = {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
  };

  const searchInputWrapper = {
    flex: 1,
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.6)",
    backgroundColor: "rgba(15,23,42,0.9)",
    padding: "0.35rem 0.8rem",
  };

  const searchInputStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#f9fafb",
    fontSize: "0.9rem",
  };

  const errorBoxStyle = {
    marginBottom: "0.75rem",
    padding: "0.55rem 0.75rem",
    borderRadius: "10px",
    backgroundColor: "rgba(248, 113, 113, 0.08)",
    color: "#fecaca",
    border: "1px solid rgba(248, 113, 113, 0.5)",
    fontSize: "0.85rem",
  };

  const tableWrapperStyle = {
    marginTop: "0.5rem",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 18px 45px rgba(0,0,0,0.7)",
    border: "1px solid rgba(30,64,175,0.4)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "rgba(15,23,42,0.98)",
  };

  const thStyle = {
    textAlign: "left",
    padding: "0.75rem 1rem",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#9ca3af",
    borderBottom: "1px solid rgba(31,41,55,1)",
    backgroundColor: "rgba(15,23,42,1)",
  };

  const tdStyle = {
    padding: "0.75rem 1rem",
    borderBottom: "1px solid rgba(31,41,55,1)",
    fontSize: "0.9rem",
  };

  const rowStyle = {
    cursor: "default",
  };

  const actionBtnStyle = (color) => ({
    border: "none",
    borderRadius: "999px",
    padding: "0.25rem 0.65rem",
    marginRight: "0.35rem",
    fontSize: "0.8rem",
    cursor: "pointer",
    backgroundColor: color,
    color: "#0b1120",
  });

  const photoCircleStyle = {
    width: "36px",
    height: "36px",
    borderRadius: "999px",
    background:
      "linear-gradient(135deg, #1f2937, #020617)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#e5e7eb",
    fontWeight: 600,
    fontSize: "0.85rem",
    overflow: "hidden",
  };

  const logoutBtnStyle = {
    cursor: "pointer",
    background: "transparent",
    border: "none",
    color: "#f97373",
    fontSize: "0.9rem",
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div style={brandStyle}>EMPLOYEE MANAGER</div>
        <div style={navRightStyle}>
          <span
            style={navLinkStyle(true)}
            onClick={() => navigate("/employees")}
          >
            Employees
          </span>
          <button style={logoutBtnStyle} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main style={mainStyle}>
        <div style={titleRowStyle}>
          <h1 style={titleStyle}>Employees</h1>
          <button
            style={addBtnStyle}
            onClick={() => navigate("/employees/add")}
          >
            + Add Employee
          </button>
        </div>

        <div style={searchRowStyle}>
          <div style={searchInputWrapper}>
            <input
              type="text"
              placeholder="Name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              style={searchInputStyle}
            />
          </div>
          <div style={searchInputWrapper}>
            <input
              type="text"
              placeholder="Department"
              value={searchDept}
              onChange={(e) => setSearchDept(e.target.value)}
              style={searchInputStyle}
            />
          </div>
          <div style={searchInputWrapper}>
            <input
              type="text"
              placeholder="Position"
              value={searchPos}
              onChange={(e) => setSearchPos(e.target.value)}
              style={searchInputStyle}
            />
          </div>
        </div>

        {error && <div style={errorBoxStyle}>{error}</div>}

        <div style={tableWrapperStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Photo</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Department</th>
                <th style={thStyle}>Position</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((emp) => (
                <tr key={emp.employee_id} style={rowStyle}>
                  <td style={tdStyle}>
                    <div style={photoCircleStyle}>
                      {emp.photo_url ? (
                        <img
                          src={`${BASE_URL}${emp.photo_url}`}
                          alt="profile"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      ) : (
                        (emp.first_name?.[0] || "?").toUpperCase()
                      )}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    {emp.first_name} {emp.last_name}
                  </td>
                  <td style={tdStyle}>{emp.email}</td>
                  <td style={tdStyle}>{emp.department}</td>
                  <td style={tdStyle}>{emp.position}</td>
                  <td style={tdStyle}>
                    <button
                      style={actionBtnStyle("#e5e7eb")}
                      onClick={() =>
                        navigate(`/employees/view/${emp.employee_id}`)
                      }
                    >
                      View
                    </button>
                    <button
                      style={actionBtnStyle("#facc15")}
                      onClick={() =>
                        navigate(`/employees/update/${emp.employee_id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      style={actionBtnStyle("#fca5a5")}
                      onClick={() => handleDelete(emp.employee_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td style={tdStyle} colSpan="6">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { BASE_URL } from "../config";

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

  const mainStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "520px",
    background:
      "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.98))",
    borderRadius: "18px",
    padding: "2.4rem 2.7rem",
    boxShadow:
      "0 18px 45px rgba(0,0,0,0.75), 0 0 0 1px rgba(148, 163, 184, 0.20)",
    border: "1px solid rgba(252, 211, 77, 0.20)",
  };

  const titleStyle = {
    fontSize: "1.8rem",
    fontWeight: 600,
    marginBottom: "0.25rem",
  };

  const subtitleStyle = {
    fontSize: "0.9rem",
    color: "#9ca3af",
    marginBottom: "1.5rem",
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.55rem",
    fontSize: "0.95rem",
  };

  const labelStyle = {
    fontWeight: 500,
    color: "#9ca3af",
  };

  const valueStyle = {
    textAlign: "right",
  };

  const avatarWrapperStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1.2rem",          
    marginBottom: "1.5rem",
  };

  const avatarCircleStyle = {
    width: "146px",          
    height: "146px",         
    borderRadius: "999px",
    background:
      "linear-gradient(135deg, #1f2937, #020617)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#e5e7eb",
    fontWeight: 600,
    fontSize: "1.5rem",
    overflow: "hidden",
  };


  const buttonRowStyle = {
    display: "flex",
    gap: "0.75rem",
    marginTop: "1.4rem",
  };

  const primaryBtnStyle = {
    flex: 1,
    padding: "0.6rem 0.75rem",
    borderRadius: "999px",
    border: "none",
    backgroundImage:
      "linear-gradient(to right, #facc15, #f59e0b)",
    color: "#111827",
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
  };

  const secondaryBtnStyle = {
    flexBasis: "35%",
    padding: "0.6rem 0.75rem",
    borderRadius: "999px",
    border: "1px solid rgba(148,163,184,0.6)",
    backgroundColor: "transparent",
    color: "#e5e7eb",
    fontWeight: 500,
    fontSize: "0.9rem",
    cursor: "pointer",
  };

  const errorBoxStyle = {
    marginTop: "0.9rem",
    padding: "0.55rem 0.75rem",
    borderRadius: "10px",
    backgroundColor: "rgba(248, 113, 113, 0.08)",
    color: "#fecaca",
    border: "1px solid rgba(248, 113, 113, 0.5)",
    fontSize: "0.85rem",
  };

  if (!employee) {
    return (
      <div style={pageStyle}>
        <header style={headerStyle}>
          <div style={brandStyle}>EMPLOYEE MANAGER</div>
        </header>
        <main style={mainStyle}>
          <div style={cardStyle}>
            <p>Loading...</p>
            {error && <div style={errorBoxStyle}>{error}</div>}
          </div>
        </main>
      </div>
    );
  }

  const fullName = `${employee.first_name} ${employee.last_name}`;
  const joinedDate =
    employee.date_of_joining?.substring(0, 10) || "";

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div style={brandStyle}>EMPLOYEE MANAGER</div>
      </header>

      <main style={mainStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Employee Details</h1>
          <p style={subtitleStyle}>
            Overview of the selected employee&apos;s information.
          </p>

          <div style={avatarWrapperStyle}>
            <div style={avatarCircleStyle}>
              {employee.photo_url ? (
                <img
                  src={`${BASE_URL}${employee.photo_url}`}
                  alt="profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                (employee.first_name?.[0] || "?").toUpperCase()
              )}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                {fullName}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
                {employee.position} • {employee.department}
              </div>
            </div>
          </div>

          <div style={rowStyle}>
            <span style={labelStyle}>Email</span>
            <span style={valueStyle}>{employee.email}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Position</span>
            <span style={valueStyle}>{employee.position}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Department</span>
            <span style={valueStyle}>{employee.department}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Salary</span>
            <span style={valueStyle}>{employee.salary}</span>
          </div>
          <div style={rowStyle}>
            <span style={labelStyle}>Date of Joining</span>
            <span style={valueStyle}>{joinedDate}</span>
          </div>

          <div style={buttonRowStyle}>
            <button
              style={primaryBtnStyle}
              onClick={() => navigate(`/employees/update/${id}`)}
            >
              Edit Employee
            </button>
            <button
              style={secondaryBtnStyle}
              onClick={() => navigate("/employees")}
            >
              Back to List
            </button>
          </div>

          {error && <div style={errorBoxStyle}>{error}</div>}
        </div>
      </main>
    </div>
  );
}

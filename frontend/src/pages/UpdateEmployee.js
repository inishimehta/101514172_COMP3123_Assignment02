import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { BASE_URL } from "../config";

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

    if (Number(employee.salary) <= 0) {
      setError("Salary must be greater than 0.");
      return;
    }

    try {
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
    maxWidth: "540px",
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

  const labelStyle = {
    fontSize: "0.8rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#9ca3af",
  };

  const rowStyle = {
    display: "flex",
    gap: "0.75rem",
    marginTop: "0.85rem",
  };

  const fieldColStyle = {
    flex: 1,
  };

  const inputWrapperStyle = {
    marginTop: "0.2rem",
    borderRadius: "10px",
    border: "1px solid rgba(148,163,184,0.5)",
    backgroundColor: "rgba(15,23,42,0.9)",
    padding: "0.35rem 0.6rem",
  };

  const inputStyle = {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#f9fafb",
    fontSize: "0.95rem",
    padding: "0.35rem 0.15rem 0.45rem",
  };

  const avatarPreviewStyle = {
    width: "96px",
    height: "96px",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "0.5rem",
    marginBottom: "0.35rem",
    background:
      "linear-gradient(135deg, #1f2937, #020617)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#e5e7eb",
    fontWeight: 600,
    fontSize: "1.4rem",
  };

  const fileInputStyle = {
    marginTop: "0.25rem",
    fontSize: "0.85rem",
    color: "#e5e7eb",
  };

  const buttonRowStyle = {
    display: "flex",
    gap: "0.75rem",
    marginTop: "1.3rem",
  };

  const primaryBtnStyle = {
    flex: 1,
    padding: "0.65rem 0.75rem",
    borderRadius: "999px",
    border: "none",
    backgroundImage:
      "linear-gradient(to right, #facc15, #f59e0b)",
    color: "#111827",
    fontWeight: 600,
    fontSize: "0.95rem",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(250, 204, 21, 0.35)",
  };

  const secondaryBtnStyle = {
    flexBasis: "35%",
    padding: "0.65rem 0.75rem",
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

  const messageBoxStyle = {
    marginTop: "0.9rem",
    padding: "0.55rem 0.75rem",
    borderRadius: "10px",
    backgroundColor: "rgba(34,197,94,0.08)",
    color: "#bbf7d0",
    border: "1px solid rgba(34,197,94,0.6)",
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

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div style={brandStyle}>EMPLOYEE MANAGER</div>
      </header>

      <main style={mainStyle}>
        <div style={cardStyle}>
          <h1 style={titleStyle}>Update Employee</h1>
          <p style={subtitleStyle}>
            Edit the details for this employee and update their profile
            picture.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={rowStyle}>
              <div style={fieldColStyle}>
                <label style={labelStyle}>First Name</label>
                <div style={inputWrapperStyle}>
                  <input
                    type="text"
                    name="first_name"
                    value={employee.first_name}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
              <div style={fieldColStyle}>
                <label style={labelStyle}>Last Name</label>
                <div style={inputWrapperStyle}>
                  <input
                    type="text"
                    name="last_name"
                    value={employee.last_name}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={rowStyle}>
              <div style={fieldColStyle}>
                <label style={labelStyle}>Email</label>
                <div style={inputWrapperStyle}>
                  <input
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={rowStyle}>
              <div style={fieldColStyle}>
                <label style={labelStyle}>Position</label>
                <div style={inputWrapperStyle}>
                  <input
                    type="text"
                    name="position"
                    value={employee.position}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
              <div style={fieldColStyle}>
                <label style={labelStyle}>Department</label>
                <div style={inputWrapperStyle}>
                  <input
                    type="text"
                    name="department"
                    value={employee.department}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={rowStyle}>
              <div style={fieldColStyle}>
                <label style={labelStyle}>Salary</label>
                <div style={inputWrapperStyle}>
                  <input
                    type="number"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
              <div style={fieldColStyle}>
                <label style={labelStyle}>Date of Joining</label>
                <div style={inputWrapperStyle}>
                  <input
                    type="date"
                    name="date_of_joining"
                    value={
                      employee.date_of_joining
                        ? employee.date_of_joining.substring(0, 10)
                        : ""
                    }
                    onChange={handleChange}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={rowStyle}>
              <div style={fieldColStyle}>
                <label style={labelStyle}>Profile Picture</label>
                <div style={avatarPreviewStyle}>
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
                <input
                  type="file"
                  accept="image/*"
                  style={fileInputStyle}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            <div style={buttonRowStyle}>
              <button type="submit" style={primaryBtnStyle}>
                Save Changes
              </button>
              <button
                type="button"
                style={secondaryBtnStyle}
                onClick={() => navigate("/employees")}
              >
                Cancel
              </button>
            </div>
          </form>

          {error && <div style={errorBoxStyle}>{error}</div>}
          {message && <div style={messageBoxStyle}>{message}</div>}
        </div>
      </main>
    </div>
  );
}

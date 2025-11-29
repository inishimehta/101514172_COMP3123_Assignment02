const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();

// Get all employees
router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(
      employees.map(emp => ({
        employee_id: emp._id,
        first_name: emp.first_name,
        last_name: emp.last_name,
        email: emp.email,
        position: emp.position,
        salary: emp.salary,
        date_of_joining: emp.date_of_joining,
        department: emp.department
      }))
    );
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// Create employee
router.post("/employees", async (req, res) => {
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.status(201).json({
      message: "Employee created successfully.",
      employee_id: emp._id
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

// Get by ID
router.get("/employees/:eid", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.eid);
    if (!emp)
      return res.status(404).json({ status: false, message: "Employee not found" });
    res.status(200).json({
      employee_id: emp._id,
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      position: emp.position,
      salary: emp.salary,
      date_of_joining: emp.date_of_joining,
      department: emp.department
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

// Update by ID
router.put("/employees/:eid", async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!emp)
      return res.status(404).json({ status: false, message: "Employee not found" });
    res.status(200).json({ message: "Employee details updated successfully." });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

// Delete by ID (query param)
router.delete("/employees", async (req, res) => {
  const { eid } = req.query;
  try {
    await Employee.findByIdAndDelete(eid);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
});

module.exports = router;

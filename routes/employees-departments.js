var express = require("express");
var router = express.Router();

const employees = require("../data/employees.json");
const departments = require("../data/departments.json");

// Get  all employees information
router.get("/employees", (req, res, next) => {
  res.status(200).json(employees);
});

// add a new employee
router.post("/employees", (req, res, next) => {
  const newEmployee = req.body;
  employees.push(newEmployee);
  res
    .status(200)
    .json({ message: "Employee added successfully", employee: newEmployee });
});

// effect change on all rows in employee table
router.put("/employees", (req, res, next) => {
  const updatedEmployees = req.body;
  employees = updatedEmployees;
  res
    .status(200)
    .json({
      message: "All employees updated successfully",
      employees: updatedEmployees,
    });
});

// delete the entire employee data
router.delete("/employees", (req, res, next) => {
  employees.length = 0;
  res.status(200).json({ message: "All employees have been deleted" });
});

// get a particular employee given its Id
router.get("/employees/:employeeId", (req, res, next) => {
  const employeeId = parseInt(req.params.employeeId);
  res.status(200).json(employees[employeeId]);
});

//Update a particular employees information given its id
router.put("/employees/:employeeId", (req, res, next) => {
  const updatedEmployee = req.body;
  const employeeId = parseInt(req.params.employeeId);
  employees[employeeId] = updatedEmployee;

  res
    .status(200)
    .json({
      message: "Employee updated successfully",
      employee: employees[employeeId],
    });
});

//Delete a particular employee by id
router.delete("/employees/:employeeId", (req, res, next) => {
    const employeeId = parseInt(req.params.employeeId);
    const deletedEmployee = employees.splice(employeeId, 1)
    res
    .status(200)
    .json({
      message: "Employee deleted successfully",
      deletedEmployee: deletedEmployee,
    });
});

//Get all departments an employee belongs to
router.get("/employees/:employeeId/departments", (req, res, next) => {
    const employeeId = parseInt(req.params.employeeId)
    const employee = employees[employeeId];
    const department  = departments.find((department) => department.id === employee.department_id)
    res.status(200).json(department);
});

//Delete all  departments an employee may belong to
router.delete("/employees/:employeeId/departments", (req, res, next) => {
    const employeeId = parseInt(req.params.employeeId)
    const employee = employees[employeeId];
    employee.department_id = null;
    res.status(200).json({
        message: "Employee's department deleted successfully"
    })
});

/* 
router.post("/customers/:customerId/orders", (req, res, next) => {
  res.status(200).json(data);
});
router.put("/customers/:customerId/orders", (req, res, next) => {
  res.status(200).json(data);
});

router.get("/customers/:customerId/orders/:orderId", (req, res, next) => {
  res.status(200).json(data);
});

router.put("/customers/:customerId/orders/:orderId", (req, res, next) => {
  res.status(200).json(data);
});

router.delete("/customers/:customerId/orders/:orderId", (req, res, next) => {
  res.status(200).json(data);
});
 */
import { Router } from "express";
import {
  getEmployee,
  createEmployee,
  updateEmployee,
  removeEmployee,
  getEmployees,
} from "../controllers/employees.controllers.js";

const router = Router();

router.get("/employees", getEmployees);

router.get("/employees/edit/:id", getEmployee);

router.post("/employees", createEmployee);

router.put("/employees/edit/:id", updateEmployee);

router.delete("/employees/edit/:id", removeEmployee);

export default router;

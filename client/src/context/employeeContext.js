import { createContext, useContext, useEffect, useState } from "react";
import {
  getEmployeesRequest,
  deleteEmployeeRequest,
  createEmployeeRequest,
  getEmployeeRequest,
  updateEmployeeRequest,
} from "../api/employees";

const employeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(employeeContext);
  if (!context) throw new Error("Employee Provider is missing");
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getEmployeesRequest();
      setEmployees(res.data);
    })();
  }, []);

  const deleteEmployee = async (id) => {
    const res = await deleteEmployeeRequest(id);
    if (res.status === 204) {
      setEmployees(employees.filter((Employee) => Employee._id !== id));
    }
  };

  const createEmployee = async (employee) => {
    try {
      const res = await createEmployeeRequest(employee);
      setEmployees([...employees, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const getEmployee = async (id) => {
    try {
      const res = await getEmployeeRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEmployee = async (id, employee) => {
    try {
      const res = await updateEmployeeRequest(id, employee);
      setEmployees(employees.map((employee) => (employee._id === id ? res.data : employee)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <employeeContext.Provider
      value={{ employees, deleteEmployee, createEmployee, getEmployee, updateEmployee }}
    >
      {children}
    </employeeContext.Provider>
  );
};

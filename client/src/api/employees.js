import axios from "axios";

export const getEmployeesRequest = async () =>
  await axios.get("/api/employees");

export const getEmployeeRequest = async (id) =>
  await axios.get("/api/employees/edit/" + id);

export const deleteEmployeeRequest = async (id) =>
  await axios.delete("/api/employees/edit/" + id);

export const createEmployeeRequest = async (employee) => {
  const form = new FormData();
  for (let key in employee) {
    form.append(key, employee[key]);
  }

  return await axios.post("/api/employees", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateEmployeeRequest = async (id, newEmployeeFields) => {
  const form = new FormData();
  for (let key in newEmployeeFields) {
    form.append(key, newEmployeeFields[key]);
  }
  return axios.put("/api/employees/edit/" + id, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

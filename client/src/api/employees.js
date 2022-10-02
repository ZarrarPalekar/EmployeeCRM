import axios from "axios";

export const getEmployeesRequest = async () =>
  await axios.get("/api/employees");

export const getEmployeeRequest = async (id) =>
  await axios.get("/api/employees/edit/" + id);

export const deleteEmployeeRequest = async (id) =>
  await axios.delete("/api/employees/edit/" + id);

export const createEmployeeRequest = async (employee) => {
  console.log("2 pzj: ", employee);
  const form = new FormData();
  for (let key in employee) {
    console.log("key pzj: ", key);
    console.log("employee[key] pzj: ", employee[key]);
    form.append(key, employee[key]);
    console.log("3 pzj: ", form);
  }

  for (var key of form.entries()) {
    console.log(key[0] + ', ' + key[1]);
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

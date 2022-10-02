import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useEmployees } from "../context/employeeContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect, useState } from "react";
import "./styles.css";

export function EmployeeForm() {
  const { createEmployee, getEmployee, updateEmployee } = useEmployees();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    age: "",
    email: "",
    dob: "",
    address: "",
    image: null,
  });
  const params = useParams();

  useEffect(() => {
    (async () => {
      if (params.id) {
        const employee = await getEmployee(params.id);
        let dateOfBirth = "";
        if (employee.dob)
          dateOfBirth = employee.dob.substr(0, employee.dob.indexOf("T"));
        setEmployee({
          name: employee.name,
          age: employee.age ? employee.age : "",
          email: employee.email,
          dob: dateOfBirth,
          address: employee.address,
        });
      }
    })();
  }, [params.id, getEmployee]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New Employee</h3>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <Link to="/">Go Back</Link>
          </button>
        </header>
        <Formik
          initialValues={employee}
          enableReinitialize
          validationSchema={Yup.object({
            name: Yup.string().required("Name is Required"),
            age: Yup.number().min(18),
            email: Yup.string().email().required("Email is Required"),
            // image: Yup.mixed().required("The image required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updateEmployee(params.id, values);
            } else {
              await createEmployee(values);
            }
            actions.resetForm();
            actions.setSubmitting(false);
            navigate("/");
          }}
        >
          {({ setFieldValue, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="name"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Employee Name
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                placeholder="Employee name"
                name="name"
                // autoFocus
              />
              <ErrorMessage
                component="p"
                name="name"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="age"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Employee Age
              </label>
              <Field
                name="age"
                id="age"
                placeholder="Enter a age"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
              />
              <ErrorMessage
                component="p"
                name="age"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="email"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Employee Email
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                placeholder="Employee email"
                name="email"
                // autoFocus
              />
              <ErrorMessage
                component="p"
                name="email"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="dob"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Employee Birth Date
              </label>
              <Field name="dob">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => (
                  <div>
                    <input
                      className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                      type="date"
                      name="dob"
                      id="dob"
                      {...field}
                    />
                    {meta.touched && meta.error && (
                      <div className="error">{meta.error}</div>
                    )}
                  </div>
                )}
              </Field>

              <ErrorMessage
                component="p"
                name="dob"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="address"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Employee address
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                placeholder="Employee address"
                name="address"
                // autoFocus
              />
              <ErrorMessage
                component="p"
                name="address"
                className="text-red-400 text-sm"
              />

              <label
                htmlFor="image"
                className="text-sm block font-bold mb-2 text-gray-400"
              >
                Image
              </label>
              <input
                type="file"
                name="image"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />
              <ErrorMessage
                component="p"
                name="image"
                className="text-red-400 text-sm"
              />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                ) : (
                  "save"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

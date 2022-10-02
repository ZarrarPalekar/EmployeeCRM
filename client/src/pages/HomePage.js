import { useEmployees } from "../context/employeeContext";
import { Link } from "react-router-dom";
import { EmployeeCard } from "../components/EmployeeCard";
import { VscEmptyWindow } from "react-icons/vsc";

export function HomePage() {
  const { employees } = useEmployees();

  const renderEmployee = () => {
    if (employees.length === 0)
      return (
        <div className="flex flex-col justify-center items-center">
          <VscEmptyWindow className="w-48 h-48 text-white" />
          <h1 className="text-white text-2xl">There are no employees</h1>
        </div>
      );

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {employees.map((emp) => (
          <EmployeeCard key={emp._id} employee={emp} />
        ))}
      </div>
    );
  };

  return (
    <main>
      <header className="flex justify-between items-center my-4">
        <h1 className="text-2xl text-gray-300 font-bold">
          Employees ({employees.length})
        </h1>
        <Link
          to="/new"
          className="bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          Create Employee
        </Link>
      </header>

      {renderEmployee()}
    </main>
  );
}

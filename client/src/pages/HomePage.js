import { useEmployees } from "../context/employeeContext";
import { Link } from "react-router-dom";
import { EmployeeCard } from "../components/EmployeeCard";
import { VscPersonAdd } from "react-icons/vsc";

export function HomePage() {
  const { employees } = useEmployees();

  const renderEmployee = () => {
    if (employees.length === 0)
      return (
        <div className="flex flex-col justify-center items-center">
          <VscPersonAdd className="w-48 h-48 text-black" />
          <h1 className="text-black text-2xl">There are no employees</h1>
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
      <header className="flex justify-between items-center mb-20">
        <h1 className="text-2xl text-black-300 font-bold">
          Employees ({employees.length})
        </h1>
        <Link
          to="/new"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Employee
        </Link>
      </header>

      {renderEmployee()}
    </main>
  );
}

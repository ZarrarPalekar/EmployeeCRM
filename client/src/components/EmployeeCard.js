import toast from "react-hot-toast";
import { useEmployees } from "../context/employeeContext";
import { useNavigate } from "react-router-dom";

export function EmployeeCard({ employee }) {
  const { deleteEmployee } = useEmployees();
  const navigate = useNavigate();

  const handleDelete = (name, id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Do you want to delete employee <strong>{name}</strong>?
          </p>
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
              onClick={(e) => {
                deleteEmployee(id);
                toast.dismiss(t.id);
              }}
            >
              Delete
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: "4000",
        style: {
          background: "#202020"
        }
      }
    );
  };
  return (
    <div
      className="bg-zinc-800 text-white rounded-md shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => navigate(`/edit/${employee._id}`)}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold">{employee.name}</h3>
          <button
            className="bg-red-600 text-sm px-2 py-1 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(employee.name, employee._id);
            }}
          >
            Delete
          </button>
        </div>
        <p className="text-gray-400">{employee.email}</p>
      </div>
      {employee.image && <img src={employee.image.url} alt={employee.name} />}
    </div>
  );
}

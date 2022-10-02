import { Routes, Route } from "react-router-dom";
import { HomePage, NotFoundPage, EmployeeForm } from "./pages";
import { EmployeeProvider } from "./context/employeeContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center">
      <div className="px-10 container m-auto py-4">
        <EmployeeProvider>
          <Routes>     
            <Route path="/new" element={<EmployeeForm />} />
            <Route path="/edit/:id" element={<EmployeeForm />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Toaster />
        </EmployeeProvider>
      </div>
    </div>
  );
}

export default App;

import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <>
      <h1 style={{ color: "white", marginBottom: "10px" }}>404 Not Found!</h1>{" "}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link to="/">Go Back</Link>
      </button>
    </>
  );
}

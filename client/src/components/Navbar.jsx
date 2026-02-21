import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-full transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ExpertBook
        </Link>

        <div className="flex gap-3">
          <Link to="/" className={linkClass("/")}>
            Experts
          </Link>

          <Link to="/my-bookings" className={linkClass("/my-bookings")}>
            My Bookings
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

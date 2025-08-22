import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Navbar() {
  return (
    <header className="navbar bg-gray-800">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* HobbyHub Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 flex-shrink-0 hobbyhub-logo-button"
        >
          <div className="hh-icon gradient-text text-white font-bold text-xl">
            HH
          </div>
          <span className="font-alumniSans text-[23px] font-normal text-white">
            HobbyHub
          </span>
        </Link>

        <nav className="flex items-center text-muted-foreground text-sm font-medium space-x-6">
          <Link to="/food" className="hover:text-white transition-colors">
            Food
          </Link>
          <Link to="/travel" className="hover:text-white transition-colors">
            Travel
          </Link>
          <Link to="/workout" className="hover:text-white transition-colors">
            Workout
          </Link>
        </nav>

        <div className="flex-shrink-0">
          <Link
            to="/dashboard"
            className="dashboard-button flex items-center space-x-2 px-4 py-2 text-sm rounded-lg transition-colors bg-green-600 hover:bg-green-700 text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

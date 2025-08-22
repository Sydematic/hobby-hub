import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./components/ui/card";
import { useAuth } from "./AuthContext";
import './travel.css';

export default function TravelPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleProtectedClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login", { state: { from: path } });
    }
  };

  const travelCards = [
    {
      title: "Destinations",
      desc: "Explore beautiful places around the world.",
      path: "/destinations"
    },
    {
      title: "Tips & Tricks",
      desc: "Plan your trips better with useful travel tips.",
      path: "/tips"
    },
    {
      title: "Travel Deals",
      desc: "Find the best deals for flights and hotels.",
      path: "/deals"
    }
  ];

  return (
    <div className="travel-page">

      {/* Navbar */}
      <header className="travel-header">
        <div className="travel-header-inner">
          <Link to="/" className="logo-link">
            <div className="logo gradient-text">HH</div>
            <span className="logo gradient-text">HobbyHub</span>
          </Link>

          <nav className="travel-nav">
            <Link to="/food" className="nav-link">Food</Link>
            <Link to="/travel" className="nav-link active">Travel</Link>
            <Link to="/workout" className="nav-link">Workout</Link>
          </nav>

          <Link
            to="/dashboard"
            className="travel-dashboard-btn flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="travel-hero-section">
        <div className="travel-hero-background"></div>
        <div className="travel-hero-container">
       <h1 className="travel-hero-title">
  Travel & <span className="travel-hero-title-dark">Adventures</span>
</h1>
  <p className="travel-hero-subtitle">
            Discover exciting destinations, tips, and the best travel deals around the world.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="travel-main">
        <div className="travel-page-container">
          <div className="travel-cards-container">
            {travelCards.map((card, idx) => (
              <Card key={idx} className="travel-card">
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{card.desc}</p>
                </CardContent>
              <CardFooter className="travel-card-footer">
  <button
    onClick={() => handleProtectedClick(card.path)}
    className="travel-card-button"
  >
    See More
  </button>
</CardFooter>

              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

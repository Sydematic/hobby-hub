import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./components/ui/card";
import { useAuth } from "./AuthContext";
import "./Travel.css";

export default function TravelPage() {
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState(null);

  const modalVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: 50, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } },
  };

  const travelCards = [
    { title: "Destinations", desc: "Explore beautiful places around the world.", key: "destinations" },
    { title: "Tips & Tricks", desc: "Plan your trips better with useful travel tips.", key: "tips" },
    { title: "Travel Deals", desc: "Find the best deals for flights and hotels.", key: "deals" },
  ];

  const imageStyle = { width: "400px", height: "250px", objectFit: "cover", borderRadius: "0.5rem", marginBottom: "0.75rem" };

  return (
    <div className="travel-page">
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
          <Link to="/dashboard" className="travel-dashboard-btn flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </header>

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
                    onClick={() => {
                      if (user) setActiveModal(card.key);
                      else setActiveModal("loginRequired");
                    }}
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

    <AnimatePresence>
  {activeModal && (
    <motion.div
      className="absolute top-0 left-0 w-full h-full bg-black/50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setActiveModal(null)}
    >
      <div className="travel-page-container mx-auto flex justify-center items-start pt-20">
        <motion.div
          className="bg-white rounded-2xl shadow-lg relative w-[420px] p-6"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setActiveModal(null)}
            className="absolute top-3 right-3 text-gray-500 hover:text-black"
          >
            ✖
          </button>

          {/* Modal content */}
          {activeModal === "destinations" && (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Top Destinations 🌍</h2>
              <img
                src="https://www.planetware.com/photos-large/F/france-paris-eiffel-tower.jpg"
                alt="Paris"
                style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "10px", marginBottom: "15px" }}
              />
              <p>Discover stunning beaches, mountains, and cities waiting for you.</p>
            </div>
          )}

          {activeModal === "tips" && (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Travel Tips ✈️</h2>
              <img
                src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"
                alt="Travel Tips"
                style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "10px", marginBottom: "15px" }}
              />
              <p>Pack light, stay flexible, and always carry local currency.</p>
            </div>
          )}

          {activeModal === "deals" && (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Best Travel Deals 💸</h2>
              <img
                src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg"
                alt="Travel Deals"
                style={{ width: "100%", maxHeight: "250px", objectFit: "cover", borderRadius: "10px", marginBottom: "15px" }}
              />
              <p>Save big on flights and hotels with our exclusive deals.</p>
            </div>
          )}

          {activeModal === "loginRequired" && (
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">Login Required 🔐</h2>
              <p>You must be logged in to view more details.</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}

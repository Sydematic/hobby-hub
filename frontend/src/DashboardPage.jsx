import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Compass, Users, Calendar, Star, Dumbbell, Utensils } from "lucide-react";
import supabase from "./client"; // ✅ Supabase client
import './style.css';
import './Dashboard.css';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [user, setUser] = useState(null); // Supabase user
  const navigate = useNavigate();

  // Load Supabase session on mount
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });
    };

    getSession();
  }, []);

  // handle form inputs
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // logout
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      navigate("/login");
    } else {
      console.error("Logout failed:", error.message);
    }
  };

  // submit form
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  }

  return (
    <div className="flex flex-col min-h-screen w-full bg-background text-foreground font-sans">

      {/* Navbar */}
      <header className="navbar">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="hh-icon gradient-text">HH</div>
            <span className="font-alumniSans text-[23px] font-normal gradient-text">
              HobbyHub
            </span>
          </Link>

          <nav className="flex items-center text-muted-foreground text-sm font-medium">
            <Link to="/food" className="hover:text-foreground transition-colors">Food</Link>
            <Link to="/travel" className="hover:text-foreground transition-colors">Travel</Link>
            <Link to="/workout" className="hover:text-foreground transition-colors">Workout</Link>
          </nav>

          {/* Conditional Get Started / Logout Button */}
          {user ? (
            <Button className="get-started-btn" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button className="get-started-btn">
              <Link to="/signup">Get Started</Link>
            </Button>
          )}
        </div>

        {/* Welcome Message */}
        <section className="welcome w-full py-6 text-center">
          <h1 className="text-2xl font-semibold">
            Welcome {user ? user.email : "Guest"}!
          </h1>
        </section>
      </header>

      {/* Hero Section */}
      <main className="flex-1 w-full">
        <section className="hero-section">
          <div className="hero-background"></div>
          <div className="hero-container">
            <h1 className="hero-title">
              Your Hobbies, <span className="gradient-text">Organized</span>
            </h1>
            <p className="hero-subtitle">
              Track your travels and adventures all in one place. Plan better,
              achieve more, and never lose track of your passions.
            </p>

            <div className="hero-buttons">
              <Button size="lg" className="hero-btn-primary-dp" asChild>
                <Link to="/signup">
                  Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="hero-btn-outline-dp" asChild>
                <Link to="/aboutus">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24">
          <div className="max-w-5xl mx-auto px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-[96px] font-alumniSans font-bold mb-2 text-gray-900">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-600 relative" style={{ top: "-3rem", lineHeight: "1.4" }}>
                Comprehensive tools to manage and enhance your favorite hobbies
              </p>
            </div>

            <div className="flex justify-between items-center px-16 mx-auto max-w-5xl">
              {/* Food Card */}
              <Card style={{ background: "linear-gradient(to bottom right, #fff7ed, #fee2e2)" }}
                    className="min-w-[350px] max-w-sm h-[400px] shadow-lg border-0 hover:shadow-xl transition-all duration-300 rounded-xl p-6 flex flex-col justify-between card-food">
                <CardHeader className="pt-8 pb-6">
                  <div className="flex justify-between items-center">
                    <Utensils className="h-8 w-8 -translate-y-2.5 text-orange-600" />
                    <div className="right-icon-circle flex items-center justify-center">
                      <Utensils className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle className="card-title-food text-xl font-bold leading-relaxed mt-4">
                    Food & Recipes
                  </CardTitle>
                  <CardDescription className="card-description text-orange-800">
                    Discover and organize your favorite recipes and dining experiences
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="card-list text-orange-800">
                    <li>• Save and categorize recipes</li>
                    <li>• Track tried dishes and favorites</li>
                    <li>• Restaurant wishlist and reviews</li>
                    <li>• Meal planning and grocery lists</li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button size="sm" className="w-full explore-btn explore-btn-food">
                    <Link to="/food">Explore Food</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Travel Card */}
              <div className="flex flex-col items-center mx-4">
                <span style={{ fontSize: '5rem', color: 'oklch(0.25 0.15 140)' }}>→</span>
                <span style={{ fontSize: '5rem', color: 'oklch(0.25 0.15 140)' }}>←</span>
              </div>

              <Card style={{ background: "linear-gradient(to bottom right, #eff6ff, #ecfeff)" }}
                    className="min-w-[350px] max-w-sm h-[400px] shadow-lg border-0 hover:shadow-xl transition-all duration-300 rounded-xl p-6 flex flex-col justify-between card-travel">
                <CardHeader className="pt-8 pb-6">
                  <div className="flex justify-between items-center">
                    <Compass className="h-8 w-8 -translate-y-2.5 text-blue-600" />
                    <div className="right-icon-circle flex items-center justify-center">
                      <Compass className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle className="card-title-travel text-xl font-bold leading-relaxed mt-4">
                    Travel Planning
                  </CardTitle>
                  <CardDescription className="card-description text-blue-800">
                    Plan your next adventure with detailed itineraries and destination guides
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="card-list text-blue-800">
                    <li>• Trip planning and itineraries</li>
                    <li>• Destination wishlist</li>
                    <li>• Travel memories and photos</li>
                    <li>• Budget tracking</li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button size="sm" className="w-full explore-btn explore-btn-travel">
                    <Link to="/travel">Explore Travel</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Workout Card */}
              <div className="flex flex-col items-center mx-4">
                <span style={{ fontSize: '5rem', color: 'oklch(0.25 0.15 250)' }}>→</span>
                <span style={{ fontSize: '5rem', color: 'oklch(0.25 0.15 250)' }}>←</span>
              </div>

              <Card style={{ background: "linear-gradient(to bottom right, #f0fdf4, #d1fae5)" }}
                    className="min-w-[350px] max-w-sm h-[400px] shadow-lg border-0 hover:shadow-xl transition-all duration-300 rounded-xl p-6 flex flex-col justify-between card-workout">
                <CardHeader className="pt-8 pb-6">
                  <div className="flex justify-between items-center">
                    <Dumbbell className="h-8 w-8 -translate-y-2.5 text-green-600" />
                    <div className="right-icon-circle flex items-center justify-center">
                      <Dumbbell className="h-6 w-6" />
                    </div>
                  </div>
                  <CardTitle className="card-title-workout text-xl font-bold leading-relaxed mt-4">
                    Workout Tracker
                  </CardTitle>
                  <CardDescription className="card-description text-green-800">
                    Log workouts and track your fitness goals effectively
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="card-list text-green-800">
                    <li>• Track completed workouts</li>
                    <li>• Set weekly and monthly goals</li>
                    <li>• Monitor progress and streaks</li>
                    <li>• Workout history and stats</li>
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button size="sm" className="w-full explore-btn explore-btn-workout">
                    <Link to="/workout">Explore Workouts</Link>
                  </Button>
                </CardFooter>
              </Card>

            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-24 bg-muted/50 stats-section">
          <div className="max-w-5xl mx-auto px-8 stats-container">
            <div className="stat-item">
              <div className="stat-icon-wrapper stat-food"><Star /></div>
              <div className="stat-number">4.9/5</div>
              <div className="stat-label">User Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-wrapper stat-travel"><Users /></div>
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon-wrapper stat-workout"><Calendar /></div>
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Activities Tracked</div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="w-full py-24 bg-muted/10 contact-section">
          <div className="max-w-3xl mx-auto px-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
            {submitted ? (
              <p className="text-center text-green-600 font-semibold text-lg">
                Thanks! We will contact you soon. Please check your email.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium text-left">Name</label>
                  <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange}
                         className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"/>
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium text-left">Email</label>
                  <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}
                         className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"/>
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1 font-medium text-left">Message</label>
                  <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"/>
                </div>
                <div>
                  <Button type="submit" className="w-full">Submit</Button>
                </div>
              </form>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row gap-2 items-center justify-between py-6 px-8 border-t border-border text-xs text-muted-foreground">
        <p>© 2025 HobbyHub. All rights reserved.</p>
        <nav className="flex gap-6">
          <Link to="#" className="hover:underline underline-offset-4">Terms of Service</Link>
          <Link to="#" className="hover:underline underline-offset-4">Privacy Policy</Link>
          <Link to="#" className="hover:underline underline-offset-4">Contact</Link>
        </nav>
      </footer>
    </div>
  );
}

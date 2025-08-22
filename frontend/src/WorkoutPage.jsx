import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Dumbbell,
  Target,
  TrendingUp,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import "./workout.css";
import { useAuth } from "./AuthContext";

export default function WorkoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Dummy workout routines
  const workouts = [
    {
      title: "Full Body Strength",
      time: "45 minutes",
      type: "Strength",
      intensity: "Intermediate",
      desc: "Compound lifts and bodyweight moves to build overall strength.",
    },
    {
      title: "HIIT Cardio",
      time: "20 minutes",
      type: "Cardio",
      intensity: "Advanced",
      desc: "High-intensity intervals to boost endurance and burn calories.",
    },
    {
      title: "Yoga Flow",
      time: "30 minutes",
      type: "Flexibility",
      intensity: "Beginner",
      desc: "Gentle yoga sequence designed for flexibility and relaxation.",
    },
  ];

  // Handle protected actions (require login)
  const handleProtectedClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login", { state: { from: path } });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
    {/* Navbar */}
<header className="navbar">
  <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
    {/* HobbyHub Logo */}
    <Link to="/" className="flex items-center space-x-2 flex-shrink-0 hobbyhub-logo-button">
      <div className="hh-icon gradient-text">HH</div>
      <span className="font-alumniSans text-[23px] font-normal text-white">
        HobbyHub
      </span>
    </Link>

    <nav className="flex items-center text-muted-foreground text-sm font-medium space-x-6">
      <Link to="/food" className="hover:text-foreground transition-colors">Food</Link>
      <Link to="/travel" className="hover:text-foreground transition-colors">Travel</Link>
      <Link to="/workout" className="hover:text-foreground transition-colors">Workout</Link>
    </nav>

    <div className="flex-shrink-0">
      <Link
        to="/dashboard"
        className="dashboard-button flex items-center space-x-2 px-4 py-2 text-sm rounded-lg transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Dashboard</span>
      </Link>
    </div>
  </div>
</header>


      {/* Main Content */}
      <main className="flex-1 w-full p-4 md:p-8 flex justify-center">
        <div className="workout-page-container w-full max-w-7xl bg-background rounded-2xl shadow-md p-6 md:p-8">
          <Tabs defaultValue="routines" className="workout-tabs">
            {/* Hero Section */}
            <div className="workout-hero-section relative w-full">
              <div className="workout-hero-background absolute -inset-4 bg-gradient-to-tr from-green-300 via-emerald-200 to-green-400 filter blur-3xl rounded-3xl z-0"></div>

              <div className="workout-hero-container relative z-10 flex flex-col md:flex-row md:items-center md:justify-center gap-4 w-full max-w-4xl p-6 rounded-2xl border-2 border-transparent bg-transparent shadow-none mx-auto">
                {/* Hero Text */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="font-[Alumni_Sans] font-bold text-[4rem] md:text-[4.5rem] bg-clip-text text-transparent bg-[linear-gradient(90deg,#22c55e,#4ade80,#16a34a)]">
                    Workouts
                  </h1>
                  <p className="mt-4 text-[#6b7280] font-[Alumni_Sans] text-lg md:text-xl max-w-md mx-auto md:mx-0">
                    Track, log, and level up your fitness journey
                  </p>
                </div>

                {/* Log Workout Button */}
                <div className="workout-hero-buttons flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
                  <button
                    onClick={() => handleProtectedClick("/workout/new")}
                    className="log-workout-btn hero-btn-primary flex justify-center items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Log Workout
                  </button>
                </div>

                {/* Tabs triggers */}
                <TabsList className="workout-tabs-list flex gap-4 mt-4 md:mt-0">
                  {["routines", "history", "progress"].map((tab) => (
                    <TabsTrigger key={tab} value={tab}>
                      {tab[0].toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            {/* Routines Tab */}
            <TabsContent value="routines" className="space-y-8 mt-6">
              <div className="workout-cards-container flex flex-wrap gap-6">
                {workouts.map((workout, idx) => (
                  <Card
                    key={idx}
                    className="workout-card flex flex-col justify-between overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl hover:scale-105 transition-all duration-300 max-w-xs"
                  >
                    <CardHeader className="workout-card-header pb-2">
                      <CardTitle className="workout-card-title">
                        {workout.title}
                      </CardTitle>
                      <CardDescription className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" /> {workout.time}
                        </div>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                          {workout.type}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow mt-2">
                      <p className="text-sm text-gray-500">{workout.desc}</p>
                      <div className="flex items-center mt-2">
                        <Dumbbell className="text-sm text-gray-500" />
                        <span className="text-sm text-gray-500 ml-1">
                          {workout.intensity}
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="workout-card-footer mt-auto">
                      <button
                        onClick={() => handleProtectedClick("/workout/new")}
                        className="log-workout-btn w-full flex justify-center items-center gap-2"
                      >
                        View Log Workout
                      </button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-4 tab-content-spacing">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader>
                  <CardTitle>Workout History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    View and analyze your past logged workouts.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-4 tab-content-spacing">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Charts and metrics to track performance improvements.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

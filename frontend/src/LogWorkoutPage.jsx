import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { useAuth } from "./AuthContext";
import "./workout.css";

export default function LogWorkoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [exercises, setExercises] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch exercises from backend
  const fetchExercises = async (query = "") => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/exercises", {
        params: {
          search: query,
          limit: 20,
        },
      });
      setExercises(res.data.exercises || []);
    } catch (err) {
      console.error("Failed to fetch exercises:", err);
      setExercises([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchExercises(search);
  };

  const handleAddToLog = (exercise) => {
    if (!user) {
      navigate("/login", { state: { from: "/workout/new" } });
      return;
    }
    alert(`Added "${exercise.name}" to your workout log!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground p-6 md:p-8">
      <h1 className="text-4xl font-bold mb-6">Log a Workout</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6 flex gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Search exercises..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Exercises Grid */}
      {loading ? (
        <p>Loading exercises...</p>
      ) : exercises.length === 0 ? (
        <p>No exercises found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {exercises.map((ex) => (
            <Card
              key={ex.id}
              className="exercise-card flex flex-col justify-between shadow-lg hover:shadow-xl transition-all w-64"
            >
              {ex.image && (
                <img
                  src={ex.image}
                  alt={ex.name}
                  className="exercise-gif mt-2"
                />
              )}
              <CardHeader className="text-center">
                <CardTitle>{ex.name}</CardTitle>
                <CardDescription>
                  <Badge className="bg-green-500 text-white">
                    {ex.bodyParts.join(", ")}
                  </Badge>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600">
                  Target: {ex.targetMuscles.join(", ")}
                </p>
                {ex.equipments.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    Equipment: {ex.equipments.join(", ")}
                  </p>
                )}
                {ex.description && (
                  <p className="exercise-description mt-2">{ex.description}</p>
                )}
              </CardContent>

              <CardFooter>
                <button
                  onClick={() => handleAddToLog(ex)}
                  className="log-workout-btn w-full flex justify-center items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add to Log
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

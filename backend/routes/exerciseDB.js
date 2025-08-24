import express from "express";
import axios from "axios";

const router = express.Router();
const BASE_URL = "https://exercisedb-api.vercel.app/api/v1/exercises";

router.get("/", async (req, res) => {
  const { search = "" } = req.query;

  try {
    const url = search
      ? `${BASE_URL}/search?q=${encodeURIComponent(search)}&limit=20`
      : BASE_URL;

    const response = await axios.get(url);

    let exercisesData = Array.isArray(response.data.data) ? response.data.data : response.data;

    // Pick 20 random exercises if no search
    if (!search && Array.isArray(exercisesData)) {
      exercisesData = exercisesData.sort(() => 0.5 - Math.random()).slice(0, 20);
    }

    const formattedExercises = (exercisesData || []).map((ex, idx) => ({
      id: ex.id || ex.exerciseId || idx.toString(),
      name: ex.name || "Unknown Exercise",
      image: ex.gifUrl || "",
      description: ex.instructions ? ex.instructions.join(" ") : "No instructions available",
      targetMuscles: ex.target ? [ex.target] : ex.targetMuscles || [],
      bodyParts: ex.bodyPart ? [ex.bodyPart] : ex.bodyParts || [],
      equipments: ex.equipment ? [ex.equipment] : ex.equipments || [],
      secondaryMuscles: ex.secondaryMuscles || [],
      instructions: ex.instructions || [],
    }));

    res.json({ exercises: formattedExercises });
  } catch (err) {
    console.error("ExerciseDB fetch error:", err.message);
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    }
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
});

export default router;

import React, { useRef, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAxiosClient } from "./axios-instance";
import "./addrecipe.css";

export default function AddRecipe() {
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const savedModalRef = useRef(null);
  const [recipesLocal, setRecipesLocal] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [query, setQuery] = useState("");
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [activeTab, setActiveTab] = useState("typed");

  const axios = useAxiosClient(); // baseURL should already point to http://localhost:5000
// Helper to normalize recipe structure and ensure consistent ID
function normalizeRecipe(recipe) {
  return {
    id: recipe.id || recipe.idMeal || crypto.randomUUID(), // always generate a stable ID
    title: recipe.title || recipe.strMeal || "Untitled",
    description: recipe.description || recipe.strInstructions || "",
    image: recipe.image || recipe.strMealThumb || "",
    category: recipe.category || recipe.strCategory || "",
    area: recipe.area || recipe.strArea || "",
    instructions: recipe.instructions || recipe.strInstructions || "",
    source: recipe.source || "typed",
  };
}

// Create new recipe mutation
const { mutate: createNewRecipe } = useMutation({
  mutationKey: ["newRecipe"],
  mutationFn: async (newRecipe) => {
    const normalized = normalizeRecipe(newRecipe); // normalize before saving
    const { data } = await axios.post("/api/recipes", normalized);
    return normalized;
  },
  onSuccess: (saved) => {
    queryClient.invalidateQueries({ queryKey: ["recipes"] });
    toast.success("Recipe added!");
    setRecipesLocal((prev) => [...prev, saved]); // update local state with normalized recipe
  },
  onError: () => toast.error("Failed to add recipe."),
});

// Save MealDB recipe
const { mutate: saveMealDBRecipe } = useMutation({
  mutationFn: async (meal) => {
    const normalized = normalizeRecipe(meal); // normalize before saving
    const { data } = await axios.post("/recipes/save", normalized);
    return normalized;
  },
  onSuccess: (savedRecipe) => {
    queryClient.invalidateQueries({ queryKey: ["recipes"] });
    queryClient.invalidateQueries({ queryKey: ["savedAPIRecipes"] });
    toast.success("Meal saved to My Recipes!");
    setSavedRecipes((prev) => [...prev, savedRecipe]); // update saved list with normalized recipe
  },
  onError: () => toast.error("Failed to save meal."),
});

  // FIXED: Remove typed (custom) recipe permanently - CHANGED ENDPOINT
  const { mutate: removeTypedRecipeLocal } = useMutation({
    mutationFn: async (id) => {
      if (!id) throw new Error("Recipe ID is required");
      console.log("Deleting custom recipe with ID:", id);
    await axios.delete(`/api/recipes/${id}`);   return id; // CHANGED: was /api/recipes/saved/${id}
    },
   onSuccess: (id) => {
      console.log("Successfully deleted custom recipe:", id);
  queryClient.invalidateQueries({ queryKey: ["recipes"] });
  setRecipesLocal((prev) =>
    prev.filter((r) => String(r.id || r.idMeal) !== String(id))
  );
  toast.info("Custom recipe removed!");
},

    onError: (error) => {
      console.error("Failed to remove custom recipe:", error);
      toast.error("Failed to remove custom recipe.");
    },
  });

  // Remove saved API recipe
  const { mutate: removeSavedRecipe } = useMutation({
    mutationFn: async (id) => {
      if (!id) throw new Error("Recipe ID is required");
      console.log("Deleting saved API recipe with ID:", id);
   await axios.delete(`/api/recipes/saved/${id}`);   return id;
    },
  onSuccess: (id) => {
    console.log("Successfully deleted saved API recipe:", id);
  queryClient.invalidateQueries({ queryKey: ["savedAPIRecipes"] });
  setSavedRecipes((prev) =>
    prev.filter((r) => String(r.id || r.idMeal) !== String(id))
  );
  toast.info("Recipe removed!");
},
   onError: (error) => {
     console.error("Failed to remove saved recipe:", error);
     toast.error("Failed to remove recipe.");
   },
  });

  // Fetch typed recipes (user-created)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data } = await axios.get("/recipes/saved");
      return data;
    },
  });
  const recipes = data?.recipes || [];

  // FIXED: Fetch saved API recipes - REMOVED deprecated onSuccess
  const { data: savedAPIData } = useQuery({
    queryKey: ["savedAPIRecipes"],
    queryFn: async () => {
      const { data } = await axios.get("/recipes/saved/api");
      return data.recipes || [];
    },
    // REMOVED: onSuccess: (data) => setSavedRecipes(data),
  });

  // Fetch searched recipes from TheMealDB
  const { data: externalRecipes, refetch, isFetching } = useQuery({
    queryKey: ["externalRecipes", query],
    queryFn: async () => {
      if (!query) return [];
      const { data } = await axios.get(`/api/external/recipes?search=${query}`);
      return data.recipes;
    },
    enabled: false,
  });

  useEffect(() => {
    setRecipesLocal(recipes);
  }, [recipes]);

  // FIXED: Sync savedRecipes with savedAPIData
  useEffect(() => {
    if (savedAPIData) {
      setSavedRecipes(savedAPIData);
    }
  }, [savedAPIData]);

  // Fetch 10 random MealDB recipes on mount
  useEffect(() => {
    const fetchRandoms = async () => {
      try {
        const promises = Array.from({ length: 10 }).map(() =>
          axios.get("/api/external/random")
        );
        const results = await Promise.all(promises);
        const meals = results
          .map((res) => res.data?.meals?.[0])
          .filter(Boolean);
        setRandomRecipes(meals);
      } catch (err) {
        console.error("Failed to fetch random recipes:", err);
      }
    };
    fetchRandoms();
  }, [axios]);

  const toggleNewRecipeModal = () => {
    if (!modalRef.current) return;
    modalRef.current.open ? modalRef.current.close() : modalRef.current.showModal();
  };

  const onSubmit = (formData) => {
    createNewRecipe({ title: formData.title, description: formData.description });
    reset();
    toggleNewRecipeModal();
  };

  // Helper: check if recipe is already saved
  const isRecipeSaved = (recipe) => {
    return savedRecipes.some(
      (r) => r.id === recipe.id || r.idMeal === recipe.idMeal
    );
  };

  // Only show unsaved ones outside modal
  const unsavedExternalRecipes = (externalRecipes || []).filter(
    (r) => !isRecipeSaved(r)
  );
  const unsavedRandomRecipes = randomRecipes.filter(
    (r) => !isRecipeSaved(r)
  );

  // Main grid should only show unsaved API recipes
  const allRecipes = [
    ...unsavedExternalRecipes.map((r) => ({ ...r, source: "mealdb" })),
    ...unsavedRandomRecipes.map((r) => ({ ...r, source: "mealdb-random" })),
  ];

  return (
    <>
      {/* Navbar */}
      <header className="navbar bg-white shadow-md py-3 mb-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="hh-icon gradient-text font-bold">HH</div>
            <span className="font-alumniSans text-[23px] font-normal gradient-text">
              HobbyHub
            </span>
          </Link>

          <nav className="flex items-center text-gray-600 text-sm font-medium space-x-6">
            <Link to="/food" className="hover:text-gray-900 transition-colors">Food</Link>
            <Link to="/travel" className="hover:text-gray-900 transition-colors">Travel</Link>
            <Link to="/workout" className="hover:text-gray-900 transition-colors">Workout</Link>
          </nav>

          <Link to="/dashboard" className="dashboard-btn">
            <ArrowLeft className="h-4 w-4" stroke="currentColor" />
            <span>Dashboard</span>
          </Link>
        </div>
      </header>

      <main className="add-recipe-page p-4 max-w-3xl mx-auto">
  {/* Page header */}
  <div className="add-recipe-page-header text-center mb-6">
    <h1 className="page-title">Recipes</h1>
    <p className="page-subtitle">Add your favorite recipes below.</p>
    
    <button className="add-recipe-btn mt-3" onClick={toggleNewRecipeModal}>
      Add Recipe
    </button>
    <button
      className="add-recipe-btn mt-3 ml-2"
      onClick={() => savedModalRef.current.showModal()}
    >
      Saved Recipes
    </button>

    {isLoading && <p className="status-msg status-loading mt-2">Loading...</p>}
    {isError && <p className="status-msg status-error mt-2">Error loading recipes.</p>}
    {!isLoading && recipes.length === 0 && (
      <p className="status-msg status-empty mt-2">No recipes found</p>
    )}
  </div>



        {/* Search */}
        <div className="text-center mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a meal..."
            className="border px-3 py-2 rounded-lg w-64"
          />
          <button onClick={() => refetch()} className="add-recipe-btn ml-2">
            Search
          </button>
        </div>

        {isFetching && <p className="text-center">Searching recipes...</p>}

        {/* Recipe Grid */}
        <div className="flex justify-center">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
            {allRecipes.map((recipe, idx) => (
         <div
  key={recipe.id || recipe.idMeal ? `${recipe.id || recipe.idMeal}-${idx}` : idx}
  className="add-recipe-card p-4 rounded-lg shadow text-center"
>
  <img
    src={recipe.image || recipe.strMealThumb}
    alt={recipe.title || recipe.strMeal}
    className="rounded-lg mb-3 mx-auto object-contain max-w-full max-h-48"
  />
  <h4 className="text-lg font-bold mb-2">{recipe.title || recipe.strMeal}</h4>

              <div className="flex gap-2 mb-2">
                {(recipe.category || recipe.strCategory) && (
                  <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-600">
                    {recipe.category || recipe.strCategory}
                  </span>
                )}
                {(recipe.area || recipe.strArea) && (
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">
                    {recipe.area || recipe.strArea}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600">
                {(recipe.instructions || recipe.strInstructions || recipe.description || "").slice(0, 120)}
                ...
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="text-xs px-2 py-1 bg-gray-200 rounded">
                  {recipe.source === "saved"
                    ? "Saved Recipe"
                    : recipe.source === "mealdb-random"
                    ? "MealDB (Random)"
                    : "MealDB"}
                </span>

                {recipe.source?.includes("mealdb") && (
                  <button
                    onClick={() => saveMealDBRecipe(recipe)}
                    className="modal-btn-primary text-xs px-3 py-1"
                  >
                    Save to My Recipes
                  </button>
                )}
              </div>
            </div>
            ))}
          </div>
        </div>

 {/* Modal for new recipe */}
<dialog ref={modalRef} className="add-recipe-modal">
  <div className="modal-box">
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="modal-header">New Recipe</h3>
      <input {...register("title", { required: true })} placeholder="Title" className="modal-input" />
      <textarea {...register("description")} placeholder="Description" className="modal-textarea" />
      <div className="modal-action">
        <button type="submit" className="modal-btn-primary">Add</button>
        <button type="button" onClick={toggleNewRecipeModal} className="modal-btn-cancel">Cancel</button>
      </div>
    </form>
  </div>
</dialog>

{/* Saved recipes modal */}
<dialog ref={savedModalRef} className="add-recipe-modal">
  <div className="modal-box">
    {/* Title + X Button */}
    <div className="flex justify-between items-center mb-4">
      <h3 className="modal-header">Saved Recipes</h3>
      <button
        className="modal-close-btn"
        onClick={() => {
          if (savedModalRef.current) {
            savedModalRef.current.close();
          }
        }}
        type="button"
      >
        ✕
      </button>
    </div>

    {/* Tab Navigation */}
    <div className="flex mb-4 border-b">
      <button
        className={`tab-btn ${activeTab === "typed" ? "active" : ""}`}
        onClick={() => setActiveTab("typed")}
      >
        Custom Recipes ({recipesLocal.length})
      </button>
      <button
        className={`tab-btn ${activeTab === "api" ? "active" : ""}`}
        onClick={() => setActiveTab("api")}
      >
        Online Recipes ({savedRecipes.length})
      </button>
    </div>

    {/* Typed recipes */}
    {activeTab === "typed" && (
      <div className="modal-grid">
        {recipesLocal.length === 0 ? (
          <p className="text-gray-600">No recipes added yet.</p>
        ) : (
          recipesLocal.map((recipe) => (
            <div key={recipe.id || recipe.idMeal || Math.random()} className="modal-recipe-card rounded-lg shadow">
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="rounded-lg mb-2 mx-auto"
                />
              )}
              <h4>{recipe.title}</h4>
              <p>{(recipe.description || "").slice(0, 80)}...</p>
              <button
                className="modal-btn-remove"
                onClick={() => removeTypedRecipeLocal(recipe.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    )}

    {/* API saved recipes */}
    {activeTab === "api" && (
      <div className="modal-grid">
        {savedRecipes.length === 0 ? (
          <p className="text-gray-600">No recipes saved from API yet.</p>
        ) : (
          savedRecipes.map((recipe) => (
            <div key={recipe.id || recipe.idMeal || Math.random()} className="modal-recipe-card rounded-lg shadow">
              {(recipe.image || recipe.strMealThumb) && (
                <img
                  src={recipe.image || recipe.strMealThumb}
                  alt={recipe.title || recipe.strMeal}
                  className="rounded-lg mb-2 mx-auto"
                />
              )}
              <h4>{recipe.title || recipe.strMeal}</h4>
              <p>{(recipe.description || recipe.instructions || "").slice(0, 80)}...</p>
              <button
                className="modal-btn-remove"
                onClick={() => removeSavedRecipe(recipe.id || recipe.idMeal)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    )}

    <div className="modal-action mt-4">
      <button 
        onClick={() => {
          if (savedModalRef.current) {
            savedModalRef.current.close();
          }
        }} 
        className="modal-btn-cancel"
        type="button"
      >
        Close
      </button>
    </div>
  </div>
</dialog>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </main>
    </>
  );
}
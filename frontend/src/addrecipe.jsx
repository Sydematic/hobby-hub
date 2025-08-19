// AddRecipe.jsx
import React, { useRef, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAxiosClient from "./axios-instance"; // adjust path if needed
import "./addrecipe.css";

export default function AddRecipe() {
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();
  const [query, setQuery] = useState("");
  const [randomRecipes, setRandomRecipes] = useState([]);

  // 🟢 Create new recipe mutation (manual input modal)
  const { mutate: createNewRecipe } = useMutation({
    mutationKey: ["newRecipe"],
    mutationFn: async (newRecipe) => {
      const axiosInstance = await getAxiosClient();
      const { data } = await axiosInstance.post("/recipes", newRecipe);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"]);
      toast.success("Recipe added!");
    },
    onError: () => {
      toast.error("Failed to add recipe.");
    },
  });

  // 🟢 Save MealDB recipe into our DB
  const { mutate: saveMealDBRecipe } = useMutation({
    mutationKey: ["saveMealDBRecipe"],
    mutationFn: async (meal) => {
      const axiosInstance = await getAxiosClient();
      const { data } = await axiosInstance.post("/recipes", {
        title: meal.strMeal,
        description: meal.strInstructions,
        image: meal.strMealThumb,
        category: meal.strCategory,
        area: meal.strArea,
        instructions: meal.strInstructions,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["recipes"]);
      toast.success("Meal saved to My Recipes!");
    },
    onError: () => {
      toast.error("Failed to save meal.");
    },
  });

  // 🟢 Fetch saved recipes from DB
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const axiosInstance = await getAxiosClient();
      const { data } = await axiosInstance.get("/recipes");
      return data;
    },
  });

  const recipes = data?.recipes || [];

  // 🟢 Fetch searched recipes from TheMealDB via backend
  const {
    data: externalRecipes,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["externalRecipes", query],
    queryFn: async () => {
      if (!query) return [];
      const axiosInstance = await getAxiosClient();
      const { data } = await axiosInstance.get(`/external/recipes?search=${query}`);
      return data.recipes;
    },
    enabled: false,
  });

  // 🟢 Auto-fetch 10 random recipes on page load
  useEffect(() => {
    const fetchRandoms = async () => {
      const axiosInstance = await getAxiosClient();
      const promises = Array.from({ length: 10 }).map(() =>
        axiosInstance.get(`/external/random`)
      );
      const results = await Promise.all(promises);
      const meals = results
        .map((res) => res.data?.meals?.[0])
        .filter(Boolean);
      setRandomRecipes(meals);
    };
    fetchRandoms();
  }, []);

  const toggleNewRecipeModal = () => {
    if (!modalRef.current) return;
    modalRef.current.open ? modalRef.current.close() : modalRef.current.showModal();
  };

  const onSubmit = async (formData) => {
    const newRecipe = {
      title: formData.title,
      description: formData.description,
    };
    createNewRecipe(newRecipe);
    reset();
    toggleNewRecipeModal();
  };

  // 🟢 Merge saved + external + random recipes
  const allRecipes = [
    ...recipes.map((r) => ({ ...r, source: "saved" })),
    ...(externalRecipes?.map((r) => ({ ...r, source: "mealdb" })) || []),
    ...(randomRecipes.map((r) => ({ ...r, source: "mealdb-random" })) || []),
  ];

  return (
    <main className="add-recipe-page p-4 max-w-3xl mx-auto">
      <div className="add-recipe-page-header text-center mb-6">
        <h1 className="text-2xl font-bold">Recipes</h1>
        <p className="text-gray-600">Add your favorite recipes below.</p>
        <button className="add-recipe-btn mt-3" onClick={toggleNewRecipeModal}>
          Add Recipe
        </button>
        {isLoading && <p className="mt-2">Loading...</p>}
        {isError && <p className="mt-2">Error loading recipes.</p>}
        {!isLoading && recipes.length === 0 && (
          <p className="mt-2">No recipes found.</p>
        )}
      </div>

      {/* 🔎 Search MealDB */}
      <div className="text-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a meal..."
          className="border px-3 py-2 rounded-lg w-64"
        />
       <button
  onClick={() => refetch()}
  className="add-recipe-btn ml-2"
>
  Search
</button>

      </div>

      {isFetching && <p className="text-center">Searching recipes...</p>}

      {/* 🟢 Recipe Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {allRecipes.map((recipe, idx) => (
          <div key={recipe.id || recipe.idMeal || idx} className="add-recipe-card p-4 rounded-lg shadow">
            {/* Image */}
            {recipe.image || recipe.strMealThumb ? (
             <img
              src={recipe.image || recipe.strMealThumb}
              alt={recipe.title || recipe.strMeal}
              className="rounded-lg mb-3 mx-auto object-cover w-24 h-24"
            />

            ) : null}

            {/* Title */}
            <h4 className="text-lg font-bold mb-2">
              {recipe.title || recipe.strMeal}
            </h4>

            {/* Category + Area */}
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

            {/* Instructions / Description */}
            <p className="text-sm text-gray-600">
              {(recipe.instructions || recipe.strInstructions || recipe.description || "")
                .slice(0, 120)}
              ...
            </p>

            {/* Source Tag */}
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

      {/* Modal for manual recipe */}
      <dialog ref={modalRef} className="add-recipe-modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="modal-header">New Recipe</h3>
            <input
              {...register("title", { required: true })}
              placeholder="Title"
              className="modal-input"
            />
            <textarea
              {...register("description")}
              placeholder="Description"
              className="modal-textarea"
            />
            <div className="modal-action">
              <button type="submit" className="modal-btn-primary">
                Add
              </button>
              <button
                type="button"
                onClick={toggleNewRecipeModal}
                className="modal-btn-cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </main>
  );
}

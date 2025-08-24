import React, { useRef, useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { useAxiosClient } from "./axios-instance";
import "./addrecipe.css";

export default function AddRecipe() {
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const savedModalRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("typed");

  const axios = useAxiosClient();

  // Normalize recipe
  const normalizeRecipe = (recipe) => ({
    id: recipe.id || recipe.idMeal || crypto.randomUUID(),
    title: recipe.title || recipe.strMeal || "Untitled",
    description: recipe.description || recipe.strInstructions || "",
    image: recipe.image || recipe.strMealThumb || "",
    category: recipe.category || recipe.strCategory || "",
    area: recipe.area || recipe.strArea || "",
    instructions: recipe.instructions || recipe.strInstructions || "",
    source: recipe.source || "typed",
  });

  // Mutations
  const { mutate: createNewRecipe } = useMutation({
    mutationKey: ["newRecipe"],
    mutationFn: async (newRecipe) => {
      const normalized = normalizeRecipe(newRecipe);
      await axios.post("/api/recipes", normalized);
      return normalized;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast.success("Recipe added!");
    },
    onError: () => toast.error("Failed to add recipe."),
  });

  const { mutate: saveMealDBRecipe } = useMutation({
    mutationFn: async (meal) => {
      const normalized = normalizeRecipe(meal);
      await axios.post("/api/recipes/save", normalized);
      return normalized;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({ queryKey: ["savedAPIRecipes"] });
      toast.success("Meal saved to My Recipes!");
    },
    onError: () => toast.error("Failed to save meal."),
  });

  const { mutate: removeTypedRecipeLocal } = useMutation({
    mutationFn: async (id) => {
      if (!id) throw new Error("Recipe ID is required");
      await axios.delete(`/api/recipes/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast.info("Custom recipe removed!");
    },
    onError: () => toast.error("Failed to remove custom recipe."),
  });

  const { mutate: removeSavedRecipe } = useMutation({
    mutationFn: async (id) => {
      if (!id) throw new Error("Recipe ID is required");
      await axios.delete(`/api/recipes/saved/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedAPIRecipes"] });
      toast.info("Recipe removed!");
    },
    onError: () => toast.error("Failed to remove recipe."),
  });

  // Queries
  const { data: typedRecipesData, isLoading, isError } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data } = await axios.get("/api/recipes/saved");
      return data.recipes || [];
    },
  });

  const { data: savedRecipesData } = useQuery({
    queryKey: ["savedAPIRecipes"],
    queryFn: async () => {
      const { data } = await axios.get("/api/recipes/saved/api");
      return data.recipes || [];
    },
  });

  const { data: searchResponseData, refetch, isFetching } = useQuery({
    queryKey: ["externalRecipes", query],
    queryFn: async () => {
      if (!query || query.trim() === "") return { recipes: [] };
      const { data } = await axios.get(`/api/external/recipes?search=${encodeURIComponent(query)}`);
      return data;
    },
    enabled: false,
    staleTime: 5 * 60 * 1000,
  });

  const toggleNewRecipeModal = () => {
    if (!modalRef.current) return;
    modalRef.current.open ? modalRef.current.close() : modalRef.current.showModal();
  };

  const onSubmit = (formData) => {
    createNewRecipe({ title: formData.title, description: formData.description });
    reset();
    toggleNewRecipeModal();
  };

  const handleSearch = () => {
    if (!query.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    refetch();
  };

  const displayRecipes = useMemo(() => {
    const searchResults = searchResponseData?.recipes || [];
    return query.trim() && searchResults.length > 0
      ? searchResults.map((r) => ({ ...r, source: "mealdb-search" }))
      : [];
  }, [searchResponseData, query]);

  const isIndividualRecipeSaved = (recipe) => {
    if (!savedRecipesData || savedRecipesData.length === 0) return false;
    const recipeId = recipe.id || recipe.idMeal;
    return savedRecipesData.some((saved) => (saved.id || saved.idMeal) === recipeId);
  };

  return (
    <>
      <header className="navbar bg-white shadow-md py-3 mb-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="hh-icon gradient-text font-bold">HH</div>
            <span className="font-alumniSans text-[23px] font-normal gradient-text">HobbyHub</span>
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
        <div className="add-recipe-page-header text-center mb-6">
          <h1 className="page-title">Recipes</h1>
          <p className="page-subtitle">Add your favorite recipes below.</p>
          <button className="add-recipe-btn mt-3" onClick={toggleNewRecipeModal}>Add Recipe</button>
          <button className="add-recipe-btn mt-3 ml-2" onClick={() => savedModalRef.current.showModal()}>Saved Recipes</button>
          {isLoading && <p className="status-msg status-loading mt-2">Loading...</p>}
          {isError && <p className="status-msg status-error mt-2">Error loading recipes.</p>}
        </div>

        {/* Search */}
        <div className="text-center mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a meal..."
            className="border px-3 py-2 rounded-lg w-64"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="add-recipe-btn ml-2">Search</button>
          {query && (
            <button
              onClick={() => { setQuery(""); queryClient.removeQueries(["externalRecipes"]); }}
              className="add-recipe-btn ml-2"
            >
              Clear
            </button>
          )}
        </div>

        {isFetching && <p className="text-center">Searching recipes...</p>}

        {/* Recipe Grid */}
        <div className="flex justify-center">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
            {displayRecipes.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">
                  {query.trim() ? "No search results found. Try a different search term." : "Type and Search. If you can't find what you are looking for, it may not be available. Try type a letter or other food options :)"}
                </p>
              </div>
            ) : (
              displayRecipes.map((recipe, idx) => (
                <div key={recipe.id || recipe.idMeal || `recipe-${idx}`} className="add-recipe-card p-4 rounded-lg shadow text-center">
                  <img
                    src={recipe.strMealThumb || recipe.image || ''}
                    alt={recipe.strMeal || recipe.title || 'Recipe'}
                    className="rounded-lg mb-3 mx-auto object-cover w-full h-48"
                    onError={(e) => { e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzk5OTk5OSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+'; }}
                  />
                  <h4 className="text-lg font-bold mb-2">{recipe.strMeal || recipe.title}</h4>
                  <div className="flex gap-2 mb-2 flex-wrap justify-center">
                    {(recipe.strCategory || recipe.category) && (
                      <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-600">{recipe.strCategory || recipe.category}</span>
                    )}
                    {(recipe.strArea || recipe.area) && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">{recipe.strArea || recipe.area}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{(recipe.strInstructions || recipe.instructions || recipe.description || "").slice(0, 120)}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-1 bg-gray-200 rounded">{recipe.source === "mealdb-search" ? "Search Result" : "Typed Recipe"}</span>
                    <button
                      onClick={() => saveMealDBRecipe(recipe)}
                      disabled={isIndividualRecipeSaved(recipe)}
                      className={`text-xs px-3 py-1 ${isIndividualRecipeSaved(recipe) ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "modal-btn-primary"}`}
                    >
                      {isIndividualRecipeSaved(recipe) ? "Already Saved" : "Save Recipe"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* New Recipe Modal */}
        <dialog ref={modalRef} className="add-recipe-modal">
          <div className="modal-box">
            <button className="modal-close-btn absolute top-4 right-4" onClick={toggleNewRecipeModal}><X size={20} /></button>
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

        {/* Saved Recipes Modal */}
        <dialog ref={savedModalRef} className="add-recipe-modal">
          <div className="modal-box">
            <button className="modal-close-btn absolute top-4 right-4" onClick={() => savedModalRef.current.close()}><X size={20} /></button>
            <h3 className="modal-header">My Saved Recipes</h3>
            <div className="flex mb-4">
              <button className={`tab-btn ${activeTab === "typed" ? "active" : ""}`} onClick={() => setActiveTab("typed")}>Custom Recipes</button>
              <button className={`tab-btn ${activeTab === "api" ? "active" : ""}`} onClick={() => setActiveTab("api")}>Saved Recipes</button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {activeTab === "typed" ? (
                typedRecipesData && typedRecipesData.length > 0 ? (
                  <div className="space-y-4">
                    {typedRecipesData.map((recipe) => (
                      <div key={recipe.id} className="border p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-bold text-lg">{recipe.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
                          </div>
                          <button onClick={() => removeTypedRecipeLocal(recipe.id)} className="modal-btn-remove">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-center text-gray-500 py-8">No custom recipes yet.</p>
              ) : (
                savedRecipesData && savedRecipesData.length > 0 ? (
                  <div className="space-y-4">
                    {savedRecipesData.map((recipe) => (
                      <div key={recipe.id} className="border p-4 rounded-lg flex items-start gap-4">
                        {recipe.image && <img src={recipe.image} alt={recipe.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-lg">{recipe.title}</h4>
                              {recipe.category && <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded-full">{recipe.category}</span>}
                              {recipe.area && <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full ml-1">{recipe.area}</span>}
                              <p className="text-sm text-gray-600 mt-2">{recipe.instructions?.slice(0, 150)}...</p>
                            </div>
                            <button onClick={() => removeSavedRecipe(recipe.id)} className="modal-btn-remove">Remove</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <p className="text-center text-gray-500 py-8">No saved recipes yet.</p>
              )}
            </div>
            <div className="modal-action mt-6">
              <button type="button" onClick={() => savedModalRef.current.close()} className="modal-btn-cancel">Close</button>
            </div>
          </div>
        </dialog>
      </main>

      <ToastContainer position="bottom-right" />
    </>
  );
}

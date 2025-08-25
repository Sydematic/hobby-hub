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

// Headers with current user ID
const getUserHeaders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    toast.error("Please log in to manage recipes");
    return {};
  }
  
  // Try different possible user ID fields
  const userId = user.id || user.user_id || user.userId || user.sub;
  
  console.log("🔍 User object:", user);
  console.log("🔍 User ID being sent:", userId);
  
  if (!userId) {
    toast.error("Invalid user session");
    return {};
  }
  
  return { "x-user-id": userId };
};
  // Normalize recipe data for consistent handling
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

  // Mutation: Create new custom recipe
  const { mutate: createNewRecipe, isLoading: isCreating } = useMutation({
    mutationKey: ["createCustomRecipe"],
    mutationFn: async (newRecipe) => {
      const headers = getUserHeaders();
      if (!headers["x-user-id"]) throw new Error("Authentication required");
      
      const response = await axios.post("/api/recipes/typed", newRecipe, { headers });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["typedRecipes"] });
      queryClient.invalidateQueries({ queryKey: ["allRecipes"] });
      toast.success("✅ Custom recipe added successfully!");
      reset();
      toggleNewRecipeModal();
    },
    onError: (error) => {
      console.error("Create recipe error:", error);
      const message = error.response?.data?.error || "Failed to add custom recipe";
      toast.error(`❌ ${message}`);
    },
  });

  // Mutation: Save MealDB API recipe
  const { mutate: saveMealDBRecipe, isLoading: isSaving } = useMutation({
    mutationKey: ["saveMealDBRecipe"],
    mutationFn: async (meal) => {
      const headers = getUserHeaders();
      if (!headers["x-user-id"]) throw new Error("Authentication required");
      
      const normalized = normalizeRecipe(meal);
      const response = await axios.post("/api/recipes/saved", normalized, { headers });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedAPIRecipes"] });
      queryClient.invalidateQueries({ queryKey: ["allRecipes"] });
      toast.success("✅ Recipe saved to your collection!");
    },
    onError: (error) => {
      console.error("Save recipe error:", error);
      const message = error.response?.data?.error || "Failed to save recipe";
      toast.error(`❌ ${message}`);
    },
  });

  // Mutation: Remove custom recipe
  const { mutate: removeCustomRecipe } = useMutation({
    mutationKey: ["removeCustomRecipe"],
    mutationFn: async (id) => {
      const headers = getUserHeaders();
      if (!headers["x-user-id"]) throw new Error("Authentication required");
      
      const response = await axios.delete(`/api/recipes/${id}`, { headers });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["typedRecipes"] });
      queryClient.invalidateQueries({ queryKey: ["allRecipes"] });
      toast.info("🗑️ Custom recipe removed!");
    },
    onError: (error) => {
      console.error("Remove recipe error:", error);
      const message = error.response?.data?.error || "Failed to remove recipe";
      toast.error(`❌ ${message}`);
    },
  });

  // Mutation: Remove saved API recipe
  const { mutate: removeSavedRecipe } = useMutation({
    mutationKey: ["removeSavedRecipe"],
    mutationFn: async (id) => {
      const headers = getUserHeaders();
      if (!headers["x-user-id"]) throw new Error("Authentication required");
      
      const response = await axios.delete(`/api/recipes/${id}`, { headers });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["savedAPIRecipes"] });
      queryClient.invalidateQueries({ queryKey: ["allRecipes"] });
      toast.info("🗑️ Saved recipe removed!");
    },
    onError: (error) => {
      console.error("Remove saved recipe error:", error);
      const message = error.response?.data?.error || "Failed to remove recipe";
      toast.error(`❌ ${message}`);
    },
  });

  // Query: Fetch custom typed recipes
  const { data: typedRecipesData = [], isLoading: isLoadingTyped, isError: isTypedError } = useQuery({
    queryKey: ["typedRecipes"],
    queryFn: async () => {
      const headers = getUserHeaders();
      if (!headers["x-user-id"]) return [];
      
      const { data } = await axios.get("/api/recipes/saved?source=typed", { headers });
      return data.recipes ?? [];
    },
    enabled: !!getUserHeaders()["x-user-id"],
  });

  // Query: Fetch saved API recipes
  const { data: savedRecipesData = [], isLoading: isLoadingSaved } = useQuery({
    queryKey: ["savedAPIRecipes"],
    queryFn: async () => {
      const headers = getUserHeaders();
      if (!headers["x-user-id"]) return [];
      
      const { data } = await axios.get("/api/recipes/saved?source=mealdb-search", { headers });
      return data.recipes ?? [];
    },
    enabled: !!getUserHeaders()["x-user-id"],
  });

  // Query: Search external recipes
  const { data: searchResponseData, refetch, isFetching } = useQuery({
    queryKey: ["externalRecipes", query],
    queryFn: async () => {
      if (!query.trim()) return { recipes: [] };
      const { data } = await axios.get(`/api/external/recipes?search=${encodeURIComponent(query)}`);
      return data;
    },
    enabled: false,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Modal controls
  const toggleNewRecipeModal = () => {
    if (!modalRef.current) return;
    modalRef.current.open ? modalRef.current.close() : modalRef.current.showModal();
  };

  const toggleSavedRecipesModal = () => {
    if (!savedModalRef.current) return;
    savedModalRef.current.open ? savedModalRef.current.close() : savedModalRef.current.showModal();
  };

  // Form submission for new custom recipe
  const onSubmit = (formData) => {
    if (!formData.title?.trim()) {
      toast.error("Please enter a recipe title");
      return;
    }
    
    createNewRecipe({
      title: formData.title.trim(),
      description: formData.description?.trim() || "",
      image: formData.image?.trim() || "",
      instructions: formData.instructions?.trim() || "",
    });
  };

  // Search functionality
  const handleSearch = () => {
    if (!query.trim()) {
      toast.error("Please enter a search term");
      return;
    }
    refetch();
  };

  const clearSearch = () => {
    setQuery("");
    queryClient.removeQueries({ queryKey: ["externalRecipes"] });
  };

  // Process search results for display
  const displayRecipes = useMemo(() => {
    const searchResults = searchResponseData?.recipes || [];
    if (query.trim() && searchResults.length > 0) {
      return searchResults.map((r) => ({ ...r, source: "mealdb-search" }));
    }
    return [];
  }, [searchResponseData, query]);

  // Check if individual recipe is already saved
  const isIndividualRecipeSaved = (recipe) => {
    const recipeId = recipe.id || recipe.idMeal;
    const recipeTitle = recipe.title || recipe.strMeal;
    return savedRecipesData.some((saved) => 
      (saved.id === recipeId || saved.title === recipeTitle)
    );
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
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
          <h1 className="page-title">My Recipes</h1>
          <p className="page-subtitle">Add your favorite recipes and discover new ones.</p>
          
          <div className="flex justify-center gap-3 mt-4">
            <button 
              className="add-recipe-btn" 
              onClick={toggleNewRecipeModal}
              disabled={isCreating}
            >
              {isCreating ? "Adding..." : "Add Custom Recipe"}
            </button>
            <button 
              className="add-recipe-btn" 
              onClick={toggleSavedRecipesModal}
            >
              My Saved Recipes ({typedRecipesData.length + savedRecipesData.length})
            </button>
          </div>

          {(isLoadingTyped || isLoadingSaved) && (
            <p className="status-msg status-loading mt-2">Loading your recipes...</p>
          )}
          {isTypedError && (
            <p className="status-msg status-error mt-2">Error loading recipes.</p>
          )}
        </div>

        {/* Search Section */}
        <div className="text-center mb-6">
          <div className="flex justify-center gap-2 mb-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for recipes from MealDB..."
              className="border border-gray-300 px-3 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch} 
              className="add-recipe-btn"
              disabled={isFetching}
            >
              {isFetching ? "Searching..." : "Search"}
            </button>
            {query && (
              <button onClick={clearSearch} className="add-recipe-btn">
                Clear
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500">
            Search thousands of recipes from MealDB and save your favorites!
          </p>
        </div>

        {isFetching && <p className="text-center text-blue-600">🔍 Searching recipes...</p>}

        {/* Recipe Search Results Grid */}
        <div className="flex justify-center">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl w-full">
            {displayRecipes.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">
                  {query.trim()
                    ? "No search results found. Try a different search term."
                    : "Search for recipes above to discover new meals to save!"}
                </p>
              </div>
            ) : (
              displayRecipes.map((recipe) => (
                <div key={recipe.id || recipe.idMeal} className="add-recipe-card p-4 rounded-lg shadow text-center">
                  <img 
                    src={recipe.strMealThumb || recipe.image || ""} 
                    alt={recipe.strMeal || recipe.title || "Recipe"} 
                    className="rounded-lg mb-3 mx-auto object-cover w-full h-48" 
                  />
                  <h4 className="text-lg font-bold mb-2">{recipe.strMeal || recipe.title}</h4>
                  <div className="flex gap-2 mb-2 flex-wrap justify-center">
                    {(recipe.strCategory || recipe.category) && (
                      <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-600">
                        {recipe.strCategory || recipe.category}
                      </span>
                    )}
                    {(recipe.strArea || recipe.area) && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">
                        {recipe.strArea || recipe.area}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    {(recipe.strInstructions || recipe.instructions || recipe.description || "").slice(0, 120)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                      MealDB Recipe
                    </span>
                    <button
                      onClick={() => saveMealDBRecipe(recipe)}
                      disabled={isIndividualRecipeSaved(recipe) || isSaving}
                      className={`text-xs px-3 py-1 rounded transition-colors ${
                        isIndividualRecipeSaved(recipe)
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "modal-btn-primary hover:bg-blue-600"
                      }`}
                    >
                      {isIndividualRecipeSaved(recipe) ? "✅ Saved" : isSaving ? "Saving..." : "Save Recipe"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add New Recipe Modal */}
        <dialog ref={modalRef} className="add-recipe-modal">
          <div className="modal-box">
            <button 
              className="modal-close-btn absolute top-4 right-4" 
              onClick={toggleNewRecipeModal}
            >
              <X size={20} />
            </button>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="modal-header">Add Custom Recipe</h3>
              <input 
                {...register("title", { required: "Title is required" })} 
                placeholder="Recipe Title *" 
                className="modal-input" 
              />
              <textarea 
                {...register("description")} 
                placeholder="Description (optional)" 
                className="modal-textarea" 
                rows="3"
              />
              <input 
                {...register("image")} 
                placeholder="Image URL (optional)" 
                className="modal-input" 
              />
              <textarea 
                {...register("instructions")} 
                placeholder="Cooking Instructions (optional)" 
                className="modal-textarea" 
                rows="4"
              />
              <div className="modal-action">
                <button 
                  type="submit" 
                  className="modal-btn-primary"
                  disabled={isCreating}
                >
                  {isCreating ? "Adding..." : "Add Recipe"}
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

        {/* Saved Recipes Modal */}
        <dialog ref={savedModalRef} className="add-recipe-modal">
          <div className="modal-box">
            <button 
              className="modal-close-btn absolute top-4 right-4" 
              onClick={toggleSavedRecipesModal}
            >
              <X size={20} />
            </button>
            <h3 className="modal-header">My Saved Recipes</h3>
            
            {/* Tab Navigation */}
            <div className="flex mb-4 border-b">
              <button 
                className={`tab-btn ${activeTab === "typed" ? "active" : ""}`} 
                onClick={() => setActiveTab("typed")}
              >
                Custom Recipes ({typedRecipesData.length})
              </button>
              <button 
                className={`tab-btn ${activeTab === "api" ? "active" : ""}`} 
                onClick={() => setActiveTab("api")}
              >
                Saved from Search ({savedRecipesData.length})
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {activeTab === "typed" ? (
                typedRecipesData.length > 0 ? (
                  typedRecipesData.map((recipe) => (
                    <div key={recipe.id} className="border p-4 rounded-lg mb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{recipe.title}</h4>
                          {recipe.description && (
                            <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
                          )}
                          {recipe.image && (
                            <img src={recipe.image} alt={recipe.title} className="w-16 h-16 rounded mt-2 object-cover" />
                          )}
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded mt-2 inline-block">
                            Custom Recipe
                          </span>
                        </div>
                        <button 
                          onClick={() => removeCustomRecipe(recipe.id)} 
                          className="modal-btn-remove"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No custom recipes yet.</p>
                    <button 
                      className="add-recipe-btn mt-2" 
                      onClick={() => {
                        toggleSavedRecipesModal();
                        toggleNewRecipeModal();
                      }}
                    >
                      Add Your First Recipe
                    </button>
                  </div>
                )
              ) : (
                savedRecipesData.length > 0 ? (
                  savedRecipesData.map((recipe) => (
                    <div key={recipe.id} className="border p-4 rounded-lg mb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg">{recipe.title}</h4>
                          <div className="flex gap-2 mt-1 flex-wrap">
                            {recipe.category && (
                              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">
                                {recipe.category}
                              </span>
                            )}
                            {recipe.area && (
                              <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
                                {recipe.area}
                              </span>
                            )}
                          </div>
                          {recipe.image && (
                            <img src={recipe.image} alt={recipe.title} className="w-16 h-16 rounded mt-2 object-cover" />
                          )}
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mt-2 inline-block">
                            From MealDB
                          </span>
                        </div>
                        <button 
                          onClick={() => removeSavedRecipe(recipe.id)} 
                          className="modal-btn-remove"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No saved recipes yet.</p>
                    <button 
                      className="add-recipe-btn mt-2" 
                      onClick={toggleSavedRecipesModal}
                    >
                      Search & Save Recipes
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </dialog>
      </main>
    </>
  );
}
// AddRecipe.jsx
import React, { useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAxiosClient from "./axios-instance"; // adjust path if needed
import './addrecipe.css';

export default function AddRecipe() {
  const queryClient = useQueryClient();
  const modalRef = useRef(null);
  const { register, handleSubmit, reset } = useForm();

  // 🟢 Create new recipe mutation
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

  // 🟢 Fetch recipes
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const axiosInstance = await getAxiosClient();
      const { data } = await axiosInstance.get("/recipes");
      return data;
    },
  });

  const recipes = data?.recipes || [];

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

 const RecipeItemList = () => {
  return (
    <>
      {recipes.map((recipe) => (
        <div key={recipe.id} className="add-recipe-card">
          <h4>{recipe.title}</h4>
          <p>{recipe.description}</p>
        </div>
      ))}
    </>
  );
};


 const RecipeModal = () => (
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
          <button type="button" onClick={toggleNewRecipeModal} className="modal-btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </dialog>

  );

  const NewRecipeButton = () => (
    <button className="add-recipe-btn mb-4" onClick={toggleNewRecipeModal}>
      Add Recipe
    </button>
  );

  return (
  <main className="add-recipe-page p-4 max-w-2xl mx-auto">
    <div className="add-recipe-page-header text-center">
      <h1>Recipes</h1>
      <p>Add your favorite recipes below.</p>
      <button className="add-recipe-btn" onClick={toggleNewRecipeModal}>
        Add Recipe
      </button>
      {isLoading && <p className="mt-2">Loading...</p>}
      {isError && <p className="mt-2">Error loading recipes.</p>}
      {!isLoading && recipes.length === 0 && <p className="mt-2">No recipes found.</p>}
    </div>
    <div className="add-recipe-cards-container">
      <RecipeItemList />
    </div>
    <RecipeModal />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
  </main>
);


}

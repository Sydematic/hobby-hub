// FoodPage.jsx

import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Plus, Star, Utensils, Users, ChefHat } from "lucide-react";

import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import './food.css';

export default function FoodPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">HH</span>
              </div>
              <span className="font-alumniSans text-xl font-normal gradient-text">HobbyHub</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium text-muted-foreground">
              <Link to="/travel" className="hover:text-foreground transition-colors">Travel</Link>
              <Link to="/workout" className="hover:text-foreground transition-colors">Workout</Link>
              <Link to="/food" className="hover:text-foreground transition-colors text-foreground">Food</Link>
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            {/* Dashboard Button */}
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button className="hero-btn-outline w-full md:w-auto" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

{/* Page Header */}
<main className="flex-1 space-y-6 p-4 md:p-8">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 food-page-header">
    <div>
      <h1>Food</h1>
      <p>Discover, save, and organize your culinary adventures</p>
    </div>

          {/* Add Recipe Button */}
          <Button className="hero-btn-primary" asChild>
            <Link to="/food/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Recipe
            </Link>
          </Button>
        </div>

    {/* Tabs */}
<Tabs defaultValue="recipes" className="space-y-4 food-tabs">
  <TabsList>
    {['recipes', 'restaurants', 'meal-plan'].map((tab) => (
      <TabsTrigger
        key={tab}
        value={tab}
      >
        {tab
          .split('-')
          .map((w) => w[0].toUpperCase() + w.slice(1))
          .join(' ')}
      </TabsTrigger>
    ))}
  </TabsList>





{/* Recipes Tab */}
<TabsContent value="recipes" className="space-y-8">
  <div className="food-cards-container flex flex-wrap justify-center gap-6">

    {/* Recipe Card 1 */}
    <Card className="food-card flex flex-col justify-between overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl hover:scale-105 transition-all duration-300 max-w-xs">
      <div className="food-card-image-container mb-4">
        <img
          src="/pasta-carbonara.png"
          alt="Pasta Carbonara"
          className="food-card-image"
        />
      </div>
      <CardHeader className="food-card-header pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="food-card-title">Pasta Carbonara</CardTitle>
        
        </div>
        <CardDescription className="food-card-description flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" /> 30 minutes
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-3 w-3" /> 4 servings
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow mt-2">
        <p className="text-sm text-gray-500">
          Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper. Simple yet elegant.
        </p>
        <div className="flex items-center mt-2">
          <ChefHat className="text-sm text-gray-500"/>
          <span className="text-sm text-gray-500">Intermediate</span>
        </div>
      </CardContent>
      <CardFooter className="food-card-footer mt-auto">
        <Button variant="outline" size="sm" className="w-full">View Recipe</Button>
      </CardFooter>
    </Card>

    {/* Recipe Card 2 (Thai Curry - no changes) */}
    <Card className="food-card flex flex-col justify-between overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl hover:scale-105 transition-all duration-300 max-w-xs">
      <div className="food-card-image-container">
        <img
          src="/thai-green-curry.png"
          alt="Thai Green Curry"
          className="food-card-image"
        />
      </div>
      <CardHeader className="food-card-header pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="food-card-title">Thai Green Curry</CardTitle>
         </div>
        <CardDescription className="food-card-description flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" /> 45 minutes
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-3 w-3" /> 6 servings
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-500">
          Aromatic curry with coconut milk, vegetables, and your choice of protein. Authentic Thai flavors.
        </p>
        <div className="flex items-center mt-2">
          <ChefHat className="text-sm text-gray-500" />
          <span className="text-sm text-gray-500">Advanced</span>
        </div>
      </CardContent>
      <CardFooter className="food-card-footer mt-auto">
        <Button variant="outline" size="sm" className="w-full">View Recipe</Button>
      </CardFooter>
    </Card>

    {/* Recipe Card 3 */}
    <Card className="food-card flex flex-col justify-between overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl hover:scale-105 transition-all duration-300 max-w-xs">
      <div className="food-card-image-container mb-4">
        <img
          src="/Avocado_toast.jpg"
          alt="Avocado Toast"
          className="food-card-image"
        />
      </div>
      <CardHeader className="food-card-header pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="food-card-title">Avocado Toast</CardTitle>
        </div>
        <CardDescription className="food-card-description flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" /> 10 minutes
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-3 w-3" /> 2 servings
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow mt-2">
        <p className="text-sm text-gray-500">
          Simple and nutritious breakfast with mashed avocado, whole grain toast, and fresh toppings.
        </p>
        <div className="flex items-center mt-2">
          <ChefHat className="text-sm text-gray-500" />
          <span className="text-sm text-gray-500">Beginner</span>
        </div>
      </CardContent>
      <CardFooter className="food-card-footer mt-auto">
        <Button variant="outline" size="sm" className="w-full">View Recipe</Button>
      </CardFooter>
    </Card>

  </div>


</TabsContent>

{/* Restaurants Tab */}
<TabsContent value="restaurants" className="space-y-4">
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="aspect-video overflow-hidden">
        <img
          src="/placeholder.svg?height=200&width=300&text=Italian+Restaurant"
          alt="Italian Restaurant"
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>Trattoria Milano</CardTitle>
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3" />
          </div>
        </div>
        <CardDescription className="flex items-center justify-between">
          <div className="flex items-center">
            <Utensils className="mr-1 h-3 w-3" /> Italian Cuisine
          </div>
          <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">$$</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Authentic Italian cuisine in a cozy atmosphere. Famous for homemade pasta and wood-fired pizza.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">View Details</Button>
      </CardFooter>
    </Card>

    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="aspect-video overflow-hidden">
        <img
          src="/placeholder.svg?height=200&width=300&text=Sushi+Restaurant"
          alt="Sushi Restaurant"
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>Sushi Zen</CardTitle>
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
        <CardDescription className="flex items-center justify-between">
          <div className="flex items-center">
            <Utensils className="mr-1 h-3 w-3" /> Japanese Cuisine
          </div>
          <Badge variant="outline" className="border-purple-300 text-purple-700 bg-purple-50">$$$</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Premium sushi and Japanese cuisine with fresh fish and traditional preparation methods.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">View Details</Button>
      </CardFooter>
    </Card>

    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="aspect-video overflow-hidden">
        <img
          src="/placeholder.svg?height=200&width=300&text=Vegetarian+Restaurant"
          alt="Vegetarian Restaurant"
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>Green Garden</CardTitle>
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <Star className="h-3 w-3" />
          </div>
        </div>
        <CardDescription className="flex items-center justify-between">
          <div className="flex items-center">
            <Utensils className="mr-1 h-3 w-3" /> Vegetarian
          </div>
          <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">$$</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Creative plant-based cuisine using locally sourced organic ingredients. Innovative and delicious.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">View Details</Button>
      </CardFooter>
    </Card>

  </div>


</TabsContent>

          {/* Meal Plan Tab */}
          <TabsContent value="meal-plan" className="space-y-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
              <CardHeader>
                <CardTitle>Weekly Meal Plan</CardTitle>
                <CardDescription>August 5 - August 11, 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                    <div key={day}>
                      <h3 className="font-medium mb-3">{day}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="p-3 border border-orange-200 rounded-md bg-gradient-to-br from-orange-50 to-yellow-50">
                          <p className="text-xs text-orange-600 mb-1">Breakfast</p>
                          <p className="text-sm font-medium text-orange-900">
                            {index === 0
                              ? "Avocado Toast"
                              : index === 1
                              ? "Smoothie Bowl"
                              : index === 2
                              ? "Oatmeal with Berries"
                              : index === 3
                              ? "Greek Yogurt Parfait"
                              : index === 4
                              ? "Scrambled Eggs"
                              : index === 5
                              ? "Pancakes"
                              : "French Toast"}
                          </p>
                        </div>
                        <div className="p-3 border border-blue-200 rounded-md bg-gradient-to-br from-blue-50 to-cyan-50">
                          <p className="text-xs text-blue-600 mb-1">Lunch</p>
                          <p className="text-sm font-medium text-blue-900">
                            {index === 0
                              ? "Greek Salad"
                              : index === 1
                              ? "Chicken Wrap"
                              : index === 2
                              ? "Quinoa Bowl"
                              : index === 3
                              ? "Sushi Bowl"
                              : index === 4
                              ? "Caesar Salad"
                              : index === 5
                              ? "Burger & Fries"
                              : "Pasta Salad"}
                          </p>
                        </div>
                        <div className="p-3 border border-purple-200 rounded-md bg-gradient-to-br from-purple-50 to-pink-50">
                          <p className="text-xs text-purple-600 mb-1">Dinner</p>
                          <p className="text-sm font-medium text-purple-900">
                            {index === 0
                              ? "Pasta Carbonara"
                              : index === 1
                              ? "Thai Green Curry"
                              : index === 2
                              ? "Grilled Salmon"
                              : index === 3
                              ? "Chicken Stir Fry"
                              : index === 4
                              ? "Pizza Night"
                              : index === 5
                              ? "BBQ Ribs"
                              : "Roast Chicken"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Edit Meal Plan</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}


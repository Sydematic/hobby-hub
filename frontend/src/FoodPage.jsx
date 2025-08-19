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
      <header className="navbar">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="hh-icon gradient-text">HH</div>
            <span className="font-alumniSans text-[23px] font-normal gradient-text">HobbyHub</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center text-muted-foreground text-sm font-medium space-x-6">
           <Link to="/food" className="hover:text-foreground transition-colors">Food</Link>
           <Link to="/travel" className="hover:text-foreground transition-colors">Travel</Link>
           <Link to="/workout" className="hover:text-foreground transition-colors">Workout</Link>
            
          </nav>

          {/* Go Back Button */}
          <Button className="get-started-btn flex items-center space-x-2">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </Button>
        </div>
      </header>

   <main className="flex-1 w-full p-4 md:p-8 flex justify-center">
  <div className="food-page-container w-full max-w-7xl bg-background rounded-2xl shadow-md p-6 md:p-8">

    <Tabs defaultValue="recipes" className="food-tabs">

  {/* Hero Section with Glow Background */}
<div className="food-hero-section relative w-full">

  {/* Background Glow Layer */}
  <div className="food-hero-background absolute -inset-4 bg-gradient-to-tr from-orange-300 via-orange-200 to-orange-400 filter blur-3xl rounded-3xl z-0"></div>

  {/* Hero Content */}
  <div className="food-hero-container relative z-10 flex flex-col md:flex-row md:items-center md:justify-center gap-4 w-full max-w-4xl p-6 rounded-2xl border-2 border-transparent bg-transparent shadow-none mx-auto">
    
    {/* Your hero text, buttons, tabs triggers here */}
         {/* Hero Text */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="font-[Alumni_Sans] font-bold text-[4rem] md:text-[4.5rem] text-[oklch(0.25_0.15_40)] bg-clip-text text-transparent
                           bg-[linear-gradient(90deg,#f97316,#facc15,#fb923c)]">
              Food & Recipes
            </h1>
            <p className="mt-4 text-[#6b7280] font-[Alumni_Sans] text-lg md:text-xl max-w-md mx-auto md:mx-0">
              Discover, save, and organize your culinary adventures
            </p>
          </div>

          {/* Add Recipe Button */}
          <div className="food-hero-buttons flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
            <Button className="hero-btn-primary food-add-recipe-btn" asChild size="lg">
              <Link to="/addrecipe">
                <Plus className="h-4 w-4 mr-2" />
                Add Recipe
              </Link>
            </Button>
          </div>

          {/* Tabs triggers inside hero box */}
          <TabsList className="food-tabs-list flex gap-4 mt-4 md:mt-0">
            {['recipes','restaurants','meal-plan'].map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}
              </TabsTrigger>
            ))}
          </TabsList>

        </div>

        {/* Background Glow Layer */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-orange-300 via-orange-200 to-orange-400 filter blur-3xl rounded-3xl z-0"></div>
      </div>



            {/* Tabs content outside hero box */}

            {/* Recipes Tab */}
            <TabsContent value="recipes" className="space-y-8 mt-6">
              <div className="food-cards-container">

                {/* Recipe Card 1 */}
                <Card className="food-card flex flex-col justify-between overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl hover:scale-105 transition-all duration-300 max-w-xs">
                  <div className="food-card-image-container mb-4">
                    <img src="/pasta-carbonara.png" alt="Pasta Carbonara" className="food-card-image" />
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

                {/* Recipe Card 2 */}
                <Card className="food-card flex flex-col justify-between overflow-hidden border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 hover:shadow-xl hover:scale-105 transition-all duration-300 max-w-xs">
                  <div className="food-card-image-container">
                    <img src="/thai-green-curry.png" alt="Thai Green Curry" className="food-card-image" />
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
                    <img src="/Avocado_toast.jpg" alt="Avocado Toast" className="food-card-image" />
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
<TabsContent value="restaurants" className="space-y-4 tab-content-spacing">
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

    {/* Restaurant Card Example */}
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
      <div className="aspect-video overflow-hidden">
        <img
          src="/cozy-italian-pasta.jpg"
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
       <CardDescription className="flex items-center justify-between food-card-description-black">
  <div className="flex items-center">
    <Utensils className="mr-1 h-3 w-3" /> Italian Cuisine
  </div>
  <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">$$</Badge>
</CardDescription>
      </CardHeader>
      <CardContent>
  <p className="food-card-content-black text-sm">
    Authentic Italian cuisine in a cozy atmosphere. Famous for homemade pasta and wood-fired pizza.
  </p>
</CardContent>
      <CardFooter>
  <Button 
    variant="outline" 
    size="sm" 
    className="meal-plan-view-btn w-full"
  >
    View Details
  </Button>
</CardFooter>
    </Card>

  </div>
</TabsContent>

{/* Meal Plan Tab */}
<TabsContent value="meal-plan" className="space-y-4 tab-content-spacing text-[#6b7280]">
  <Card className="border-0 shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50">
    <CardHeader className="pb-4">
  <CardTitle className="text-[#000000]">Weekly Meal Plan: August 17 - August 24, 2025</CardTitle>
</CardHeader>


    <CardContent className="text-[#000000]">
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
                    ? "Grilled Cheese"
                    : "Pasta Salad"}
                </p>
              </div>
              <div className="p-3 border border-green-200 rounded-md bg-gradient-to-br from-green-50 to-lime-50">
                <p className="text-xs text-green-600 mb-1">Dinner</p>
                <p className="text-sm font-medium text-green-900">
                  {index === 0
                    ? "Salmon & Veggies"
                    : index === 1
                    ? "Stir-fried Tofu"
                    : index === 2
                    ? "Chicken Curry"
                    : index === 3
                    ? "Beef Tacos"
                    : index === 4
                    ? "Shrimp Pasta"
                    : index === 5
                    ? "Veggie Lasagna"
                    : "BBQ Chicken"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
</TabsContent>

          </Tabs>
        </div>
      </main>
    </div>
  );
}


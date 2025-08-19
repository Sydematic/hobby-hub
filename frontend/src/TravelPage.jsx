import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Plus, Star, Clock } from "lucide-react";

import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Badge } from "./components/ui/badge";
import './food.css';
export default function TravelPage() {
  return (
    
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  HH
                </span>
              </div>
              <span className="font-bold text-xl">HobbyHub</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                to="/travel"
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                Travel
              </Link>
              <Link
                to="/workout"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Workout
              </Link>
              <Link
                to="/food"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Food
              </Link>
            </nav>
          </div>

          {/* Dashboard button */}
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button variant="outline" className="w-full md:w-auto">
                <Link to="/dashboard" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Travel</h1>
            <p className="text-muted-foreground">
              Plan your adventures and track your journeys
            </p>
          </div>
          <Button>
            <Link to="/travel/new" className="flex items-center">
              <Plus className="mr-2 h-4 w-4" />
              Add Wishlist
            </Link>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Trips</TabsTrigger>
            
          </TabsList>

          {/* Upcoming Trips */}
          <TabsContent value="upcoming" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Japan */}
              <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=Tokyo+Skyline"
                    alt="Tokyo cityscape with Mount Fuji"
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Japan Adventure</CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    >
                      15 days
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    Oct 15 - Oct 30, 2025
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="mr-1 h-3 w-3" />
                    Tokyo, Kyoto, Osaka
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    45 days to go
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                  >
                    View Itinerary
                  </Button>
                </CardFooter>
              </Card>

              {/* Paris */}
              <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=Paris+Eiffel+Tower"
                    alt="Paris Eiffel Tower"
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Weekend in Paris</CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    >
                      3 days
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    Sep 3 - Sep 5, 2025
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="mr-1 h-3 w-3" />
                    Paris, France
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    28 days to go
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                  >
                    View Itinerary
                  </Button>
                </CardFooter>
              </Card>

              {/* Costa Rica */}
              <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=Costa+Rica+Beach"
                    alt="Costa Rica rainforest and beach"
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Costa Rica Retreat</CardTitle>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    >
                      10 days
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    Dec 10 - Dec 20, 2025
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="mr-1 h-3 w-3" />
                    San José, Arenal, Manuel Antonio
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    126 days to go
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                  >
                    View Itinerary
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Past Trips */}
          <TabsContent value="past" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* NYC */}
              <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=NYC+Skyline"
                    alt="New York City skyline"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>New York City</CardTitle>
                    <div className="flex items-center">
                      {Array(5)
                        .fill(null)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                          />
                        ))}
                    </div>
                  </div>
                  <CardDescription className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    May 5 - May 10, 2025
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    Manhattan, Brooklyn, Queens
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                  >
                    View Memories
                  </Button>
                </CardFooter>
              </Card>

              {/* Barcelona */}
              <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=Barcelona+Sagrada"
                    alt="Barcelona Sagrada Familia"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Barcelona Weekend</CardTitle>
                    <div className="flex items-center">
                      {[1, 2, 3, 4].map((i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                        />
                      ))}
                      <Star className="h-3 w-3" />
                    </div>
                  </div>
                  <CardDescription className="flex items-center">
                    <Calendar className="mr-1 h-3 w-3" />
                    March 15 - March 18, 2025
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    Barcelona, Spain
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                  >
                    View Memories
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Bali */}
              <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src="/bali-rice-temples.png" height={300} width={300}
                    alt="Bali rice terraces" 
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>Bali Getaway</CardTitle>
                  <CardDescription>
                    Tropical paradise adventure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    Ubud, Seminyak, Canggu
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                  >
                    Plan Trip
                  </Button>
                </CardFooter>
              </Card>

              {/* Iceland */}
              <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src="/Reykjavik, Ring Road, Blue Lagoon.jpg" height={300} width={300}
                    alt="Iceland waterfalls and northern lights"
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>Iceland Road Trip</CardTitle>
                  <CardDescription>
                    Northern lights and natural wonders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    Reykjavik, Ring Road, Blue Lagoon
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                  >
                    Plan Trip
                  </Button>
                </CardFooter>
              </Card>

              {/* Swiss Alps */}
              <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src="/placeholder.svg?height=200&width=300&text=Swiss+Alps"
                    alt="Swiss Alps mountains"
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>Swiss Alps</CardTitle>
                  <CardDescription>
                    Mountain hiking adventure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    Zermatt, Interlaken, Jungfraujoch
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-100 hover:border-blue-300"
                  >
                    Plan Trip
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

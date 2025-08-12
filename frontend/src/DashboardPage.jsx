import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Dumbbell, Utensils, Star, Users, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col w-full bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center w-full px-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">HH</span>
            </div>
            <span className="font-bold text-xl text-foreground">HobbyHub</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-6 text-sm font-medium text-muted-foreground ml-8">
            <Link to="/travel" className="hover:text-foreground/80 transition-colors">
              Travel
            </Link>
            <Link to="/workout" className="hover:text-foreground/80 transition-colors">
              Workout
            </Link>
            <Link to="/food" className="hover:text-foreground/80 transition-colors">
             Contact
            </Link>
          </nav>

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* Get Started Button */}
          <div className="flex items-center">
            <Button className="w-full md:w-auto" asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-orange-500/20">
          <div className="w-full px-4 md:px-8 max-w-full mx-auto text-center flex flex-col items-center space-y-4">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Your Hobbies,{" "}
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Organized
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Track your travels and adventures all in one place. Plan better,
                achieve more, and never lose track of your passions.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                asChild
              >
                <Link to="/dashboard">
                  Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="w-full px-4 md:px-8 max-w-full mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comprehensive tools to manage and enhance your favorite hobbies
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Compass className="h-8 w-8 text-blue-600" />
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <Compass className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl text-blue-900">Travel Planning</CardTitle>
                  <CardDescription>
                    Plan your next adventure with detailed itineraries and destination guides
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Trip planning and itineraries</li>
                    <li>• Destination wishlist</li>
                    <li>• Travel memories and photos</li>
                    <li>• Budget tracking</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/travel">Explore Travel</Link>
                  </Button>
                </CardFooter>
              </Card>

             
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="w-full px-4 md:px-8 max-w-full mx-auto">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">10,000+</div>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">50,000+</div>
                <p className="text-sm text-muted-foreground">Activities Tracked</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
                  <Star className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold">4.9/5</div>
                <p className="text-sm text-muted-foreground">User Rating</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="w-full px-4 md:px-8 max-w-full mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Get Started?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who are already organizing their hobbies with HobbyHub
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button size="lg" className="w-full" asChild>
                  <Link to="/dashboard">
                    Start Free Today <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  No credit card required. Start organizing in minutes.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-8 border-t">
        <p className="text-xs text-muted-foreground">© 2025 HobbyHub. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link to="#" className="text-xs hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  );
}

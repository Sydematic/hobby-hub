import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Dumbbell,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function WorkoutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  HH
                </span>
              </div>
              <span className="font-bold text-xl">HobbyHub</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/travel"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Travel
              </Link>
              <Link
                href="/workout"
                className="transition-colors hover:text-foreground/80 text-foreground"
              >
                Workout
              </Link>
              <Link
                href="/food"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                Food
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button variant="outline" className="w-full md:w-auto" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 space-y-4 p-4 md:p-8">
        {/* Page Title + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Workout</h1>
            <p className="text-muted-foreground">
              Track your fitness journey and achieve your goals
            </p>
          </div>
          <Button asChild>
            <Link href="/workout/new">
              <Plus className="mr-2 h-4 w-4" /> Log Workout
            </Link>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="routines" className="space-y-4">
          <TabsList>
            <TabsTrigger value="routines">Routines</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          {/* Routines Tab */}
          <TabsContent value="routines" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Strength */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Full Body Strength</CardTitle>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      Strength
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" /> 45 minutes • 6 exercises
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Squats</span>
                      <span className="text-muted-foreground">3 × 12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Bench Press</span>
                      <span className="text-muted-foreground">3 × 10</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Deadlifts</span>
                      <span className="text-muted-foreground">3 × 8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Pull-ups</span>
                      <span className="text-muted-foreground">3 × 8</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      +2 more exercises
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">
                    Start Workout
                  </Button>
                </CardFooter>
              </Card>

              {/* Cardio */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>HIIT Cardio</CardTitle>
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
                      Cardio
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" /> 20 minutes • High
                    intensity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Jumping Jacks</span>
                      <span className="text-muted-foreground">30 sec</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Mountain Climbers</span>
                      <span className="text-muted-foreground">30 sec</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Burpees</span>
                      <span className="text-muted-foreground">30 sec</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Rest</span>
                      <span className="text-muted-foreground">15 sec</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      4 rounds total
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">
                    Start Workout
                  </Button>
                </CardFooter>
              </Card>

              {/* Yoga */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>Yoga Flow</CardTitle>
                    <Badge
                      variant="outline"
                      className="border-blue-300 text-blue-700 bg-blue-50"
                    >
                      Flexibility
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" /> 30 minutes • Relaxing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sun Salutation</span>
                      <span className="text-muted-foreground">5 min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Warrior Poses</span>
                      <span className="text-muted-foreground">10 min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Balance Poses</span>
                      <span className="text-muted-foreground">10 min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Relaxation</span>
                      <span className="text-muted-foreground">5 min</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full">
                    Start Workout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          {/* ... keep same content as your original ... */}

          {/* Progress Tab */}
          {/* ... keep same content as your original ... */}
        </Tabs>
      </main>
    </div>
  );
}

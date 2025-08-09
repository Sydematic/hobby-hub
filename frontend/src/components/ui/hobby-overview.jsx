"use client"

import { useState, useEffect } from "react"
import { Compass, Dumbbell, Utensils, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function HobbyOverview() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with mock data
    const mockStats = {
      travel: {
        completed: 24,
        planned: 3,
        progress: 85,
        trend: "+15% this month",
      },
      workout: {
        completed: 89,
        planned: 5,
        progress: 72,
        trend: "+8% this week",
      },
      food: {
        completed: 42,
        planned: 8,
        progress: 90,
        trend: "+12% this month",
      },
    }

    setTimeout(() => {
      setStats(mockStats)
      setLoading(false)
    }, 800)
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hobby Overview</CardTitle>
          <CardDescription>Your activity across all hobbies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 w-20 bg-muted rounded"></div>
                  <div className="h-4 w-16 bg-muted rounded"></div>
                </div>
                <div className="h-2 w-full bg-muted rounded mb-1"></div>
                <div className="h-3 w-24 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hobby Overview</CardTitle>
        <CardDescription>Your activity across all hobbies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Compass className="h-2 w-2 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-900">Travel</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>{stats?.travel.trend}</span>
              </div>
            </div>
            <Progress value={stats?.travel.progress} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-cyan-500" />
            <p className="text-xs text-muted-foreground">
              {stats?.travel.completed} places visited • {stats?.travel.planned} trips planned
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                  <Dumbbell className="h-2 w-2 text-white" />
                </div>
                <span className="text-sm font-medium text-green-900">Workout</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>{stats?.workout.trend}</span>
              </div>
            </div>
            <Progress value={stats?.workout.progress} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-emerald-500" />
            <p className="text-xs text-muted-foreground">
              {stats?.workout.completed} workouts completed • {stats?.workout.planned} routines active
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Utensils className="h-2 w-2 text-white" />
                </div>
                <span className="text-sm font-medium text-orange-900">Food</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>{stats?.food.trend}</span>
              </div>
            </div>
            <Progress value={stats?.food.progress} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-red-500" />
            <p className="text-xs text-muted-foreground">
              {stats?.food.completed} recipes saved • {stats?.food.planned} to try
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

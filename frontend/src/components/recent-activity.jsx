import React, { useState, useEffect } from "react";
import { Compass, Dumbbell, Utensils, Clock } from "lucide-react";

// Change relative imports to absolute alias imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function RecentActivity() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with mock data
    const mockActivities = [
      {
        id: '1',
        type: 'workout',
        title: 'Completed HIIT Workout',
        description: '45 minutes • 320 calories burned',
        time: '2 hours ago',
        icon: <Dumbbell className="h-4 w-4" />
      },
      {
        id: '2',
        type: 'food',
        title: 'Added Thai Green Curry',
        description: 'New recipe saved to collection',
        time: '4 hours ago',
        icon: <Utensils className="h-4 w-4" />
      },
      {
        id: '3',
        type: 'travel',
        title: 'Planned Japan Trip',
        description: 'Tokyo, Kyoto, Osaka • Oct 15-30',
        time: '1 day ago',
        icon: <Compass className="h-4 w-4" />
      },
      {
        id: '4',
        type: 'workout',
        title: 'Updated Fitness Goal',
        description: 'Weekly target: 5 workouts',
        time: '2 days ago',
        icon: <Dumbbell className="h-4 w-4" />
      },
      {
        id: '5',
        type: 'food',
        title: 'Visited Sushi Zen',
        description: 'Rated 5 stars • Added to favorites',
        time: '3 days ago',
        icon: <Utensils className="h-4 w-4" />
      }
    ]

    setTimeout(() => {
      setActivities(mockActivities)
      setLoading(false)
    }, 600)
  }, [])

  const getActivityColor = (type) => {
    switch (type) {
      case 'travel':
        return 'text-blue-600 bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200'
      case 'workout':
        return 'text-green-600 bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200'
      case 'food':
        return 'text-orange-600 bg-gradient-to-br from-orange-100 to-red-100 border border-orange-200'
      default:
        return 'text-gray-500 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest hobby updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center space-x-4 animate-pulse">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-muted rounded"></div>
                  <div className="h-3 w-1/2 bg-muted rounded"></div>
                </div>
                <div className="h-3 w-16 bg-muted rounded"></div>
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
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest hobby updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4">
              <Avatar className={`h-10 w-10 ${getActivityColor(activity.type)}`}>
                <AvatarFallback className={getActivityColor(activity.type)}>
                  {activity.icon}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <p className="text-sm font-medium leading-none">
                  {activity.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {activity.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Dumbbell, Utensils, Plus, TrendingUp, Calendar, Target } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { HobbyOverview } from "@/components/ui/hobby-overview";
import { RecentActivity } from "@/components/recent-activity";

export default function DashboardPage() {
  const [hobbies, setHobbies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHobbies() {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found. Please login.');

        const res = await fetch('http://localhost:5000/api/hobbies', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Failed to fetch hobbies');
        }

        const data = await res.json();
        setHobbies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHobbies();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">HH</span>
              </div>
              <span className="font-bold text-xl">HobbyHub</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/travel" className="transition-colors hover:text-foreground/80 text-foreground/60">Travel</Link>
              <Link href="/workout" className="transition-colors hover:text-foreground/80 text-foreground/60">Workout</Link>
              <Link href="/food" className="transition-colors hover:text-foreground/80 text-foreground/60">Food</Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <Button variant="outline" className="w-full md:w-auto" asChild>
                <Link href="/">Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your hobbies.</p>
          </div>
        </div>

        {/* Display error or loading states */}
        {loading && <p>Loading your hobbies...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {/* Show fetched hobbies */}
        {!loading && !error && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Your Hobbies</h2>
            {hobbies.length === 0 && <p>You have no hobbies yet. Add some!</p>}
            <ul className="list-disc pl-6 space-y-1">
              {hobbies.map((hobby) => (
                <li key={hobby.id}>
                  <strong>{hobby.name}</strong>: {hobby.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Tabs defaultValue="overview" className="space-y-4 mt-8">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="travel">Travel</TabsTrigger>
            <TabsTrigger value="workout">Workout</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
          </TabsList>

          {/* ...rest of your tabs as before... */}
          {/* You can keep your existing cards and components here */}
          {/* For brevity, I’m not repeating the entire existing JSX */}
        </Tabs>
      </main>
    </div>
  );
}

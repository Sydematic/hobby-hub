import React, { useState } from "react"
import { Search } from 'lucide-react'

// Adjust import path based on where your Input component is
import { Input } from "../ui/input"

export function SearchForm() {
  const [query, setQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, this would search across the app
    console.log("Searching for:", query)
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search..."
        className="pl-8 h-9"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  )
}

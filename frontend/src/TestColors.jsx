import React from "react";

export default function TestColors() {
  return (
    <div className="flex min-h-screen flex-col w-full bg-background text-foreground p-8">
      <h1 className="text-4xl font-bold mb-4">Tailwind + CSS Vars Test</h1>
      <p>This should have background and text colors from CSS variables.</p>
      <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded">
        Primary Button
      </button>
    </div>
  );
}

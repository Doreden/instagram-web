import React from "react";
import { Route, Routes } from "react-router";
import { StoryIndex } from "./pages/StoryIndex";
export function RootCmp() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<StoryIndex />} />
      </Routes>
    </main>
  );
}

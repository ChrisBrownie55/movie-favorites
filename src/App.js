import React, { useState } from 'react'
import NewMovie from './components/NewMovie'

import './App.css'
import MovieList from './components/MovieList'

function App() {
  return (
    <main className="min-h-screen p-8 App">
      <h1 className="text-xl font-semibold text-center md:text-left">
        Your Movies
      </h1>
      <MovieList />
      <NewMovie />
    </main>
  )
}

export default App

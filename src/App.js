import React, { useState } from 'react'
import NewMovie from './components/NewMovie'

import './App.css'
import MovieList from './components/MovieList'

function App() {
  return (
    <main className="min-h-screen App">
      <MovieList />
      <NewMovie />
    </main>
  )
}

export default App

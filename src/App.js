import React from 'react'
import NewMovie from './components/NewMovie'

import './App.css'
import MovieList from './components/MovieList'

function App() {
  return (
    <main className="min-h-screen p-8 pb-40 md:pb-36 flex flex-col App">
      <h1 className="text-4xl text-purple-dark font-semibold text-center md:text-left mb-4">
        Your Movies
      </h1>
      <MovieList />
      <NewMovie />
    </main>
  )
}

export default App

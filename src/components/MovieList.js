import React, { useState, useEffect } from 'react'
import Movie, { MovieSkeleton } from './Movie'

import { connect } from '../store'
import { storage } from 'kv-storage-polyfill'

function MovieList({ movies }) {
  const [haveMoviesLoaded, setMoviesLoaded] = useState(false)

  useEffect(() => {
    async function loadMovies() {
      try {
        const movies = await storage.get('movies')
        loadMovies(movies)
        setMoviesLoaded(true)
      } catch (error) {
        console.error(error)
      }
    }

    loadMovies()
  }, [setMoviesLoaded])

  if (!haveMoviesLoaded) {
    return (
      <div className="flex flex-col p-4">
        <MovieSkeleton />
        <MovieSkeleton />
        <MovieSkeleton />
      </div>
    )
  }

  return <p>{JSON.stringify(movies)}</p>
}

export default connect(MovieList)

import React, { useState, useEffect } from 'react'
import { connect } from '../store'
import { storage } from 'kv-storage-polyfill'

function MovieList({ movies }) {
  const [haveMoviesLoaded, setMoviesLoaded] = useState(false)

  useEffect(() => {
    async function loadMovies() {
      try {
        const movies = await storage.get('movies')
        loadMovies(movies)
      } catch (error) {
        console.error(error)
      }
    }

    loadMovies()
  }, [setMoviesLoaded])

  return <p>{JSON.stringify(movies)}</p>
}

export default connect(MovieList)

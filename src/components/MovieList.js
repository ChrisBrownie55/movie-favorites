import React, { useState, useEffect } from 'react'
import Movie, { MovieSkeleton } from './Movie'

import { connect } from '../store'
import { editMovie } from '../store/actions'
import { storage } from 'kv-storage-polyfill'

function MovieList({ movies }) {
  const [haveMoviesLoaded, setMoviesLoaded] = useState(false)

  useEffect(() => {
    async function loadMovies() {
      try {
        const movies = await storage.get('movies')

        if (Array.isArray(movies)) {
          loadMovies(movies)
        }

        setMoviesLoaded(true)
      } catch (error) {
        console.error(error)
      }
    }

    loadMovies()
  }, [setMoviesLoaded])

  if (!haveMoviesLoaded) {
    return (
      <div className="flex flex-col">
        <MovieSkeleton />
        <MovieSkeleton />
        <MovieSkeleton />
      </div>
    )
  }

  console.log(movies)

  return (
    <section className="flex flex-col">
      {movies.map((movie, index) => (
        <Movie
          className="mb-8 md:mb-4"
          value={movie.name}
          onChange={name => {
            editMovie(index, { ...movie, name })
          }}
          genre={movie.genre}
          onGenreChange={genre => {
            editMovie(index, { ...movie, genre })
          }}
          placeholder="Movie name"
          rating={movie.rating}
          onRatingChange={rating => {
            editMovie(index, { ...movie, rating })
          }}
        />
      ))}
    </section>
  )
}

export default connect(MovieList)

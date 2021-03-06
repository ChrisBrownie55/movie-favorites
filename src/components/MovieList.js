import React, { useState, useEffect } from 'react'
import Movie, { MovieSkeleton } from './Movie'
import { ReactComponent as MovieItemsSVG } from '../movie-items.svg'

import { connect, storage } from '../store'
import { editMovie, setMovies, removeMovie } from '../store/actions'

function MovieList({ movies }) {
  const [haveMoviesLoaded, setMoviesLoaded] = useState(false)

  useEffect(() => {
    async function loadMovies() {
      try {
        const movies = await storage.get('movies')

        if (Array.isArray(movies)) {
          setMovies(movies)
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

  if (!movies.length) {
    return (
      <div className="m-auto flex flex-col items-center">
        <MovieItemsSVG
          className="h-auto mb-8 max-w-full"
          style={{ width: '25rem' }}
        />
        <p className="text-xl font-medium text-grey-light text-center">
          You don't have any movies in your list. Add them below.
        </p>
      </div>
    )
  }

  return (
    <section className="flex flex-col">
      {movies.map((movie, index) => (
        <Movie
          key={index}
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
          onDelete={() => {
            removeMovie(index)
          }}
        />
      ))}
    </section>
  )
}

export default connect(MovieList)

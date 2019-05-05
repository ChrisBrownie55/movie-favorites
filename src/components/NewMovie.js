import React, { useState, useCallback } from 'react'

import Movie from './Movie'
import Button from './Button'
import { addMovie } from '../store/actions'

function NewMovie() {
  const [name, setName] = useState('')
  const [genre, setGenre] = useState(null)

  const handleSubmit = useCallback(event => {
    event.preventDefault()
    addMovie({ name, genre, rating: 3 })
  }, [])

  const handleReset = useCallback(
    event => {
      setName('')
      setGenre(null)
    },
    [setName, setGenre]
  )

  return (
    <form
      className="flex flex-col NewMovie"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <Movie
        value={name}
        onChange={setName}
        genre={genre}
        onGenreChange={setGenre}
        placeholder="New Movie"
      />

      <div className="flex mt-4">
        <Button primary type="submit">
          Save Movie
        </Button>
        <Button secondary type="reset" className="ml-4">
          Cancel
        </Button>
      </div>
    </form>
  )
}

export default NewMovie

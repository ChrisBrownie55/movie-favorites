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
    handleReset()
  }, [])

  const handleReset = useCallback(() => {
    setName('')
    setGenre(null)
  }, [setName, setGenre])

  return (
    <form
      className="flex flex-col fixed w-full pin-b pin-l p-8 pt-4 bg-white shadow-md NewMovie"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <label
        htmlFor="new-movie"
        className="ml-2 mb-2 text-grey-darkest text-xl"
      >
        New Movie
      </label>
      <Movie
        value={name}
        onChange={setName}
        genre={genre}
        onGenreChange={setGenre}
        placeholder="Good Will Hunting"
        inputId="new-movie"
      />

      <div className="flex md:justify-baseline mt-4 w-64 md:w-auto mx-auto md:mx-0">
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

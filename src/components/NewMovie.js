import React, { useState, useCallback } from 'react'

import Movie from './Movie'
import Button from './Button'

function NewMovie() {
  const [value, setValue] = useState('')
  const [genre, setGenre] = useState(null)

  const handleChange = useCallback(
    event => {
      setValue(event.target.value)
    },
    [setValue]
  )

  const handleSubmit = useCallback(event => {}, [])

  return (
    <form className="flex flex-col p-4" onSubmit={handleSubmit}>
      <Movie
        value={value}
        onChange={handleChange}
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

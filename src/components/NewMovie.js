import React, { useState } from 'react'
import Movie from './Movie'

function NewMovie() {
  const [value, setValue] = useState('')
  const [genre, setGenre] = useState(null)

  return (
    <form className="flex flex-col">
      <Movie
        value={value}
        onChange={setValue}
        genre={genre}
        onGenreChange={setGenre}
        placeholder="New Movie"
      />

      <div className="flex">
        <button
          className={`
            py-2 px-4 rounded
            bg-blue hover:bg-blue-dark
            text-white font-semibold
            focus:outline-none focus:shadow-outline
          `}
          type="submit"
        >
          Save Movie
        </button>
        <button
          className={`
          text-blue font-normal
          hover:text-white
          hover:bg-blue hover:opacity-50
        `}
          type="reset"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default NewMovie

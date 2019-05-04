import React, { useState } from 'react'
import Input from './Input'
import Select from 'react-select'

import genres from '../genres.json'
const options = genres.map(genre => ({
  value: genre,
  label: genre
}))

function Movie({ value, onChange, genre, onGenreChange, placeholder }) {
  return (
    <article className="flex">
      <Input
        className={`
          w-64 p-3 mr-4
          bg-grey-lightest focus:bg-grey-lighter
          rounded
          focus:outline-none
        `}
        style={{
          transition: 'all 0.15s ease-out'
        }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Select
        className="inline-block"
        value={genre}
        onChange={onGenreChange}
        options={options}
        placeholder="Genre"
      />
    </article>
  )
}

export default Movie

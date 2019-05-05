import React, { useState } from 'react'
import Input from './Input'
import Select from 'react-select'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import { colors } from '../tailwind.config.js'
import genres from '../genres.json'

const yellow = colors['yellow-dark']

const options = genres.map(genre => ({
  value: genre,
  label: genre
}))

function Movie({
  value,
  onChange,
  genre,
  onGenreChange,
  placeholder,
  rating = null
}) {
  const stars = []

  // Create stars
  for (let i = 0; i < rating; ++i) {
    stars.push(
      <FontAwesomeIcon key={i} icon={faStar} color={yellow} className="mr-2" />
    )
  }

  // Create star outlines
  for (let i = 0; i < 5 - rating; ++i) {
    stars.push(
      <FontAwesomeIcon
        key={rating + i}
        icon={faStarOutline}
        color={yellow}
        className="mr-2"
      />
    )
  }

  return (
    <article className="flex flex-col md:flex-row">
      <Input
        className={`
          w-64 p-3 mr-4 mb-4 md:mb-0
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
        className="inline-block w-64 md:w-48"
        value={genre}
        onChange={onGenreChange}
        options={options}
        placeholder="Genre"
      />
      {rating && <div className="flex">{stars}</div>}
    </article>
  )
}

export default Movie

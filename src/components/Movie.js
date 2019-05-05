import React from 'react'
import Input, { DebouncedInput } from './Input'
import Select from './Select'

import classNames from '@chbphone55/classnames'

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
  rating = null,
  onRatingChange,
  className,
  inputId,
  ...props
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

  const InputElement = rating ? DebouncedInput : Input

  return (
    <article
      className={classNames(
        className,
        'flex flex-col md:flex-row items-center'
      )}
      {...props}
    >
      <InputElement
        className="w-64 px-3 py-2 md:mr-4 mb-2 md:mb-0"
        style={{
          transition: 'all 0.15s ease-out'
        }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={inputId}
        required
      />
      <Select
        className="inline-block w-64 md:w-48 md:mr-2"
        value={genre}
        onChange={onGenreChange}
        options={options}
        placeholder="Genre"
      />
      {rating && <div className="flex mt-2 md:mt-0">{stars}</div>}
    </article>
  )
}

export function MovieSkeleton(props) {
  const stars = []
  for (let i = 0; i < 5; ++i) {
    stars.push(
      <div
        key={i}
        className="rounded-full w-6 h-6 mt-1 mr-2 bg-grey-lightest skeleton skeleton-circle overflow-hidden opacity-50"
      />
    )
  }
  return (
    <article className="flex flex-col md:flex-row mb-4" {...props}>
      <div
        className={`
          w-64 h-8 px-3 py-2 mr-4 mb-4 md:mb-0
          bg-grey-lightest rounded
          skeleton
        `}
      />
      <div className="inline-block w-64 md:w-48 mr-2 bg-grey-lightest rounded skeleton opacity-75" />
      <div className="flex" children={stars} />
    </article>
  )
}

export default Movie

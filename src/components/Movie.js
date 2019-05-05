import React from 'react'
import Input, { DebouncedInput } from './Input'
import Select from './Select'

import classNames from '@chbphone55/classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarOutline } from '@fortawesome/free-regular-svg-icons'
import { faStar, faTrash } from '@fortawesome/free-solid-svg-icons'

import genres from '../genres.json'
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
  onDelete,
  className,
  inputId,
  ...props
}) {
  const stars = []

  // Create stars
  for (let i = 0; i < rating; ++i) {
    stars.push(
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className="text-yellow-dark mr-2"
      />
    )
  }

  // Create star outlines
  for (let i = 0; i < 5 - rating; ++i) {
    stars.push(
      <FontAwesomeIcon
        key={rating + i}
        icon={faStarOutline}
        className="text-yellow-dark mr-2"
      />
    )
  }

  let deleteButton = null
  if (onDelete) {
    deleteButton = (
      <button
        onClick={onDelete}
        className={`
          p-1 mr-2 mt-2 md:mt-0
          text-purple-lighter hover:text-purple focus:text-purple
          cursor-pointer md:order--3
          opacity-0 group-hover:opacity-100 focus:opacity-100
          touch-device:opacity-100
          focus:outline-none
        `}
        style={{
          transition: 'opacity 0.15s ease-out, color 0.15s ease-out'
        }}
        title="Delete Movie"
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    )
  }

  const InputElement = rating ? DebouncedInput : Input

  return (
    <article
      className={classNames(
        className,
        'flex flex-col md:flex-row items-center group'
      )}
      {...props}
    >
      <InputElement
        className="w-64 md:mr-4 mb-2 md:mb-0"
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
        className="inline-block w-64 md:w-48 md:mr-3"
        value={genre}
        onChange={onGenreChange}
        options={options}
        placeholder="Genre"
      />
      {rating && <div className="flex mt-2 md:mt-0">{stars}</div>}
      {deleteButton}
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

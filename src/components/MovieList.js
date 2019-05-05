import React, { useReducer } from 'react'
import { storage } from 'kv-storage-polyfill'

const types = {
  ADD_MOVIE: 0,
  REMOVE_MOVIE: 1,
  EDIT_MOVIE: 2
}

const initialState = []
function movieReducer(state, action) {
  switch (action.type) {
    case types.ADD_MOVIE:
      return state.push(action.payload)
    case types.REMOVE_MOVIE:
      return [...state.slice(0, action.payload), ...state.slice(action.payload)]
    case types.EDIT_MOVIE:
      return [
        ...state.slice(0, action.payload.index),
        action.payload.movie,
        ...state.slice(action.payload.index)
      ]
    default:
      throw new Error(`Invalid action type: ${action.type}`)
  }
}

function useMovie() {
  const [movies, dispatch] = useReducer(movieReducer, initialState)
}

function MovieList() {}

export default MovieList

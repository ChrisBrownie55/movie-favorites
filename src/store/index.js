import { createStore } from 'redux'
import { storage } from 'kv-storage-polyfill'

export const types = {
  ADD_MOVIE: 0,
  REMOVE_MOVIE: 1,
  EDIT_MOVIE: 2
}

const initialState = []
function movieReducer(state = initialState, action) {
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
      return state
  }
}

const store = createStore(movieReducer)

// updates kv-storage with new value on change
let lastOperation = Promise.resolve()
store.subscribe(() => {
  const state = store.getState()

  // wait for the last operation to finish
  lastOperation = lastOperation.then(() => storage.set('movies', state))
})

export default store

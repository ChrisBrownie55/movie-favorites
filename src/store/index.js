import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { connect } from 'react-redux'
import { storage } from 'kv-storage-polyfill'
import { debounce } from 'mini-debounce'

export const types = {
  ADD_MOVIE: 0,
  REMOVE_MOVIE: 1,
  EDIT_MOVIE: 2,
  LOAD_MOVIES: 3
}

const initialState = []
function movieReducer(state = initialState, action) {
  switch (action.type) {
    case types.ADD_MOVIE:
      return [action.payload, ...state]
    case types.REMOVE_MOVIE:
      return [...state.slice(0, action.payload), ...state.slice(action.payload)]
    case types.EDIT_MOVIE:
      return [
        ...state.slice(0, action.payload.index),
        action.payload.movie,
        ...state.slice(action.payload.index + 1)
      ]
    case types.LOAD_MOVIES:
      return action.payload
    default:
      return state
  }
}

const store = createStore(movieReducer, composeWithDevTools())

// updates kv-storage with new value on change
// debounced to avoid constantly updating
store.subscribe(
  debounce(() => {
    const state = store.getState()
    storage.set('movies', state)
  }, 500)
)

export default store

const connectMovies = connect(movies => ({ movies }))
export { connectMovies as connect }

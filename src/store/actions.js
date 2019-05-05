import store, { types } from './'

export function addMovie(movie) {
  store.dispatch({
    type: types.ADD_MOVIE,
    payload: movie
  })
}

export function removeMovie(index) {
  store.dispatch({
    type: types.REMOVE_MOVIE,
    payload: index
  })
}

export function editMovie(index, movie) {
  store.dispatch({
    type: types.EDIT_MOVIE,
    payload: { index, movie }
  })
}

export function loadMovies(movies) {
  store.dispatch({
    type: types.LOAD_MOVIES,
    payload: movies
  })
}

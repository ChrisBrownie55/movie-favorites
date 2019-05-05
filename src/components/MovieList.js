import React, { useReducer } from 'react'
import { connect } from '../store'
import { storage } from 'kv-storage-polyfill'

function MovieList({ movies }) {
  return <p>{JSON.stringify(movies)}</p>
}

export default connect(MovieList)

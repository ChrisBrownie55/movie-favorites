import React, { useState, useCallback } from 'react'
import { BottomModal, CenterModal } from 'react-spring-modal';

import Movie from './Movie'
import Button from './Button'
import { addMovie } from '../store/actions'
import { connect } from '../store';

function NewMovie({ movies }) {
  const [name, setName] = useState('')
  const [genre, setGenre] = useState(null)

  const handleReset = useCallback(() => {
    setName('')
    setGenre(null)
  }, [setName, setGenre])

  const handleSubmit = useCallback(
    event => {
      event.preventDefault()
      addMovie({ name, genre, rating: 3 })
      handleReset()
    },
    [name, genre, handleReset]
  )

  const [isExportModalOpen, setExportModalOpen] = useState(false)
  const [isImportModalOpen, setImportModalOpen] = useState(false)
  function exportedData() {
    return JSON.stringify(movies);
  }

  return (
    <form
      className="flex flex-col fixed w-full pin-b pin-l p-8 pt-4 bg-white shadow-md NewMovie"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <label
        htmlFor="new-movie"
        className="mx-auto md:ml-2 md:mr-auto mb-2 text-grey-darkest text-xl"
      >
        New Movie
      </label>
      <Movie
        value={name}
        onChange={setName}
        genre={genre}
        onGenreChange={setGenre}
        placeholder="Good Will Hunting"
        inputId="new-movie"
      />

      <div className="flex flex-col md:flex-row">
        <div className="flex md:justify-start mt-4 w-64 md:w-auto mx-auto md:mx-0">
          <Button primary type="submit">
            Save Movie
          </Button>
          <Button secondary type="reset" className="ml-4">
            Cancel
          </Button>
        </div>

        <div className="flex md:justify-start mt-4 w-64 md:w-auto mx-auto md:mx-0">
          <Button primary type="button" className="ml-4" onClick={() => setExportModalOpen(true)}>
            Export
          </Button>
          <Button secondary type="button" className="ml-4" onClick={() => setImportModalOpen(true)}>
            Import
          </Button>
        </div>
      </div>

      <CenterModal isOpen={isExportModalOpen} onRequestClose={() => setExportModalOpen(false)} className="bg-white rounded p-8">
        <h1 className="mb-2">Here is your exported data:</h1>
        <textarea>{isExportModalOpen ? exportedData() : null}</textarea>
      </CenterModal>

      <BottomModal isOpen={isImportModalOpen} onRequestClose={() => setImportModalOpen(false)}>
        <h1>Please enter your data to import your movies:</h1>
        <textarea></textarea>
        <Button primary type="button">Import Data</Button>
      </BottomModal>
    </form>
  )
}

export default connect(NewMovie)

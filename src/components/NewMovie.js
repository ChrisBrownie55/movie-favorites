import React, { useState, useCallback, useMemo } from 'react'
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

  const [exportModalStatus, setExportModalStatus] = useState('closed');
  const [importModalStatus, setImportModalStatus] = useState('closed');
  function exportedData() {
    return JSON.stringify(movies);
  }

  const importModalContent = useMemo(() => {
    if (importModalStatus === 'json-error') {
      return (
          <>
            <h1 className="text-red-dark">An error occurred while handling your movie data.</h1>
            <Button primary onClick={() => setImportModalStatus('open')}>Retry</Button>
            <Button secondary className="ml-2" onClick={() => setImportModalStatus('closed')}>Close</Button>
          </>
      )
    } else if (importModalStatus === 'success') {
      return (
          <>
            <h1 className="text-green-dark">Successfully imported your movies.</h1>
            <Button primary onClick={() => setImportModalStatus('closed')}>Close</Button>
          </>
      )
    } else {
      return (
          <form onSubmit={event => {
            event.preventDefault();

            let importedData = null;
            try {
              importedData = JSON.parse(event.target['import-data'].value);
            } catch {
              setImportModalStatus('json-error');
            }

            if (Array.isArray(importedData)) {
              importedData.forEach(movie => {
                addMovie(movie);
              })
              setImportModalStatus('success');
            }
          }}>
            <h1>Please enter your data to import your movies:</h1>
            <textarea name="import-data"></textarea>
            <Button primary className="ml-8" type="submit">Import Data</Button>
            <Button secondary className="ml-2" type="button" onClick={() => setImportModalStatus('closed')}>Close</Button>
          </form>
      )
    }
  }, [importModalStatus, setImportModalStatus])

  return (
    <>
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
            <Button primary type="button" className="ml-4" onClick={() => setExportModalStatus('open')}>
              Export
            </Button>
            <Button secondary type="button" className="ml-4" onClick={() => setImportModalStatus('open')}>
              Import
            </Button>
          </div>
        </div>
      </form>

      <CenterModal isOpen={exportModalStatus === 'open'} onRequestClose={() => setExportModalStatus('closed')} className="bg-white rounded p-8">
        <h1 className="mb-2">Here is your exported data:</h1>
        <textarea readOnly>{exportModalStatus === 'open' ? exportedData() : null}</textarea>
        <Button primary className="ml-8" onClick={() => setExportModalStatus('closed')}>Close</Button>
      </CenterModal>

      <BottomModal
          isOpen={
            importModalStatus === 'open'
            || importModalStatus === 'json-error'
            || importModalStatus === 'success'
          }
          onRequestClose={() => setImportModalStatus('closed')}
      >
        {importModalContent}
      </BottomModal>
    </>
  )
}

export default connect(NewMovie)

import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

  return (
    <div>
      <h1>Anecdotes</h1>
      <p>(lisäämisen jälkeen anecdootit ilmestyvät inputin alapuolelle)</p>
      <AnecdoteForm />
      <AnecdoteList  />
      
      
    </div>
  )
}

export default App
/**
 * Osan 3 frontend, jota käytetty.
 * Eetu Karttunen, UEF
 * Full Stack open 2021
 */
import React, { useState, useEffect } from 'react'
import PersonForm from './personForm'
import Person from './person'
import Filter from './filter'
import PersonsServiceCommunication from './services/personsServiceCommunication'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [name, setNewName] = useState('')
  const [number, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null) // null, jotta ei näy aluksi
  const [errorMessage, setErrorMessage] = useState(null) // null, jotta ei näy aluksi

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  useEffect(() => {
    PersonsServiceCommunication
      .getAll()
        .then(initialPersons => {
        setPersons(initialPersons)}
        )}, [])

      const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: name,
        number: number,
  };
  
      PersonsServiceCommunication
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          setNewName('')
          setNewNumber('')
        })
        setNotificationMessage(
          `Added ${name}`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        
        
    }

  const handleUpdate = (name) => {
    const oldPerson = persons.find(p => p.name === name) // Etsii sen saman nimen
    const updatedPerson = {...oldPerson, number}

    PersonsServiceCommunication
      .update(updatedPerson.id, updatedPerson) //console.log(persons);
      .then(returnedPerson => {
        setPersons(
          persons.map(
            person =>
              person.id !== oldPerson.id ? person: returnedPerson
            )
          )
      setNotificationMessage(
            `Updated ${name}`
          )
          
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
          
        })
       .catch(error => {
      setErrorMessage(
          `Information of '${name}' had already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    })
}
    

   const handleHyvaksyminen = (event) => {
      const newPerson = { name, number }
      const tuplat =
      persons.filter((p) => p.name === newPerson.name)
      event.preventDefault()

    if (tuplat.length > 0) {
      alert (`${name} on jo lisätty`)
      const acceptnumber = window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`)
      
        // Hyväksyminen
        if (acceptnumber) {    
        handleUpdate(name)
      }
   }
    else if (tuplat.length === 0) {
      PersonsServiceCommunication
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `Added ${name}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          
        })
    }
  }
      
      
      const deletePerson = deletedPerson => {
        const accept = window.confirm(`Do you want to delete this person ?`)
        if (accept) {
        PersonsServiceCommunication
        .delPers(deletedPerson)
        
          setNotificationMessage(
            `Person removal successful`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        
        }
        else {

        }
      }
    

      const filteri = persons.filter(people => {
        return people.name.toLowerCase().includes(search.toLowerCase())
          })


      // Määrittely vihreälle ilmoitukselle

      const Notification = ({ message }) => {
            if (message === null) {
              return null
            }
          
            return (
              <div className="notification">
                {message}
              </div>
            )
          }

        // Määrittely Errorille

      const Error = ({ errormes }) => {
            if (errormes === null) {
              return null
            }
          
            return (
              <div className="error">
                {errormes}
              </div>
            )
          }



return (
    <div>
      <h2>Phonebook</h2> 

        <Notification message={notificationMessage} />
        <Error errormes={errorMessage} />

        <Filter setSearch={setSearch} />

      <h2>add a new</h2>
        <PersonForm
          addPerson={addPerson}
          handlePersonChange={handlePersonChange}
          handleNumberChange={handleNumberChange}
          handleHyvaksyminen={handleHyvaksyminen}
          name={name}
          number={number}
        />
      

      <h2>Numbers</h2>
        <Person
          handlePersonChange={handlePersonChange}
          filteri={filteri}
          deletePerson={deletePerson}
          
          />
      <div>                                   
        </div>  
    
  </div>
  );

}

export default App;
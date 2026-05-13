import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import './index.css'

  const Person = (props) => {
    return (
      <div>
        {props.name} {props.number} <button onClick={() => props.deletePerson(props.id, props.name)}>delete</button>
      </div>
      
    )
  }

  const Persons = (props) => {
    return (
      <div>
          {props.list.map(persons => <Person name={persons.name} number={persons.number} key={persons.name} id={persons.id} deletePerson={props.deletePerson}/> )}
      </div>
        
    )
      
  }

const Filter = (props) => {
  return (
    <div>
        filter shown with <input onChange={props.onChange} />
    </div>
  )
}

const Notification = (props) => {
  if (props.message === null) {
    return null
  }
  return (
    <div className={props.messageType}>
      {props.message}
    </div>
  )
}
const Form = (props) => {
  return (
      <form onSubmit={props.personHandler}>
          <div>name: <input name="name" value={props.newName} onChange={(e)=>props.setNewName(e.target.value)} /></div>
          <div>number: <input name="number" value={props.newNumber} onChange={(e)=>props.setNewNumber(e.target.value)} /></div>
          <div><button type="submit">add</button></div>
      </form>
  )
    
}
  const App = () => {
    const [persons, setPersons] = useState([]) 
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [isPresent, setPresent] = useState('')
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState('success')
    
    const addPerson = event => {
      event.preventDefault()
      const personObject = {
      name: newName,
      number: newNumber,
    }
    personService.create(personObject).then(response => {
    setPersons(persons.concat(response.data))
  })
  
  }
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
      .then(() => {
        setMessageType('success')
        setMessage("Removed : " + name)
        setTimeout(() => setMessage(null), 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        setMessageType('error')
        setMessage(`${name} has already been removed from server`)
        setTimeout(() => setMessage(null), 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
   }
  }

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])
    console.log('render', persons.length, 'persons')
const personHandler = (e) => {
    e.preventDefault()
    const existing = persons.find(p => p.name === newName)
    if (existing) {
        if (window.confirm(`${newName} is already added, replace number?`)) {
          const updatedPerson = { ...existing, number: newNumber }
          personService.update(existing.id, updatedPerson)
            .then(response => {
              setPersons(persons.map(p => p.id === existing.id ? response.data : p))
              setMessageType('success')
              setMessage(`${newName} number updated`)
              setTimeout(() => setMessage(null), 5000)
            })
            .catch(error => {
              setMessageType('error')
              setMessage(`${newName} has already been removed from server`)
              setTimeout(() => setMessage(null), 5000)
            })
     }
            } else {
              addPerson(e)
              setMessageType('success')
              setMessage("Added : "+newName)
              setTimeout(() => setMessage(null), 5000)
            }
}
    const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(isPresent.toLowerCase()))
  
  
    return (
      <div>
        <Notification message={message} messageType={messageType} />
        <h2>Phonebook</h2>
        <Filter onChange={(e) => setPresent(e.target.value)} />
        <h2>add a new</h2>
        <Form onChange={(e) => setPresent(e.target.value)} personHandler={personHandler}newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}/>
        <h2>Numbers</h2>
        <Persons list={filteredPersons} deletePerson={deletePerson} />
      </div>
    )
  }
  export default App
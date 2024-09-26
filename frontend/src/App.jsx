import React, { useState } from 'react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/users'


function App() {
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState('')
  const [updateUser, setUpdateUser] = useState({id: '', name: ''})

  async function fetchUsers() {
    const response = await axios.get (API_URL)
    const content = response.data
    //console.log(content)
    setUsers(content.data)
    
  }

  useEffect(() =>{
    fetchUsers()

  }, [])
 


  return (
    <div>App</div>
  )
}

export default App
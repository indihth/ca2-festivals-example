import axios from 'axios'
import { useState } from 'react'

const LoginForm = ({ authenticated, onAuthenticated}) => {

  const errorStyle = {
    color: 'red'
  }

  const [form, setForm] = useState({
    email: "email@email.com",
    password: "password123"
  })

  const [errorMessage, setErrorMessage] = useState("")

    const handleClick = () => {
        console.log("clicked", form)

        // POST allows for 2nd param
        axios.post('https://festivals-api.vercel.app/api/users/login', {
          email: form.email,        // data from form useState
          password: form.password
        })
        .then(response => {
          console.log(response.data)
          onAuthenticated(true, response.data.token)
        })
        .catch(err => {
          console.error(err)
          console.log(err.response.data.message)
          setErrorMessage(err.response.data.message)
        })

    }

    // Handles multiple form fields
    const handleForm = (e) => {
      setForm(prevState => ({ 
        ...prevState,
        // Uses name="" and value="" from form to setForm []: ""
        [e.target.name]: e.target.value
      }))
    }
  return (
    <>
        Email: <input onChange={handleForm} type='text' name='email' value={form.email}/> <br />
        Password: <input onChange={handleForm} type='password' name='password' value={form.password}/>

        <button onClick={handleClick}>Login</button>
        {errorMessage ? <p style={errorStyle}>{errorMessage}</p> : ""} 
    </>
  )
}

export default LoginForm
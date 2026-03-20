import React, { useState } from 'react'

export const SignupFrom = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const res = await fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        username,
        password
      })
    })
    const data = await res.json()
    if (!res.ok) {
      alert(data.error)
      return
    }
    console.log(res)
  }

  return (
    <>
      <h1>Sign up here</h1>
      <form id='signup-form'>
        <input type="text" name='username' placeholder='Enter username' required onChange={(e) => setUsername(e.target.value)} />
        <input type="text" name='password' placeholder='Enter password' required onChange={(e) => setPassword(e.target.value)} />
        <button type='submit' onClick={(e) => handleSignup(e)}>Create Account</button>
      </form>
    </>
  )
}

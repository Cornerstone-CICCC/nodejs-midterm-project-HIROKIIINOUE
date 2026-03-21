
import { useEffect, useState } from 'react'
import './App.css'
import { AuthPage } from './features/users/components'

function App() {
  const initialAuthValue: boolean = localStorage.getItem("isAuth") === "true" ? true : false
  const [isAuth, setIsAuth] = useState<boolean>(initialAuthValue)
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    if (!isAuth) return
    const authCheck = async () => {
      const res = await fetch("http://localhost:3000/user/checkAuth", {
        credentials: "include"
      })

      if (!res.ok) {
        setIsAuth(false)
        setUsername(null)
        return
      }
      const data = await res.json()
      setIsAuth(true)
      setUsername(data)
    }
    authCheck()

  }, [isAuth])

  if (!isAuth) {
    return <AuthPage />
  }

  return (
    <>
      ddddd{username}
    </>
  )
}

export default App

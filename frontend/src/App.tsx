
import { useEffect, useState } from 'react'
import './App.css'
import { AuthPage } from './features/users/components'
import { Header, Loading } from './components/layouts'

function App() {
  const [username, setUsername] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const authCheck = async () => {
      try {

        setIsLoading(true)
        const res = await fetch("http://localhost:3000/user/checkAuth", {
          credentials: "include"
        })
        if (!res.ok) {
          setUsername(null)
          return
        }
        const data = await res.json()
        setUsername(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    authCheck()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (!username) {
    return <AuthPage />
  }

  return (
    <>
      <Header username={username} />

    </>
  )
}

export default App

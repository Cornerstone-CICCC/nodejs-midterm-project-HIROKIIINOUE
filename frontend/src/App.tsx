
import './App.css'
import { AuthPage } from './features/users/components'

function App() {
  const isAuth = false

  if (!isAuth) {
    return <AuthPage />
  }

  return (
    <>
    </>
  )
}

export default App

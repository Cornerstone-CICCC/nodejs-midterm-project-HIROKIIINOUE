
import './App.css'
import { AuthPage } from './features/users/components'
import { Header, Loading } from './components/layouts'
import { Container } from './features/shoppingList'
import { useAuth } from './hooks/useAuth'

function App() {
  const { username, isLoading } = useAuth()

  if (isLoading) {
    return <Loading />
  }

  if (!username) {
    return <AuthPage />
  }

  return (
    <>
      <Header username={username} />
      <Container />
    </>
  )
}

export default App

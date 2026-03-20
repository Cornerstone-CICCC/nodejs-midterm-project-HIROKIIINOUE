import { useState } from 'react'
import { SignupFrom } from './SignupForm'
import { LoginForm } from './LoginForm'

export const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  return (
    <>
      {isSignUp ? (
        <SignupFrom setIsSignUp={setIsSignUp} />
      ) : (
        <LoginForm setIsSignUp={setIsSignUp} />
      )}
    </>
  )
}

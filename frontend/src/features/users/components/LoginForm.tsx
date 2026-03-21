import React, { useState } from 'react'

type Props = {
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginForm = (props: Props) => {
  const { setIsSignUp } = props;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("")

  const handleSignin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      credentials: 'include',
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
    localStorage.setItem("isAuth", "true")
    window.location.href = "";
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
        <div className="mb-8 space-y-2 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-teal-700">
            Welcome Back
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">Log in to continue</h1>
          <p className="text-sm text-slate-500">
            Enter your account details to access your dashboard.
          </p>
        </div>

        <form id='signup-form' className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Username</span>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
              type="text"
              name='username'
              placeholder='Enter username'
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-100"
              type="password"
              name='password'
              placeholder='Enter password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
            type='submit'
            onClick={(e) => handleSignin(e)}
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          New here?{" "}
          <button
            className="font-semibold text-teal-700 transition hover:text-teal-600"
            type='button'
            onClick={() => setIsSignUp(true)}
          >
            Signup here
          </button>
        </div>
      </section>
    </main>
  )
}

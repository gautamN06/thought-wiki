import { useState } from 'react'
import { supabase } from './lib/supabase'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setSignUp] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(event){
        event.preventDefault()
        setLoading(true)
        setMessage('')

        const { error } = isSignUp 
          ? await supabase.auth.signUp({ email, password })
          : await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setMessage(error.message)
        } else if (isSignUp) {
            setMessage('Account created! Check your email if confirmation is on.')
        }

        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>{isSingUp ? 'Create Account' : 'Sign In'}</h1>

            <input
              type ="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />

            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (6+ characters)"
              required
            />

            <button disabled={loading}>
                {loading ? 'Working...' : isSignUp ? 'Sign up' : 'Sign in'}
            </button>

            {message && <p>{message}</p>}

            <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
        </form>
    )

}
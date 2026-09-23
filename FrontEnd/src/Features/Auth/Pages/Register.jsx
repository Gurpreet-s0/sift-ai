import { useState } from 'react'
import useAuth from '../Hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '../../../components/Loading'

const Sparkle = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2zm7 13l.9 3.1L23 19l-3.1.9L19 23l-.9-3.1L15 19l3.1-.9L19 15z" />
  </svg>
)

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { error, loading } = useSelector((state) => state.auth)
  const { registerHandler } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await registerHandler({ username, email, password })
    navigate('/dashboard')
  }

  if (loading) {
    return <Loading />
  }

  return (
    <main className="auth-shell register-shell">
      <section className="auth-showcase">
        <Link className="brand" to="/login"><span><Sparkle /></span>Sift<span className="brand-dot">.</span></Link>
        <div className="showcase-copy"><p className="eyebrow">A CALMER WAY TO THINK</p><h1>Turn your thoughts<br />into <em>clarity.</em></h1><p className="showcase-description">A quiet place to explore questions, connect ideas, and move from scattered to certain.</p></div>
        <div className="insight-card" aria-hidden="true"><span className="insight-icon"><Sparkle /></span><p>“Sift found three recurring themes across your notes.”</p><div><i /> Insight ready <b>↗</b></div></div>
        <p className="showcase-footer">Your ideas deserve room to breathe <span>✦</span></p>
      </section>

      <section className="auth-panel">
        <div className="form-wrap register-form-wrap">
          <div className="mobile-brand"><span><Sparkle /></span> Sift<span>.</span></div>
          <p className="form-kicker">START YOUR JOURNEY</p>
          <h2>A little space for<br />big ideas.</h2>
          <p className="form-subtitle">Create your free account and start sifting.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="register-username">Your name
              <input id="register-username" type="text" name="username" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="How should we call you?" required />
            </label>
            <label htmlFor="register-email">Email address
              <input id="register-email" type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
            </label>
            <label htmlFor="register-password">Password
              <span className="password-field">
                <input id="register-password" type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" minLength="8" required />
                <button type="button" aria-label="Show password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '◉' : '○'}</button>
              </span>
            </label>
            <label className="check-label"><input type="checkbox" required /><span>I agree to the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</span></label>
            <button className="primary-button" type="submit">Create my account <span>→</span></button>
            {error && <p className="form-notice" role="status">{error}</p>}
          </form>

          <p className="switch-page">Already have an account? <Link to="/login">Sign in <span>→</span></Link></p>
        </div>
      </section>
    </main>
  )
}

export default Register

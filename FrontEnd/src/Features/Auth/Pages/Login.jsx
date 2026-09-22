import { useState } from 'react'
import useAuth from '../Hooks/useAuth'

const Sparkle = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2zm7 13l.9 3.1L23 19l-3.1.9L19 23l-.9-3.1L15 19l3.1-.9L19 15z" />
  </svg>
)

const Login = ({ navigate }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState('')
  const {loginHandler} = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await loginHandler({email,password})
    setNotice(`Welcome back${email ? `, ${email}` : ''}. Your secure sign-in is ready.`)
  }

  return (
    <main className="auth-shell">
      <section className="auth-showcase">
        <a className="brand" href="/login" onClick={(event) => { event.preventDefault(); navigate('/login') }}>
          <span><Sparkle /></span>Sift<span className="brand-dot">.</span>
        </a>

        <div className="showcase-copy">
          <p className="eyebrow">YOUR AI THINKING PARTNER</p>
          <h1>Make sense of<br /><em>what matters.</em></h1>
          <p className="showcase-description">Sift through ideas, uncover signals, and turn every conversation into your next great move.</p>
        </div>

        <div className="chat-preview" aria-hidden="true">
          <div className="chat-header"><span className="bot-avatar"><Sparkle /></span><div><strong>Sift AI</strong><small><i /> Online now</small></div><b>•••</b></div>
          <div className="message message-ai">What would you like to make clearer today?</div>
          <div className="message message-user">Help me find the signal in my notes.</div>
          <div className="typing"><span /><span /><span /></div>
        </div>
        <p className="showcase-footer">Thoughtfully made for curious minds <span>✦</span></p>
      </section>

      <section className="auth-panel">
        <div className="form-wrap">
          <div className="mobile-brand"><span><Sparkle /></span> Sift<span>.</span></div>
          <p className="form-kicker">WELCOME BACK</p>
          <h2>Pick up where<br />your mind left off.</h2>
          <p className="form-subtitle">Sign in to continue your conversation.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="login-email">Email address
              <input id="login-email" type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
            </label>
            <label htmlFor="login-password">Password
              <span className="label-action">Forgot password?</span>
              <span className="password-field">
                <input id="login-password" type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required />
                <button type="button" aria-label="Show password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '◉' : '○'}</button>
              </span>
            </label>
            <button className="primary-button" type="submit">Sign in <span>→</span></button>
            {notice && <p className="form-notice" role="status">{notice}</p>}
          </form>

          <div className="divider"><span />or continue with<span /></div>
          <button className="google-button" type="button"><b>G</b> Continue with Google</button>
          <p className="switch-page">New to Sift? <a href="/register" onClick={(event) => { event.preventDefault(); navigate('/register') }}>Create an account <span>→</span></a></p>
        </div>
      </section>
    </main>
  )
}

export default Login

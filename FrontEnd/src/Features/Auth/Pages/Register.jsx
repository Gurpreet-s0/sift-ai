import { useState } from 'react'

const Sparkle = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2zm7 13l.9 3.1L23 19l-3.1.9L19 23l-.9-3.1L15 19l3.1-.9L19 15z" /></svg>

const Register = ({ navigate }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [notice, setNotice] = useState('')
  const submit = (event) => { event.preventDefault(); setNotice('Your Sift workspace is ready to be created.') }
  return (
    <main className="auth-shell register-shell">
      <section className="auth-showcase"><a className="brand" href="/login" onClick={(event) => { event.preventDefault(); navigate('/login') }}><span><Sparkle /></span>Sift<span className="brand-dot">.</span></a><div className="showcase-copy"><p className="eyebrow">A CALMER WAY TO THINK</p><h1>Turn your thoughts<br />into <em>clarity.</em></h1><p className="showcase-description">A quiet place to explore questions, connect ideas, and move from scattered to certain.</p></div><div className="insight-card" aria-hidden="true"><span className="insight-icon"><Sparkle /></span><p>“Sift found three recurring themes across your notes.”</p><div><i /> Insight ready <b>↗</b></div></div><p className="showcase-footer">Your ideas deserve room to breathe <span>✦</span></p></section>
      <section className="auth-panel"><div className="form-wrap register-form-wrap"><div className="mobile-brand"><span><Sparkle /></span> Sift<span>.</span></div><p className="form-kicker">START YOUR JOURNEY</p><h2>A little space for<br />big ideas.</h2><p className="form-subtitle">Create your free account and start sifting.</p><form onSubmit={submit}><label>Your name<input type="text" name="username" placeholder="How should we call you?" required /></label><label>Email address<input type="email" name="email" placeholder="you@example.com" required /></label><label>Password<span className="password-field"><input type={showPassword ? 'text' : 'password'} name="password" placeholder="At least 8 characters" minLength="8" required /><button type="button" aria-label="Show password" onClick={() => setShowPassword(!showPassword)}>{showPassword ? '◉' : '○'}</button></span></label><label className="check-label"><input type="checkbox" required /><span>I agree to the <a href="#terms">Terms</a> and <a href="#privacy">Privacy Policy</a>.</span></label><button className="primary-button" type="submit">Create my account <span>→</span></button>{notice && <p className="form-notice" role="status">{notice}</p>}</form><p className="switch-page">Already have an account? <a href="/login" onClick={(event) => { event.preventDefault(); navigate('/login') }}>Sign in <span>→</span></a></p></div></section>
    </main>
  )
}

export default Register

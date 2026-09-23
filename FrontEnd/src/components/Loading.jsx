const Loading = ({ label = 'Sifting through your thoughts…', fullScreen = true }) => (
  <div
    className={`loading-state${fullScreen ? ' loading-state--full-screen' : ''}`}
    role="status"
    aria-live="polite"
  >
    <div className="loading-orbit" aria-hidden="true">
      <span className="loading-spark loading-spark--one">✦</span>
      <span className="loading-spark loading-spark--two">✦</span>
      <span className="loading-core">✦</span>
    </div>
    <p>{label}</p>
  </div>
)

export default Loading

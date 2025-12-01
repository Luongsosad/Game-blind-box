import { useEffect } from 'react'

function CongratulationScreen({ boxNumber, onContinue }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue()
    }, 3000) // Tự động chuyển sau 3 giây

    return () => clearTimeout(timer)
  }, [onContinue])

  return (
    <div className="congratulation-overlay">
      <div className="congratulation-card">
        <div className="fireworks">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="firework"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="congratulation-content">
          <h1 className="congrats-title">TÚI MÙ SỐ {boxNumber}</h1>
          <div className="congrats-message">
            {/* <p className="congrats-text">Người được chọn:</p> */}
          </div>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <button className="btn-continue" onClick={onContinue}>
            Tiếp tục ➡️
          </button>
        </div>
      </div>
    </div>
  )
}

export default CongratulationScreen

function ResultScreen({ score, correctAnswers, incorrectAnswers, totalQuestions, onRestart }) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100)
  
  const getMessage = () => {
    if (percentage === 100) return { emoji: '🏆', text: 'Xuất sắc!', color: '#FFD700' }
    if (percentage >= 80) return { emoji: '🌟', text: 'Tuyệt vời!', color: '#4ECDC4' }
    if (percentage >= 60) return { emoji: '👍', text: 'Khá tốt!', color: '#45B7D1' }
    if (percentage >= 40) return { emoji: '💪', text: 'Cố gắng lên!', color: '#FFA07A' }
    return { emoji: '📚', text: 'Hãy cố gắng hơn!', color: '#FF6B6B' }
  }

  const message = getMessage()

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-header">
          <div className="result-emoji" style={{ color: message.color }}>
            {message.emoji}
          </div>
          <h1 className="result-title">{message.text}</h1>
          <p className="result-subtitle">Bạn đã hoàn thành trò chơi!</p>
        </div>

        <div className="result-stats-grid">
          <div className="stat-item primary">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-label">Điểm số</div>
              <div className="stat-value">{score}</div>
            </div>
          </div>

          <div className="stat-item success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-label">Câu đúng</div>
              <div className="stat-value">{correctAnswers}</div>
            </div>
          </div>

          <div className="stat-item danger">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <div className="stat-label">Câu sai</div>
              <div className="stat-value">{incorrectAnswers}</div>
            </div>
          </div>

          <div className="stat-item info">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-label">Tỷ lệ</div>
              <div className="stat-value">{percentage}%</div>
            </div>
          </div>
        </div>

        <div className="result-progress">
          <div className="circular-progress" style={{
            '--progress': percentage,
            '--progress-color': message.color
          }}>
            <div className="progress-value">{percentage}%</div>
          </div>
        </div>

        <button onClick={onRestart} className="btn-restart">
          🔄 Chơi lại
        </button>
      </div>
    </div>
  )
}

export default ResultScreen

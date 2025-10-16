import React from 'react'

function GiftBoxSelection({ questions, answeredQuestions, onBoxSelect, score, correctAnswers, incorrectAnswers }) {
  const colors = [
    '#FF6B9D', // Hồng đậm
    '#2ECC71', // Xanh lá sáng
    '#3498DB', // Xanh dương
    '#F39C12', // Cam vàng
    '#9B59B6', // Tím
    '#E74C3C', // Đỏ
    '#1ABC9C', // Xanh ngọc
    '#E67E22', // Cam đậm
    '#16A085', // Xanh lục bảo
    '#C0392B'  // Đỏ thẫm
  ]
  
  return (
    <div className="selection-container">
      <div className="selection-header">
        <h1 className="game-title">🎁 TÚI MÙ BÍ ẨN</h1>
        <p className="game-subtitle">Chọn một túi quà để mở câu hỏi bí mật!</p>
      </div>

      <div className="score-dashboard">
        <div className="score-card">
          <span className="score-label">Điểm số</span>
          <span className="score-value">{score}</span>
        </div>
        <div className="score-card success">
          <span className="score-label">Đúng</span>
          <span className="score-value">{correctAnswers}</span>
        </div>
        <div className="score-card danger">
          <span className="score-label">Sai</span>
          <span className="score-value">{incorrectAnswers}</span>
        </div>
        <div className="score-card info">
          <span className="score-label">Còn lại</span>
          <span className="score-value">{questions.length - answeredQuestions.length}</span>
        </div>
      </div>

      <div className="gift-boxes-grid">
        {questions.map((question, index) => {
          const isAnswered = answeredQuestions.includes(question.id)
          return (
            <div
              key={question.id}
              className={`gift-box ${isAnswered ? 'answered' : ''}`}
              onClick={() => !isAnswered && onBoxSelect(question.id)}
              style={{
                '--box-color': colors[index % colors.length],
                animationDelay: `${index * 0.1}s`
              }}
            >
              {!isAnswered ? (
                <>
                  <div className="gift-box-body">
                    <div className="ribbon-vertical"></div>
                    <div className="ribbon-horizontal"></div>
                  </div>
                  <div className="gift-bow">
                    <div className="bow-left"></div>
                    <div className="bow-right"></div>
                    <div className="bow-center"></div>
                  </div>
                  <div className="box-number">{index + 1}</div>
                  <div className="question-mark">?</div>
                </>
              ) : (
                <>
                  <div className="gift-box-body answered-box">
                    <div className="ribbon-vertical"></div>
                    <div className="ribbon-horizontal"></div>
                  </div>
                  <div className="checkmark">✓</div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {answeredQuestions.length > 0 && answeredQuestions.length < questions.length && (
        <div className="progress-indicator">
          <p>Đã hoàn thành: {answeredQuestions.length}/{questions.length} câu hỏi</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${(answeredQuestions.length / questions.length) * 100}%`}}
            ></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GiftBoxSelection

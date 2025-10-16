import { useState } from 'react'

function QuestionScreen({ question, onAnswerSubmit }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)

  const handleAnswerClick = (index) => {
    if (!answered) {
      setSelectedAnswer(index)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return
    
    setAnswered(true)
    const isCorrect = selectedAnswer === question.correctAnswer
    onAnswerSubmit(isCorrect)
  }

  const getAnswerClass = (index) => {
    if (!answered) {
      return selectedAnswer === index ? 'selected' : ''
    }
    if (index === question.correctAnswer) {
      return 'correct'
    }
    if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
      return 'incorrect'
    }
    return ''
  }

  const answerLabels = ['A', 'B', 'C', 'D']

  return (
    <div className="question-container">
      <div className="question-card-fancy">
        <div className="confetti">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="confetti-piece" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              background: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#F7DC6F'][Math.floor(Math.random() * 5)]
            }}></div>
          ))}
        </div>
        
        <div className="question-header-fancy">
          <div className="question-icon">❓</div>
          <h2 className="question-title">CHIẾC TÚI MÙ SỐ</h2>
        </div>

        <div className="question-content">
          <div className="question-text-fancy">{question.question}</div>
        </div>

        <div className="answers-container">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              className={`answer-option ${getAnswerClass(index)}`}
              onClick={() => handleAnswerClick(index)}
              disabled={answered}
            >
              <div className="answer-label">{answerLabels[index]}</div>
              <div className="answer-text">{answer}</div>
              {answered && index === question.correctAnswer && (
                <div className="answer-icon">✓</div>
              )}
              {answered && index === selectedAnswer && selectedAnswer !== question.correctAnswer && (
                <div className="answer-icon">✗</div>
              )}
            </button>
          ))}
        </div>

        <div className="question-actions">
          {!answered ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="btn-submit"
            >
              Xác nhận đáp án
            </button>
          ) : (
            <div className={`result-message ${selectedAnswer === question.correctAnswer ? 'correct' : 'incorrect'}`}>
              {selectedAnswer === question.correctAnswer ? (
                <>
                  <span className="result-icon">🎉</span>
                  <span>Chính xác! Bạn đã trả lời đúng!</span>
                </>
              ) : (
                <>
                  <span className="result-icon">😔</span>
                  <span>Rất tiếc! Đáp án đúng là {answerLabels[question.correctAnswer]}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionScreen

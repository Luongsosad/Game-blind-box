import { useState, useEffect, useRef } from 'react'

function QuestionScreen({ question, onAnswerSubmit, onBackToSelection, onNextQuestion }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isTimeUp, setIsTimeUp] = useState(false)

  const correctSoundRef = useRef(null)
  const wrongSoundRef = useRef(null)

  // Timer đếm ngược
  useEffect(() => {
    if (answered || isTimeUp) return

    if (timeLeft === 0) {
      setIsTimeUp(true)
      setAnswered(true)
      onAnswerSubmit(false) // Hết thời gian = sai
      if (wrongSoundRef.current) {
        wrongSoundRef.current.play()
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, answered, isTimeUp, onAnswerSubmit])

  const handleAnswerClick = (index) => {
    if (!answered) {
      setSelectedAnswer(index)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    setAnswered(true)
    const isCorrect = selectedAnswer === question.correctAnswer

    // Phát âm thanh
    if (isCorrect && correctSoundRef.current) {
      correctSoundRef.current.play()
    } else if (!isCorrect && wrongSoundRef.current) {
      wrongSoundRef.current.play()
    }

    onAnswerSubmit(isCorrect)
  }

  const handleNext = () => {
    onNextQuestion()
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
      {/* Hidden audio elements */}
      <audio ref={correctSoundRef} src="/sounds/correct.mp3" />
      <audio ref={wrongSoundRef} src="/sounds/wrong.mp3" />

      <div className="question-card-fancy">
        <div>
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
            <h2 className="question-title">❓ TÚI MÙ SỐ {question.boxNumber}</h2>

            {/* Timer */}
            <div className={`timer ${timeLeft <= 10 ? 'timer-warning' : ''} ${isTimeUp ? 'timer-up' : ''}`}>
              <div className="timer-icon">⏱️</div>
              <div className="timer-value">{timeLeft}s</div>
            </div>
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
              <>
                <div className={`result-message ${selectedAnswer === question.correctAnswer ? 'correct' : 'incorrect'}`}>
                  {isTimeUp ? (
                    <>
                      <span className="result-icon">⏰</span>
                      <span>Hết thời gian! Đáp án đúng là {answerLabels[question.correctAnswer]}</span>
                    </>
                  ) : selectedAnswer === question.correctAnswer ? (
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

                <div className="navigation-buttons">
                  <button onClick={onBackToSelection} className="btn-back">
                    🔙 Về màn hình chính
                  </button>
                  <button onClick={handleNext} className="btn-next">
                    Câu tiếp theo ➡️
                  </button>
                </div>
              </>
            )}
          </div>

        </div>

        <div className='question-card-fancy-1'>
          {answered && <>
            {question.explanation && (
              <div className="explanation-box">
                <div className="explanation-header">
                  <span className="explanation-icon">💡</span>
                  <span className="explanation-title">Giải thích</span>
                </div>
                <p className="explanation-text">{question.explanation}</p>
              </div>
            )}


          </>}
        </div>
      </div>
    </div>
  )
}

export default QuestionScreen

import { useState, useEffect, useRef } from 'react'
import questionsData from '../data/questions.json'
import GiftBoxSelection from './GiftBoxSelection'
import CongratulationScreen from './CongratulationScreen'
import QuestionScreen from './QuestionScreen'
import ResultScreen from './ResultScreen'

function QuizGame() {
  const [gameState, setGameState] = useState('selection') // 'selection', 'congratulation', 'question', 'result'
  const [questions, setQuestions] = useState([])
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState(0)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  
  const backgroundMusicRef = useRef(null)

  useEffect(() => {
    setQuestions(questionsData)
  }, [])

  // Quản lý nhạc nền
  useEffect(() => {
    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = 0.3 // Giảm âm lượng xuống 30%
      
      if (isMusicPlaying) {
        backgroundMusicRef.current.play().catch(err => {
          console.log('Không thể phát nhạc nền:', err)
        })
      } else {
        backgroundMusicRef.current.pause()
      }
    }
  }, [isMusicPlaying])

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying)
  }

  const handleBoxSelect = (questionId) => {
    const questionIndex = questions.findIndex(q => q.id === questionId)
    const question = { ...questions[questionIndex], boxNumber: questionIndex + 1 }
    setCurrentQuestion(question)
    setGameState('congratulation') // Hiện màn hình chúc mừng trước
  }

  const handleContinueToQuestion = () => {
    setGameState('question')
  }

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 10)
      setCorrectAnswers(correctAnswers + 1)
    } else {
      setIncorrectAnswers(incorrectAnswers + 1)
    }
    
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id])
  }

  const handleBackToSelection = () => {
    setGameState('selection')
  }

  const handleNextQuestion = () => {
    // Check if all questions answered
    if (answeredQuestions.length + 1 === questions.length) {
      setGameState('result')
    } else {
      setGameState('selection')
    }
  }

  const handleRestart = () => {
    setGameState('selection')
    setAnsweredQuestions([])
    setCurrentQuestion(null)
    setScore(0)
    setCorrectAnswers(0)
    setIncorrectAnswers(0)
  }

  return (
    <div className="game-wrapper">
      {/* Nhạc nền */}
      <audio ref={backgroundMusicRef} src="/sounds/background.mp3" loop />
      
      {/* Nút điều khiển nhạc */}
      <button className="music-toggle" onClick={toggleMusic}>
        {isMusicPlaying ? '🔊' : '🔇'}
      </button>

      {gameState === 'selection' && (
        <GiftBoxSelection
          questions={questions}
          answeredQuestions={answeredQuestions}
          onBoxSelect={handleBoxSelect}
          score={score}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
        />
      )}

      {gameState === 'congratulation' && currentQuestion && (
        <CongratulationScreen
          boxNumber={currentQuestion.boxNumber}
          onContinue={handleContinueToQuestion}
        />
      )}
      
      {gameState === 'question' && currentQuestion && (
        <QuestionScreen
          question={currentQuestion}
          onAnswerSubmit={handleAnswerSubmit}
          onBackToSelection={handleBackToSelection}
          onNextQuestion={handleNextQuestion}
        />
      )}
      
      {gameState === 'result' && (
        <ResultScreen
          score={score}
          correctAnswers={correctAnswers}
          incorrectAnswers={incorrectAnswers}
          totalQuestions={questions.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

export default QuizGame

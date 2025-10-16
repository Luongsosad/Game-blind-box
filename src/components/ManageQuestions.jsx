import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function ManageQuestions() {
  const [questions, setQuestions] = useState([])
  const [formData, setFormData] = useState({
    question: '',
    answers: ['', '', '', ''],
    correctAnswer: 0
  })

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = () => {
    const saved = localStorage.getItem('quizQuestions')
    if (saved) {
      setQuestions(JSON.parse(saved))
    }
  }

  const saveQuestions = (newQuestions) => {
    localStorage.setItem('quizQuestions', JSON.stringify(newQuestions))
    setQuestions(newQuestions)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      question: e.target.value
    })
  }

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...formData.answers]
    newAnswers[index] = value
    setFormData({
      ...formData,
      answers: newAnswers
    })
  }

  const handleCorrectAnswerChange = (index) => {
    setFormData({
      ...formData,
      correctAnswer: index
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.question.trim()) {
      alert('Vui lòng nhập câu hỏi!')
      return
    }
    
    const emptyAnswers = formData.answers.filter(a => !a.trim())
    if (emptyAnswers.length > 0) {
      alert('Vui lòng nhập đầy đủ 4 đáp án!')
      return
    }

    const newQuestion = {
      id: Date.now(),
      question: formData.question,
      answers: formData.answers,
      correctAnswer: formData.correctAnswer
    }

    const updatedQuestions = [...questions, newQuestion]
    saveQuestions(updatedQuestions)

    // Reset form
    setFormData({
      question: '',
      answers: ['', '', '', ''],
      correctAnswer: 0
    })

    alert('Đã thêm câu hỏi thành công!')
  }

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa câu hỏi này?')) {
      const updatedQuestions = questions.filter(q => q.id !== id)
      saveQuestions(updatedQuestions)
    }
  }

  const handleClearAll = () => {
    if (confirm('Bạn có chắc muốn xóa TẤT CẢ câu hỏi? Hành động này không thể hoàn tác!')) {
      saveQuestions([])
    }
  }

  return (
    <div className="container">
      <div className="manage-container">
        <div className="manage-header">
          <h1>📝 Quản Lý Câu Hỏi</h1>
          <div>
            <Link to="/" className="btn btn-primary" style={{marginRight: '10px'}}>
              Về trang chơi
            </Link>
            {questions.length > 0 && (
              <button onClick={handleClearAll} className="btn btn-secondary">
                Xóa tất cả
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Câu hỏi:</label>
            <textarea
              value={formData.question}
              onChange={handleInputChange}
              placeholder="Nhập câu hỏi của bạn..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Đáp án (Chọn đáp án đúng bằng cách click vào ô tròn):</label>
            <div className="answer-inputs">
              {formData.answers.map((answer, index) => (
                <div key={index} className="answer-input-group">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={formData.correctAnswer === index}
                    onChange={() => handleCorrectAnswerChange(index)}
                  />
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    placeholder={`Đáp án ${String.fromCharCode(65 + index)}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-success">
            ➕ Thêm câu hỏi
          </button>
        </form>

        {questions.length > 0 && (
          <div className="questions-list">
            <h2>Danh sách câu hỏi ({questions.length})</h2>
            {questions.map((q, qIndex) => (
              <div key={q.id} className="question-item">
                <div className="question-item-header">
                  <h3>Câu {qIndex + 1}: {q.question}</h3>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="btn-delete"
                  >
                    🗑️ Xóa
                  </button>
                </div>
                <div className="answers">
                  {q.answers.map((answer, aIndex) => (
                    <div
                      key={aIndex}
                      className={`answer-item ${aIndex === q.correctAnswer ? 'correct' : ''}`}
                    >
                      <strong>{String.fromCharCode(65 + aIndex)}.</strong>
                      {answer}
                      {aIndex === q.correctAnswer && (
                        <span className="correct-indicator">✓ Đúng</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {questions.length === 0 && (
          <div className="empty-state">
            <p>Chưa có câu hỏi nào. Hãy thêm câu hỏi đầu tiên!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageQuestions

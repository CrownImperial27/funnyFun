import { useState } from 'react'
import './App.css'

const cheeses = [
  {
    name: 'Parmigiano Reggiano',
    country: 'Italy',
    milk: 'Cow',
    texture: 'Hard and granular',
    flavor: 'Nutty, savory, and rich',
  },
  {
    name: 'Brie de Meaux',
    country: 'France',
    milk: 'Cow',
    texture: 'Soft and creamy',
    flavor: 'Buttery with earthy mushroom notes',
  },
  {
    name: 'Roquefort',
    country: 'France',
    milk: 'Sheep',
    texture: 'Moist and crumbly blue cheese',
    flavor: 'Tangy, salty, and sharp',
  },
  {
    name: 'Manchego',
    country: 'Spain',
    milk: 'Sheep',
    texture: 'Firm and compact',
    flavor: 'Fruity, nutty, and slightly sweet',
  },
  {
    name: 'Gouda',
    country: 'Netherlands',
    milk: 'Cow',
    texture: 'Semi-hard and smooth',
    flavor: 'Caramel-like and mellow',
  },
  {
    name: 'Halloumi',
    country: 'Cyprus',
    milk: 'Goat and sheep',
    texture: 'Semi-hard and springy',
    flavor: 'Salty and milky',
  },
]

const quizQuestions = [
  {
    question: 'Which cheese is a famous blue cheese made from sheep milk?',
    options: ['Gouda', 'Roquefort', 'Halloumi', 'Brie de Meaux'],
    answer: 'Roquefort',
  },
  {
    question: 'Which cheese comes from Cyprus and is known for being grill-friendly?',
    options: ['Manchego', 'Halloumi', 'Parmigiano Reggiano', 'Brie de Meaux'],
    answer: 'Halloumi',
  },
  {
    question: 'Which cheese is from Spain?',
    options: ['Manchego', 'Gouda', 'Roquefort', 'Brie de Meaux'],
    answer: 'Manchego',
  },
  {
    question: 'Which cheese is hard, granular, and from Italy?',
    options: ['Gouda', 'Halloumi', 'Parmigiano Reggiano', 'Roquefort'],
    answer: 'Parmigiano Reggiano',
  },
]

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = quizQuestions[currentQuestionIndex]

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option)
  }

  const handleNextQuestion = () => {
    if (!selectedAnswer) {
      return
    }

    if (selectedAnswer === currentQuestion.answer) {
      setScore((previousScore) => previousScore + 1)
    }

    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1

    if (isLastQuestion) {
      setShowResult(true)
      return
    }

    setCurrentQuestionIndex((previousIndex) => previousIndex + 1)
    setSelectedAnswer('')
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setSelectedAnswer('')
    setShowResult(false)
  }

  return (
    <main className="app">
      <header className="hero">
        <h1>Cheese Atlas</h1>
        <p>
          Discover famous cheeses from around the world, then test your taste
          knowledge in a quick quiz game.
        </p>
      </header>

      <section className="section">
        <h2>Cheese Wiki</h2>
        <div className="cheese-grid">
          {cheeses.map((cheese) => (
            <article className="cheese-card" key={cheese.name}>
              <h3>{cheese.name}</h3>
              <dl>
                <div>
                  <dt>Country</dt>
                  <dd>{cheese.country}</dd>
                </div>
                <div>
                  <dt>Milk</dt>
                  <dd>{cheese.milk}</dd>
                </div>
                <div>
                  <dt>Texture</dt>
                  <dd>{cheese.texture}</dd>
                </div>
                <div>
                  <dt>Flavor</dt>
                  <dd>{cheese.flavor}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="section quiz">
        <h2>Cheese Quiz</h2>
        {showResult ? (
          <div className="result">
            <p>
              You scored <strong>{score}</strong> out of{' '}
              <strong>{quizQuestions.length}</strong>.
            </p>
            <button type="button" onClick={handleRestartQuiz}>
              Play again
            </button>
          </div>
        ) : (
          <div>
            <p className="question">
              Question {currentQuestionIndex + 1} of {quizQuestions.length}:{' '}
              {currentQuestion.question}
            </p>
            <div className="options">
              {currentQuestion.options.map((option) => (
                <button
                  className={selectedAnswer === option ? 'selected' : ''}
                  key={option}
                  type="button"
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="next-button"
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
            >
              {currentQuestionIndex === quizQuestions.length - 1
                ? 'Finish quiz'
                : 'Next question'}
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default App

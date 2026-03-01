import { useState, useEffect, useRef } from 'react'
import './App.css'

const soundMap = {
  nawaz_sharif: '/sounds/nawaz.wav',
  maryam_nawaz: '/sounds/Maryam.wav',
  imran_khan: '/sounds/imran.wav',
  shahbaz_sharif: '/sounds/Shahbaz.wav',
  bilawal_bhutto: '/sounds/bilawal.wav',
  altaf_hussain: '/sounds/altaf.wav',
  firdous_ashiq: '/sounds/Firdos.wav',
  benazir_bhutto: '/sounds/bilawal.wav',
  sheikh_rasheed: '/sounds/Sheikh.wav'
}

const personalities = {
  nawaz_sharif: {
    name: "Nawaz Sharif",
    quote: "Na sadiq hu na Ameen hu, Mei krapshan ki masheen hu"
  },
  maryam_nawaz: {
    name: "Maryam Nawaz",
    quote: "Ye bhool hain gulaab k koi asla to nhi"
  },
  imran_khan: {
    name: "Imran Khan",
    quote: "Hame to pf ne loota, fit mai kahan dam tha"
  },
  shahbaz_sharif: {
    name: "Shahbaz Sharif",
    quote: "Mei Programming Prhne nhi aya, lekin CS k lye Majboori hei"
  },
  bilawal_bhutto: {
    name: "Bilawal Bhutto",
    quote: "Tum to aik kanputli ho, tumhari doren to PF hilaa raha hai"
  },
  altaf_hussain: {
    name: "Altaf Hussain",
    quote: "Vote for Miss Samia Masood Awan, Warnaa bori tayyaar"
  },
  firdous_ashiq: {
    name: "Firdous Ashiq Awan",
    quote: "Politics mujhe ati nhi, Boxing meri jaati nhi"
  },
  benazir_bhutto: {
    name: "Benazir Bhutto",
    quote: "First woman PM of Pakistan"
  },
  sheikh_rasheed: {
    name: "Sheikh Rasheed",
    quote: "Har shaks ka apna raasta hai"
  }
}

const questions = [
  { id: 1, question: "Is your character over 50 years?", yes: 2, no: 20 },
  { id: 2, question: "Is your character from Punjab?", yes: 3, no: 7 },
  { id: 3, question: "Does your character have a famous brother?", yes: 4, no: 30 },
  { id: 4, question: "Does your character have a famous daughter?", yes: 5, no: 30 },
  { id: 5, question: "Is your character's daughter a politician?", yes: 6, no: 30 },
  { id: 6, question: "Did your character introduce major projects?", yes: 8, no: 30 },
  { id: 7, question: "Is your character currently alive?", yes: 9, no: 16 },
  { id: 8, question: "Did your character get hit with a shoe?", yes: 9, no: 30 },
  { id: 9, question: "Did your character become PM more than once?", yes: 10, no: 30 },
  { id: 10, question: "Is your character half bald?", yes: 11, no: 30 },
  { id: 11, question: "Does your character have a palace?", yes: 12, no: 30 },
  { id: 12, question: "Does your character look like a bear?", yes: 13, no: 30 },
  { id: 13, question: "Has your character been jailed?", yes: 14, no: 30 },
  { id: 14, question: "Did your character go abroad for medical treatment?", yes: 15, no: 30 },
  { id: 15, question: "Did your character run from the country?", yes: 'nawaz_sharif', no: 30 },
  { id: 16, question: "Is your character famous in Sindh?", yes: 17, no: 18 },
  { id: 17, question: "Was your character from a prominent political family?", yes: 21, no: 30 },
  { id: 18, question: "Is your character a former cricketer?", yes: 'imran_khan', no: 19 },
  { id: 19, question: "Is your character known for humor in speech?", yes: 'shahbaz_sharif', no: 30 },
  { id: 20, question: "Is your character clean-shaved?", yes: 22, no: 23 },
  { id: 21, question: "Was she the first woman PM of a Muslim country?", yes: 'benazir_bhutto', no: 30 },
  { id: 22, question: "Is your character unmarried?", yes: 24, no: 30 },
  { id: 23, question: "Does your character have a moustache?", yes: 25, no: 30 },
  { id: 24, question: "Did your character study abroad?", yes: 26, no: 30 },
  { id: 25, question: "Is your character currently in Pakistan?", yes: 27, no: 'altaf_hussain' },
  { id: 26, question: "Does your character hold a high position in party?", yes: 28, no: 30 },
  { id: 27, question: "Is your character from Kashmiri family?", yes: 'sheikh_rasheed', no: 30 },
  { id: 28, question: "Is your character known for saying 'Absolutely not'?", yes: 29, no: 30 },
  { id: 29, question: "Did your character get shot on leg?", yes: 'imran_khan', no: 30 },
  { id: 30, question: "Is your character over 40 years?", yes: 31, no: 'bilawal_bhutto' },
  { id: 31, question: "Does your character look young?", yes: 32, no: 30 },
  { id: 32, question: "Is your character married?", yes: 33, no: 30 },
  { id: 33, question: "Does your character have 4 kids?", yes: 34, no: 30 },
  { id: 34, question: "Is she known as the 'nani' of other politicians?", yes: 35, no: 30 },
  { id: 35, question: "Does she wear tons of makeup?", yes: 'maryam_nawaz', no: 36 },
  { id: 36, question: "Is she from Sialkot district?", yes: 'firdous_ashiq', no: 30 }
]

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [history, setHistory] = useState([])
  const [gameState, setGameState] = useState('playing')
  const [result, setResult] = useState(null)
  const [resultKey, setResultKey] = useState(null)
  const themeRef = useRef(null)
  const resultRef = useRef(null)

  useEffect(() => {
    if (gameState === 'playing') {
      if (!themeRef.current) {
        themeRef.current = new Audio('/sounds/akinator_theme (1).wav')
        themeRef.current.loop = true
      }
      themeRef.current.play().catch(e => console.log('Theme play failed:', e))
    } else if (gameState === 'result') {
      if (themeRef.current) {
        themeRef.current.pause()
        themeRef.current.currentTime = 0
      }
      
      if (resultKey) {
        const soundPath = soundMap[resultKey]
        if (soundPath) {
          resultRef.current = new Audio(soundPath)
          resultRef.current.play().catch(e => console.log('Result sound play failed:', e))
        }
      }
    }
    
    return () => {
      if (themeRef.current) {
        themeRef.current.pause()
      }
      if (resultRef.current) {
        resultRef.current.pause()
      }
    }
  }, [gameState, resultKey])

  const handleAnswer = (answer) => {
    const q = questions.find(q => q.id === currentQuestion)
    const nextId = answer === 'yes' ? q.yes : q.no
    
    setHistory([...history, { question: currentQuestion, answer }])
    
    if (typeof nextId === 'string') {
      setResult(personalities[nextId])
      setResultKey(nextId)
      setGameState('result')
    } else {
      setCurrentQuestion(nextId)
    }
  }

  const restartGame = () => {
    if (resultRef.current) {
      resultRef.current.pause()
      resultRef.current = null
    }
    if (themeRef.current) {
      themeRef.current.pause()
      themeRef.current.currentTime = 0
    }
    setCurrentQuestion(1)
    setHistory([])
    setGameState('playing')
    setResult(null)
    setResultKey(null)
  }

  const currentQ = questions.find(q => q.id === currentQuestion)

  return (
    <div className="app">
      <div className="game-container">
        <div className="header">
          <h1 className="title">Guess The Personality</h1>
          <p className="subtitle">Think of a famous personality...</p>
        </div>

        {gameState === 'playing' && currentQ && (
          <div className="question-card">
            <div className="question-number">Question {history.length + 1}</div>
            <h2 className="question-text">{currentQ.question}</h2>
            <div className="buttons">
              <button className="btn yes" onClick={() => handleAnswer('yes')}>
                Yes
              </button>
              <button className="btn no" onClick={() => handleAnswer('no')}>
                No
              </button>
            </div>
          </div>
        )}

        {gameState === 'result' && result && (
          <div className="result-card">
            <h2 className="result-name">{result.name}</h2>
            <p className="result-quote">"{result.quote}"</p>
            <button className="btn restart" onClick={restartGame}>
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

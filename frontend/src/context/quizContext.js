import { createContext, useReducer } from 'react'

export const QuizContext = createContext()

export const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUIZ':
      return { 
        quiz: action.payload 
      }
    case 'CREATE_QUIZ':
      return { 
        quiz: [action.payload, ...state.quiz] 
      }
    default:
      return state
  }
}

export const QuizContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, { 
    quiz : null
  })
  
  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      { children }
    </QuizContext.Provider>
  )
}
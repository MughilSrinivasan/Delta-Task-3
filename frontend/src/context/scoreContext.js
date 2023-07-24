import { createContext, useReducer } from 'react'

export const ScoreContext = createContext()

export const scoreReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SCORE':
      return { 
        scoreUpdate : action.payload 
      }
    case 'SET_SCORE':
        return { 
          scoreUpdate : action.payload 
        }
    case 'RESET':
      return { 
        scoreUpdate : action.payload 
      }
    default:
      return state
  }
  
}

export const ScoreContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(scoreReducer, { 
    scoreUpdate : null
  })

  return (
    <ScoreContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ScoreContext.Provider>
  )

}
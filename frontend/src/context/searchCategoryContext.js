import { createContext, useReducer } from 'react'

export const SearchCategoryContext = createContext()

export const searchCategoryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SEARCH_CATEGORY':
      return { 
        result : action.payload 
      }
    default:
      return state
  }
  
}

export const SearchCategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchCategoryReducer, { 
    result : null
  })

  return (
    <SearchCategoryContext.Provider value={{ ...state, dispatch }}>
      { children }
    </SearchCategoryContext.Provider>
  )

}
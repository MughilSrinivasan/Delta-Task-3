import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QuizContextProvider } from './context/quizContext';
import { UserContextProvider } from './context/userContext';
import { SearchContextProvider } from './context/searchContext';
import { ScoreContextProvider } from './context/scoreContext';
import { SearchCategoryContextProvider } from './context/searchCategoryContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode className="App">
    <UserContextProvider>
      <ScoreContextProvider>
        <SearchContextProvider>
          <SearchCategoryContextProvider>
            <QuizContextProvider>
              <App />
            </QuizContextProvider>
          </SearchCategoryContextProvider>
        </SearchContextProvider>
      </ScoreContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);



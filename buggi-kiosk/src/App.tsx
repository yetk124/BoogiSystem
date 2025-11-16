import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//pages의 router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import BookSearchPage from './pages/BookSearchPage';
import CheckoutPage from './pages/CheckoutPage';
import BookRecommendPage from './pages/BookRecommendPage';
import InteractionPage from './pages/InteractionPage';
import PopularBooksPage from './pages/PopularBookPage';
import ReturnDuePage from './pages/ReturnDuePage';
import SecurityAlertPage from './pages/SecurityPage';
import StudyRoomStatusPage from './pages/StudyRoomStatusPage';
import KioskStartPage from './pages/KioskStartPage';

function App() {
  //const [count, setCount] = useState(0)

  return (
    /*
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
    */
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<KioskStartPage />} />      {/* 첫 화면 */}
        <Route path="/home" element={<HomePage />} />        {/* 기존 홈 */}
        <Route path="/book-search" element={<BookSearchPage /> } />
        <Route path="/popular-books" element={<PopularBooksPage />} />
        <Route path="/book-recommend" element={<BookRecommendPage />} />
        <Route path="/return-due" element={<ReturnDuePage />} />
        <Route path="/studyroom-status" element={<StudyRoomStatusPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/security" element={<SecurityAlertPage />} />
        <Route path="/interaction" element={<InteractionPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App

import React from 'react';
import BookList from './pages/BookList';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BookList />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/Main';
import { RatesPage } from './pages/Rates';
import { AboutPage } from './pages/About';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/rates' element={<RatesPage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </Router>
  );
};

export default App;

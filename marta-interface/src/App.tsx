import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import LinesPage from './pages/LinesPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/lines/:lineColor" element={<LinesPage />} />
          <Route path="/lines" element={<LinesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import './App.css';
import { Header } from './components/Header';
import { NotFound } from './pages/NotFound';
import './scss/app.scss';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { Home } from './pages/Home';
import { Card } from './pages/Card';

function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="wrapper">
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className="content">
        <Routes>
          <Route
            index
            element={<Home searchValue={searchValue} />}
          />
          <Route
            path="card"
            element={<Card />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

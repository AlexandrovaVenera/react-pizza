import "./App.css";
import { Header } from "./components/Header";
import { NotFound } from "./pages/NotFound";
import "./scss/app.scss";
import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import { Home } from "./pages/Home";
import { Card } from "./pages/Card";
export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route index element={<Home />} />
            <Route path="card" element={<Card />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;

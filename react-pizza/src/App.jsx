import "./App.css";
import { Header } from "./components/Header";
import { NotFound } from "./pages/NotFound";
import "./scss/app.scss";
import { Outlet, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Card } from "./pages/Card";

function App() {
  return (
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
  );
}

export default App;

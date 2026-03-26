import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutPages from "./pages/AboutPages";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<AboutPages />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
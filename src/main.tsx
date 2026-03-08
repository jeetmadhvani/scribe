import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Waitlist from "./pages/Waitlist.tsx";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Waitlist />} />
      <Route path="/landing" element={<App />} />
    </Routes>
  </BrowserRouter>
)

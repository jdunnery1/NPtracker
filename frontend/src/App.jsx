import { useState } from 'react'
import {Route, Routes} from "react-router-dom";
import { motion } from "motion/react"
import Gallery from "./pages/gallery.jsx";
import Tracking from "./pages/tracking.jsx";

function App() {

  return (
    <Routes>
        <Route path={'/'} element={<Gallery />} />
        <Route path={'/track'} element={<Tracking />} />
    </Routes>
  )
}

export default App

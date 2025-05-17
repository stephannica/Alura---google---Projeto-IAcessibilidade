
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import InitialScreen from "./components/InitialScreen"
import MainScreen from "./components/MainScreen"

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<InitialScreen />} />
        <Route path="/main/" element={<MainScreen />} />
      </Routes>
    </Router>
  )
}

export default App
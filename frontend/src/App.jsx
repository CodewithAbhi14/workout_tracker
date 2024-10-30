import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import { useAuthContext } from './hooks/useAuthContext'

function App() {
  const {user} = useAuthContext()

  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={user ? <Home/> : <Navigate to="/login"/> } />
          <Route path="/profile" element={user ? <Profile></Profile> : <Navigate to="/login"/> } />
          <Route path="/login" element={!user ? <LogIn/> : <Navigate to="/"/> } />
          <Route path="/signup" element={!user ?<SignUp/>: <Navigate to="/"/>} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  )
}

export default App

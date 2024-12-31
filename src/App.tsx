import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home  from './Pages/Home'
import Cartella from './Pages/Cartella'
import Tombola from "./Pages/Tombola";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/Tombola' element={<Tombola/>} />
                <Route path='/Cartella' element={<Cartella/>} />
            </Routes>
        </Router>
    )
}

export default App
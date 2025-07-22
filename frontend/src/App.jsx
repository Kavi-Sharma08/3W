import { Routes, Route } from 'react-router-dom'
import Form from "./components/Form.jsx"
import AllUsers from './components/AllUsers.jsx'
import Leaderboard from './components/Leaderboard.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/users" element={<AllUsers />} />
      <Route path='/leaderboard' element = {<Leaderboard/>}></Route>
    </Routes>
  )
}

export default App
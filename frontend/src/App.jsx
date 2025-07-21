import { Routes, Route } from 'react-router-dom'
import Form from "./components/Form.jsx"
import AllUsers from './components/AllUsers.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/users" element={<AllUsers />} />
    </Routes>
  )
}

export default App
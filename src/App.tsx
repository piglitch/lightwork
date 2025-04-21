import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import TextEditor from './components/TextEditor'

function App() {

  return (
    <BrowserRouter>
      <div className='flex flex-col'>
        <Navbar />
        <TextEditor />
        <div>footer</div>
      </div>
    </BrowserRouter>
  )
}

export default App

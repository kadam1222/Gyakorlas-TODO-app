
import './App.css'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Menubar from './components/menubar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Fooldal from './components/fooldal';
import Rolunk from './components/about';
import Todos from './components/teendok';
import UjTodos from './components/ujtehendo';

function App() {


  return (
    <>
      <Menubar/>
      <Router>
        <Routes>
          <Route path='/' element={<Fooldal/>}></Route>
          <Route path='/about' element= {<Rolunk/>}></Route>
          <Route path='/todos' element= {<Todos/>}></Route>
          <Route path='/todos/ujtodos' element= {<UjTodos/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

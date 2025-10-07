import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { SellerDashboard } from './pages/SellerDashboard'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/home' element={<Home/>} ></Route>
        <Route path='/sellerdashboard' element={<SellerDashboard/>} ></Route>
      </Routes>
    </BrowserRouter>
  )

}
export default App

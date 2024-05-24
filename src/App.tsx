
import './App.css';
import Film from './components/Film'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Contact from './components/Contact'
import Detail from './components/Detail'
import News from './components/News'
import { AuthContextProvider } from './components/authConfig/AuthConext';
import Protected from './components/protected/Protected';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Edit from './components/Edit';

function App(): JSX.Element {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<><Film /></>} />
            <Route path='/login' element={<><Login /></>} />
            <Route path='/detail/:id' element={<><Detail /></>}></Route>
            <Route path='/contact' element={<><Contact /></>}></Route>
            <Route path='/news' element={<><News /></>}></Route>
            <Route path='/dashboard' element={<><Protected><Dashboard /></Protected></>}></Route>
            <Route path='/edit/:id' element={<><Edit></Edit></>}></Route>
          </Routes>

        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;

import Home from './components/user/Home';
import Todo from './components/todo/todo'
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import { BrowserRouter , Route, Routes,redirect} from "react-router-dom";
import "./app.css"
import Page404 from './components/NotFound/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/user" Component={Home}/>
          <Route path="/user/signup" Component={Signup}/>
          <Route path="/user/login" Component={Login} />
          re
          {/* <Route path="/todo" Component={Todo} /> */}
          <Route path="/*" Component={Page404} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

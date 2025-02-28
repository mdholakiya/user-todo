import { BrowserRouter , Route, Routes,redirect} from "react-router-dom";
import Profile from "./components/UserProfile/Profile";
import Home from './components/user/Home';
import Todo from './components/todo/todo';
import Signup from './components/user/Signup';
import Login from './components/user/Login';
import Page404 from './components/NotFound/NotFound';
import "./app.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/Header";
import { ToastContainer} from 'react-toastify';

function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" Component={Login}/>
          <Route path="/user/home" Component={Home}/>
          <Route path="/user/signup" Component={Signup}/>
          <Route path="/user/login" Component={Login} />
          <Route path="/user/profile" Component={Profile} />
          {/* <Route path="/user/delete" Component={Logout} /> */}
          <Route path="/toDo/add" Component={Todo} />
          <Route path="/*" Component={Page404} />
        </Routes>
        <ToastContainer position="top-right " />
      </BrowserRouter>

    </>
  )
}

export default App

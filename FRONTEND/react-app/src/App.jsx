import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CommonRoute, PrivateRoutes } from "./utils/PrivateRout";
import Profile from "./components/UserProfile/Profile";
import Home from './components/user/Home';
// import Todo from './components/todo/todo';
import Signup from './components/user/Signup';

import Page404 from './components/NotFound/NotFound';
import "./app.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/Header";
import { ToastContainer } from 'react-toastify';
import CreateTodo from "./components/todo/CreateTodo";
// import Tabel from "./components/todo/Tabel";
import Todo from "./components/todo/todo";
import Login from "./components/user/LOGIN";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>

          <Route path="/" Component={Home} />
          <Route path="/*" Component={Page404} />
        
          <Route exact element={<PrivateRoutes />}>
            <Route exact path="/user/profile" Component={Profile} />
            <Route exact path="/todo/add" Component={Todo} />
            <Route exact path="/todo/newAdd" Component={CreateTodo} />
          </Route>

          <Route exact element={<CommonRoute />}>
            <Route exact path="/user/login" Component={Login} />
            <Route exact path="/user/signup" Component={Signup} />
          </Route>

        </Routes>
      </BrowserRouter>
      <ToastContainer />

    </>
  )
}

export default App

import { Outlet, Navigate } from "react-router-dom";

 function PrivateRoutes() {
  const userid = localStorage.getItem("Token")
  console.log(userid,"user id ==========");
  
  return <>{userid ? <Outlet /> : <Navigate to="/" />};</>;
}

 function CommonRoute() {
    const userid = localStorage.getItem("Token")
    return <>{userid ? <Navigate to="/" /> :<Outlet />};</>;
  }

  export{PrivateRoutes ,CommonRoute}
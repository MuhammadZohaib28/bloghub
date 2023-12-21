import React, { createContext, useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { lookInSession } from "./common/session";

export const UserContext = createContext({});

const Layout = () => {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ accessToken: null }); 
  }, []);
  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Navbar />
      <Outlet />
    </UserContext.Provider>
  );
};
export default Layout;

import React, { createContext, useEffect, useState } from "react";

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { lookInSession } from "./common/session";

export const UserContext = createContext({});

function Layout() {
  const [userAuth, setUserRoute] = useState({});

  useEffect(() => {
    let userInSession = lookInSession("user");

    userInSession
      ? setUserRoute(JSON.parse(userInSession))
      : setUserRoute({ accessToken: null });
  }, []);
  return (
    <UserContext.Provider value={{ userAuth, setUserRoute }}>
      <Navbar />
      <Outlet />
    </UserContext.Provider>
  );
}

export default Layout;

import React, { useContext } from "react";
import PageAnimation from "./PageAnimation";
import { Link } from "react-router-dom";
import { UserContext } from "../Layout";
import { removeFromSession } from "../common/session";

const UserNavigation = () => {
  const {
    userAuth: { username },
    setUserAuth,
  } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ accessToken: null });
  };
  return (
    <PageAnimation
      transition={{ duration: 0.5 }}
      className="absolute right-0 z-50"
    >
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <Link to={"/editor"} className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit"></i>
          <p>Write</p>
        </Link>

        <Link to={`/user/${username}`} className="flex gap-2  link pl-8 py-4">
          <i class="fi fi-rr-user"></i>
          Profile
        </Link>

        <Link to={"/dashboard/blogs"} className="flex gap-2  link pl-8 py-4">
          <i class="fi fi-rr-dashboard"></i>
          Dashboard
        </Link>

        <Link
          to={"/settings/edit-profile"}
          className="flex gap-2  link pl-8 py-4"
        >
          <i class="fi fi-rr-settings"></i>
          Settings
        </Link>

        <span className="absolute border-t border-grey -ml-6 w-[200%] "></span>

        <button
          className="text-left p-4  hover:bg-grey w-full pl-8  py-4"
          onClick={signOutUser}
        >
          <h1 className="font-bold text-xl mg-1">Sign Out</h1>
          <p className="text-dark-grey ">@{username}</p>
        </button>
      </div>
    </PageAnimation>
  );
};

export default UserNavigation;

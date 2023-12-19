import React from "react";
import InputBox from "../components/InputBox";
import google from "../../public/google.png";
import { Link } from "react-router-dom";
import PageAnimation from "../components/PageAnimation";

const UserAuth = ({ type }) => {
  return (
    <PageAnimation keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <form className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24 ">
            {type == "Sign-In" ? "Welcome Back" : "Join Us Today"}
          </h1>

          {type !== "Sign-In" ? (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
            />
          ) : null}

          <InputBox
            name="email"
            type="text"
            placeholder="Email"
            icon="fi-rr-envelope"
          />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-lock"
          />

          <button className="btn-dark center mt-14" type="submit">
            {type}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button className="btn-dark flex items-center gap-4 justify-center center w-[90%]">
            <img src={google} alt="Google Icon" className="w-5" />
            Continue with Google
          </button>

          {type == "Sign-In" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account ?
              <Link
                to="/signup"
                className="bg-grey rounded-full p-2 text-black text-xl ml-1"
              >
                {" "}
                Join Us
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member ?
              <Link
                to="/signin"
                className="bg-grey rounded-full p-2 text-black text-xl ml-1"
              >
                {" "}
                Sign In
              </Link>
            </p>
          )}
        </form>
      </section>
    </PageAnimation>
  );
};

export default UserAuth;

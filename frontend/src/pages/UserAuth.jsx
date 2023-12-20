import React, { useContext } from "react";
import InputBox from "../components/InputBox";
import google from "../../public/google.png";
import { Link, Navigate } from "react-router-dom";
import PageAnimation from "../components/PageAnimation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../Layout";

const UserAuth = ({ type }) => {
  // const authentication = useRef();

  const {
    userAuth: { accessToken },
    setUserAuth,
  } = useContext(UserContext);

  console.log(accessToken?.toString());

  const userAuthThroughServer = (serverRoute, formData) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));

        setUserAuth(data);
        console.log(data)
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type == "Sign-In" ? "/signin" : "/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    // Form Data
    let form = new FormData(formElement);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    // Form Validations

    let { fullname, email, password } = formData;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.error("Fullname must be at least 3 characters long");
      }
    }

    if (!email.length) {
      return toast.error("Enter Email Please");
    }

    if (!emailRegex.test(email)) {
      return toast.error("Enter Valid Email");
    }

    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must be at least 6 characters long and contain at least one number, one lowercase and one uppercase letter"
      );
    }

     userAuthThroughServer(serverRoute, formData);
  };
  return accessToken ? (
    <Navigate to="/" />
  ) : (
    <PageAnimation keyValue={type}>
      <section className="h-cover flex items-center justify-center ">
        <Toaster />
        <form id="formElement" className="w-[80%] max-w-[400px]">
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

          <button
            className="btn-dark center mt-14"
            type="submit"
            onClick={handleSubmit}
          >
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

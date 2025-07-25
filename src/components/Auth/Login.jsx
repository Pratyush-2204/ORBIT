import React from "react";
import { useState } from "react";

const Login = ({handleLogin}) => {

  // console.log(props)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(email,password);
    handleLogin(email,password)
    setEmail("")
    setPassword("")
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="border-2 border-red-600 p-20">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col items-center justify-center"
        >
          <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          required
            className="outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400 text-white"
            type="email"
            placeholder="Enter Your Email"
          />

          <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          required
            className="outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400 mt-3 text-white"
            type="password"
            placeholder="Enter Password"
          />

          <button type="submit" className="mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full placeholder:text-white">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

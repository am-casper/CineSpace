"use client"; // to use this component on the client side only (decorator)
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function SignupPage() {
  // once the user is signed up, we want to redirect them to the login page

  const router = useRouter();

  // state of button depending on whether the user is signing up or not

  const [buttonDisabled, setButtonDisabled] = useState(false);

  // creating user state variable and setUser function to update it and setting initial state
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  // loading state variable
  const [loading, setLoading] = useState(false);

  // method for signup
  const onSignup = async () => {
    try {
      setLoading(true);
      // making a request to the backend
      // posting user(data) to the end point /api/users/signup
      const apiResponse = await axios.post("/api/users/signup", user);
      console.log("Signup ho gaya bro", apiResponse.data);
      router.push("/login");
    } catch (e: any) {
      // as this is a client component this console log will be visible on browser
      console.log("Ooopsie woopsie", e.message);
      // on the other hand all the console.log on the api section will be visible in the terminal
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  // jab jab target variable change hota hai useEffect trigger ho jaata hai

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Sign Up"}</h1>
      <label htmlFor="username">username</label>
      <input
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">email</label>
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={onSignup}>
        {buttonDisabled ? "Fill Details" : "Signup"}
      </button>
      <Link href="/login">Already have an accout? Login</Link>
    </div>
  );
}

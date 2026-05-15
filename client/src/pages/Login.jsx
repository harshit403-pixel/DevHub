import { useRef } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import usePageMotion from "../hooks/usePageMotion";

function Login() {
  const rootRef =
    useRef(null);

  const navigate =
    useNavigate();

  const { setUser } =
    useAuth();

  const {
    register,
    handleSubmit,
  } = useForm();

  usePageMotion(rootRef);

  const onSubmit = async (data) => {
    try {
      const res =
        await api.post(
          "/auth/login",
          data
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      setUser(res.data.user);
      toast.success("Welcome back");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div ref={rootRef}>
      <div className="mb-10 text-center">
        <h1
          data-hero-item
          className="text-5xl font-semibold tracking-tight text-zinc-900 max-sm:text-4xl"
        >
          Welcome Back
        </h1>

        <p
          data-hero-item
          className="mt-4 text-lg text-zinc-600"
        >
          Login to continue your DevHub
          journey.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <input
            data-hero-item
            type="email"
            placeholder="Email Address"
            className="w-full rounded-2xl border border-white/40 bg-white/40 px-5 py-4 text-zinc-900 outline-none transition placeholder:text-zinc-500 backdrop-blur-xl focus:border-zinc-300"
            {...register("email")}
          />
        </div>

        <div>
          <input
            data-hero-item
            type="password"
            placeholder="Password"
            className="w-full rounded-2xl border border-white/40 bg-white/40 px-5 py-4 text-zinc-900 outline-none transition placeholder:text-zinc-500 backdrop-blur-xl focus:border-zinc-300"
            {...register("password")}
          />
        </div>

        <button
          type="submit"
          data-motion-button
          className="w-full cursor-pointer rounded-2xl bg-zinc-900 py-4 font-medium text-white transition-all duration-300 hover:scale-[1.01]"
        >
          Login
        </button>
      </form>

      <p
        data-hero-item
        className="mt-8 text-center text-zinc-600"
      >
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-zinc-900"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default Login;

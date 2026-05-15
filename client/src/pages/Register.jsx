import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

import api from "../api/axios";

import { useAuth } from "../context/AuthContext";
import usePageMotion from "../hooks/usePageMotion";

function Register() {
  const rootRef =
    useRef(null);

  const navigate = useNavigate();

  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
  } = useForm();

  usePageMotion(rootRef);

  const onSubmit = async (data) => {
    try {
      const res = await api.post(
        "/auth/register",
        data
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      setUser(res.data.user);

      toast.success("Account created");

      navigate("/home");
    } catch (error) {
      console.log(error);

      toast.error("Registration failed");
    }
  };

  return (
    <div ref={rootRef}>
      <div className="mb-10 text-center">
        <h1
          data-hero-item
          className="text-5xl font-semibold text-zinc-900 tracking-tight max-sm:text-4xl"
        >
          Create Account
        </h1>

        <p
          data-hero-item
          className="text-zinc-600 mt-4 text-lg"
        >
          Join the DevHub developer
          community.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div>
          <input
            data-hero-item
            type="text"
            placeholder="Full Name"
            className="w-full rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl px-5 py-4 outline-none text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-300 transition"
            {...register("name")}
          />
        </div>

        <div>
          <input
            data-hero-item
            type="email"
            placeholder="Email Address"
            className="w-full rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl px-5 py-4 outline-none text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-300 transition"
            {...register("email")}
          />
        </div>

        <div>
          <input
            data-hero-item
            type="password"
            placeholder="Password"
            className="w-full rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl px-5 py-4 outline-none text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-300 transition"
            {...register("password")}
          />
        </div>

        <button
          type="submit"
          data-motion-button
          className="w-full rounded-2xl bg-zinc-900 text-white py-4 font-medium hover:scale-[1.01] transition-all duration-300 cursor-pointer"
        >
          Create Account
        </button>
      </form>

      <p
        data-hero-item
        className="text-center text-zinc-600 mt-8"
      >
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-zinc-900 font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;

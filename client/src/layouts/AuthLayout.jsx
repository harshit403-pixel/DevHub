import { useRef } from "react";
import {
  Outlet,
  useLocation,
} from "react-router-dom";

import useRouteTransition from "../hooks/useRouteTransition";

function AuthLayout() {
  const location =
    useLocation();

  const contentRef =
    useRef(null);

  useRouteTransition(
    contentRef,
    location.pathname,
    {
      duration: 0.72,
      y: 18,
      scale: 0.985,
    }
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5f1ea] px-4 sm:px-6">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-200 rounded-full blur-3xl opacity-40" />

      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-200 rounded-full blur-3xl opacity-40" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_40%)]" />

      {/* Glass Card */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-2xl bg-white/30 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-[32px] p-10 max-sm:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

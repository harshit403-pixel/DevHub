import { useRef } from "react";
import {
  Outlet,
  useLocation,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import useRouteTransition from "../hooks/useRouteTransition";

function PlatformLayout() {
  const location =
    useLocation();

  const contentRef =
    useRef(null);

  useRouteTransition(
    contentRef,
    location.pathname,
    {
      duration: 0.68,
      y: 18,
    }
  );

  return (
    <div className="min-h-screen bg-[#f5f1ea] text-zinc-900">
      <Navbar />

      <div ref={contentRef}>
        <Outlet />
      </div>
    </div>
  );
}

export default PlatformLayout;

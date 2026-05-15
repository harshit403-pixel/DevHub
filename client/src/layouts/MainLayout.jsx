import { useRef } from "react";
import {
  Outlet,
  useLocation,
} from "react-router-dom";

import useRouteTransition from "../hooks/useRouteTransition";

function MainLayout() {
  const location =
    useLocation();

  const contentRef =
    useRef(null);

  useRouteTransition(
    contentRef,
    location.pathname,
    {
      duration: 0.6,
      y: 0,
    }
  );

  return (
    <div ref={contentRef}>
      <Outlet />
    </div>
  );
}

export default MainLayout;

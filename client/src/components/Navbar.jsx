import { useRef } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";
import useRouteTransition from "../hooks/useRouteTransition";

function Navbar() {
  const {
    user,
    setUser,
  } = useAuth();

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const navRef =
    useRef(null);

  const isLanding =
    location.pathname === "/";

  useRouteTransition(
    navRef,
    location.pathname,
    {
      duration: 0.58,
      y: -12,
    }
  );

  if (isLanding) {
    return null;
  }

  const navLinks = [
    {
      name: "Home",
      path: "/home",
    },
    {
      name: "Explore",
      path: "/explore",
    },
    {
      name: "Blogs",
      path: "/blogs",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    setUser(null);

    navigate("/login");
  };

  const getLinkStyles = (
    path
  ) => {
    const isActive =
      location.pathname === path;

    return `transition-all duration-300 ${
      isActive
        ? "text-zinc-900 font-medium"
        : "text-zinc-600 hover:text-zinc-900"
    }`;
  };

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#f5f1ea]/80 px-4 py-3 backdrop-blur-2xl sm:px-5 sm:py-4 md:px-8"
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 max-sm:flex-wrap">
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center gap-3"
        >
          <span className="text-xl font-semibold tracking-[-0.05em] text-zinc-900 md:text-2xl">
            DevHub
          </span>


        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(
            (link) => (
              <Link
                key={link.path}
                to={link.path}
                className={getLinkStyles(
                  link.path
                )}
              >
                {link.name}
              </Link>
            )
          )}

          {user && (
            <Link
              to="/profile"
              className={getLinkStyles(
                "/profile"
              )}
            >
              Profile
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              {/* Profile */}
              <Link
                to="/profile"
                className="flex items-center gap-3"
              >
                <div className="h-11 w-11 overflow-hidden rounded-full border border-black/5 bg-[#efe7db] shadow-sm">
                  {user.profilePicture ? (
                    <img
                      src={
                        user.profilePicture
                      }
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-medium text-[#6f6254]">
                      {user.name?.charAt(
                        0
                      )}
                    </div>
                  )}
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-zinc-900">
                    {user.name}
                  </p>

                  <p className="text-xs text-[#7a6d60]">
                    Developer
                  </p>
                </div>
              </Link>

              {/* Logout */}
              <button
                onClick={
                  handleLogout
                }
                className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-800"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden text-sm text-zinc-700 transition hover:text-zinc-900 sm:inline-flex"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.03] hover:bg-zinc-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

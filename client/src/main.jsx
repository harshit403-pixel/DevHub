import { createRoot } from "react-dom/client";
import "./index.css";

import AppRouter from "./routes/router";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppRouter />
    <Toaster />
  </AuthProvider>
);
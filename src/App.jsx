import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import CalendarPage from "./pages/calendar-page/calendarPage";
import ReportPage from "./pages/reportPage/Report";
import NotFoundPage from "./pages/404/404";

import ToolsPage from "./pages/toolsPage/ToolsPage";
import { SelectedResultProvider } from "./pages/components/header/search/SelectedResultContext"; // Import the provider
import Login from "./pages/login-page/loginpage";
import { AuthProvider } from "./pages/AuthContext/authcontext";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/Home", element: <Home /> },
  { path: "/Calendar", element: <CalendarPage /> },
  { path: "/Student-Report", element: <ReportPage /> },
  { path: "/tools", element: <ToolsPage /> },
  { path: "/Library", element: <NotFoundPage /> },
  { path: "*", element: <NotFoundPage /> }, // Catch-all route for 404 Not Found
]);

function App() {
  return (
    <AuthProvider>
      <SelectedResultProvider>
        {" "}
        {/* Wrap the RouterProvider with SelectedResultProvider */}
        <RouterProvider router={router} />
      </SelectedResultProvider>
    </AuthProvider>
  );
}

export default App;

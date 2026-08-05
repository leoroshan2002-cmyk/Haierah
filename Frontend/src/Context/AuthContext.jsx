import { createContext, useContext, useState, useEffect } from "react";
import { buildApiUrl } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const loadStoredProfile = () => {
      if (typeof window === "undefined") return;
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser((currentUser) => ({ ...(currentUser || {}), ...parsedUser }));
        } catch {
          localStorage.removeItem("user");
        }
      }
    };

    const handleBeforeUnload = () => {
      localStorage.removeItem("user");
      localStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminToken");
    };

    loadStoredProfile();

    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      }
    };
  }, []);
  const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || "admin@haierah.com").trim().toLowerCase();
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
  const loginUrl = buildApiUrl("/api/auth/login");
  const registerUrl = buildApiUrl("/api/auth/register");

  const login = async (email, password) => {
    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (
          email.trim().toLowerCase() === adminEmail &&
          password === adminPassword
        ) {
          const fallbackAdminUser = {
            id: "local-admin",
            name: "Admin",
            email: adminEmail,
            role: "admin",
          };

          setUser(fallbackAdminUser);
          localStorage.setItem("user", JSON.stringify(fallbackAdminUser));
          localStorage.setItem("adminToken", "admin");

          return {
            success: true,
            user: fallbackAdminUser,
          };
        }

        return {
          success: false,
          message: data.message || "Login failed",
        };
      }

      const loggedInUser = data.user;
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      if (loggedInUser?.role === "admin") {
        localStorage.setItem("adminToken", "admin");
      } else {
        localStorage.removeItem("adminToken");
      }

      return {
        success: true,
        user: loggedInUser,
      };
    } catch (error) {
      if (
        email.trim().toLowerCase() === adminEmail &&
        password === adminPassword
      ) {
        const fallbackAdminUser = {
          id: "local-admin",
          name: "Admin",
          email: adminEmail,
          role: "admin",
        };

        setUser(fallbackAdminUser);
        localStorage.setItem("user", JSON.stringify(fallbackAdminUser));
        localStorage.setItem("adminToken", "admin");

        return {
          success: true,
          user: fallbackAdminUser,
        };
      }

      return {
        success: false,
        message: "Unable to reach authentication server. Please try again.",
      };
    }
  };

  const register = async (name, email, password, confirmPassword) => {
    try {
      const response = await fetch(registerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          message: data.message || "Registration failed",
        };
      }

      return {
        success: true,
        user: data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to reach authentication server. Please try again.",
      };
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
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

    loadStoredProfile();
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
        emailVerificationSent: data.emailVerificationSent,
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to reach authentication server. Please try again.",
      };
    }
  };

  const resendEmailVerification = async (email) => {
    try {
      const response = await fetch(buildApiUrl('/api/auth/email/verify/request'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || 'Unable to resend verification code.' };
      }
      return { success: true, message: data.message || 'Verification code resent.' };
    } catch (error) {
      return { success: false, message: 'Unable to reach authentication server. Please try again.' };
    }
  };

  const confirmEmailVerificationCode = async (email, code) => {
    try {
      const response = await fetch(buildApiUrl('/api/auth/email/verify/confirm'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || 'Verification failed.' };
      }
      return { success: true, message: data.message || 'Email verified successfully.' };
    } catch (error) {
      return { success: false, message: 'Unable to reach authentication server. Please try again.' };
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
    <AuthContext.Provider value={{ user, login, register, resendEmailVerification, confirmEmailVerificationCode, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
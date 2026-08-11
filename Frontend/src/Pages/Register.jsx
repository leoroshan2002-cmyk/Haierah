import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../Context/AuthContext";
import { renderGoogleButton } from "../utils/googleAuth";
import { buildApiUrl } from "../services/api";

import registerImage from "../assets/register.jpg";
import Logotransparent from "../assets/HaierahLogoTransparent.png";

import PageBack from "../Components/CommonDetails/PageBack";
export default function Register() {
  const navigate = useNavigate();
  const { user, register, updateUser } = useAuth();
  const googleButtonRef = useRef(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [googleCredential, setGoogleCredential] = useState(null);
  const [googleSignedIn, setGoogleSignedIn] = useState(false);
  const [googleAccountLoaded, setGoogleAccountLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  const decodeJwtPayload = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (googleCredential) {
      const result = await fetch(buildApiUrl('/api/auth/google'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: googleCredential, password, confirmPassword }),
      });

      const data = await result.json();

      if (!result.ok) {
        alert(data.message || 'Google registration failed.');
        return;
      }

      alert('Google registration completed and password saved successfully.');
      navigate('/login');
      return;
    }

    const result = await register(name, email, password, confirmPassword);

    if (result.success) {
      alert("Account created successfully!");
      navigate("/login");
    } else {
      alert(result.message || "Email already exists!");
    }
  };

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || !googleButtonRef.current) return;

    renderGoogleButton({
      clientId,
      container: googleButtonRef.current,
      onSuccess: async (credential) => {
        const payload = decodeJwtPayload(credential);
        if (payload?.email) {
          setEmail(payload.email);
        }
        if (payload?.name) {
          setName(payload.name);
        }
        setGoogleCredential(credential);
        setGoogleSignedIn(true);
        setGoogleAccountLoaded(true);

        alert('Google account loaded. Please complete your site registration by entering a new password and confirming it.');
      },
      onError: (message) => {
        alert(message || 'Google sign-up failed.');
      },
    });
  }, [navigate, updateUser]);

  return (
    <div className="min-h-screen relative">
      

      {/* TOP RIGHT LINK */}
      {/* <div className="absolute top-10 right-10 z-50 text-sm">
        <span className="text-gray-600">Already have an account?</span>

        <Link to="/login" className="ml-2 font-semibold hover:underline">
          Sign In
        </Link>
      </div> */}

      {/* MAIN GRID */}
      <div className="min-h-screen grid lg:grid-cols-2 bg-[#F8F7F5]">
           
        {/* LEFT SIDE */}
        <div className="relative hidden lg:block">
            
           <div className="absolute top-8 left-8 z-20">
             <img src={Logotransparent} alt="HAIERAH Logo" className="h-16 w-auto object-contain" />
            </div>
          <img
            src={registerImage}
            alt="HAIERAH Register"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>

          <div className="absolute bottom-16 left-12 text-white">
            <p className="uppercase tracking-[6px] text-sm">
              JOIN HAIERAH
            </p>

            <h1 className="font-serif text-6xl leading-tight mt-5">
              Create
              <br />
              Your Style.
            </h1>

            <p className="mt-5 text-lg max-w-sm">
              Join HAIERAH and discover premium fashion made for every occasion.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-8 py-10">
            
      
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-2xl p-12 w-full max-w-md"
          >

            <h1 className="text-5xl font-serif text-center text-black">
              HAIERAH
            </h1>

            <p className="text-center text-gray-500 uppercase tracking-[4px] mt-3 mb-10">
              Create Your Account
            </p>

            {/* FORM FIELDS */}
            <input
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-5 outline-none focus:ring-2 focus:ring-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              readOnly={googleSignedIn}
            />

            <input
              type="email"
              autoComplete="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-5 outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              readOnly={googleSignedIn}
            />
            {googleSignedIn && (
              <p className="text-sm text-green-600 mb-5">
                Google account loaded. Complete registration by entering a new password and confirming it.
              </p>
            )}

            <input
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-5 outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="password"
              autoComplete="new-password"
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 mb-6 outline-none focus:ring-2 focus:ring-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {/* TERMS */}
            <div className="flex items-start gap-3 mb-6">
              <input type="checkbox" required className="mt-1" />
              <p className="text-sm text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="underline mx-1">
                  Terms & Conditions
                </Link>
                and
                <Link to="/privacy" className="underline ml-1">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl uppercase tracking-widest hover:bg-gray-800 transition"
            >
              {googleAccountLoaded ? 'Finish Registration' : 'Create Account'}
            </button>
            <br />

            {googleAccountLoaded ? (
              <div className="mt-4 text-center text-sm text-gray-600">
                Google account loaded. Enter a new password to finish registration.
              </div>
            ) : (
              <div className="mt-4 w-full">
                <div ref={googleButtonRef} className="w-full flex justify-center" />
              </div>
            )}

            <p className="text-center mt-2 text-gray-600">
              Already have an account?
              <Link to="/login" className="ml-2 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
            
          </motion.form>
        </div>
      </div>
    </div>
  );
}
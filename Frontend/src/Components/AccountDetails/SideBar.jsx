import { motion } from "framer-motion";
import {
  User,
  Lock,
  Settings,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const menu = [
  { icon: User, title: "Personal Details" },
  { icon: Lock, title: "Security" },
  { icon: Settings, title: "Preferences" },
  { icon: ClipboardList, title: "Order History" },
];

export default function Sidebar({ activepage, setActivePage }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className="
        fixed
        top-20
        left-0
        w-[270px]
        h-[calc(100vh-80px)]
        bg-[#F7F4F2]
        border-r
        border-zinc-200
        flex
        flex-col
        justify-between
        z-40
      "
    >
      {/* Top */}
      <div className="pt-10">
        <div className="px-8 mb-10">
          <h1 className="font-serif text-2xl tracking-wide">
            ELITE
          </h1>

          <p className="text-[11px] text-zinc-500 mt-1 tracking-[0.2em] uppercase">
            Account Panel
          </p>
        </div>

        <nav className="space-y-1 relative">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = activepage === item.title;

            return (
              <motion.button
                key={item.title}
                onClick={() => setActivePage(item.title)}
                whileHover={{ x: 6 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
                className={`relative w-full flex items-center gap-4 px-8 py-4 text-left transition-all ${
                  isActive
                    ? "text-black"
                    : "text-zinc-500 hover:text-black"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className="absolute left-0 top-0 h-full w-[3px] bg-black rounded-r-full"
                  />
                )}

                <Icon size={18} strokeWidth={1.5} />

                <span className="text-[11px] uppercase tracking-[0.2em]">
                  {item.title}
                </span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-6 border-t border-zinc-200">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-black text-white text-[11px] uppercase tracking-[0.25em]"
        >
          <LogOut size={14} />
          Sign Out
        </motion.button>
      </div>
    </aside>
  );
}
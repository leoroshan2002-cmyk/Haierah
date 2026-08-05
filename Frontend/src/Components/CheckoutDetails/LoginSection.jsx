import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "../../Context/AuthContext";

export default function LoginSection() {
  const { user } = useAuth();

  const displayName = user?.name ||
    (user?.firstName || user?.lastName
      ? `${user?.firstName || ""} ${user?.lastName || ""}`.trim()
      : "Guest");
  const displayEmail = user?.email || "No email available";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b p-6"
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <h2 className="text-3xl font-semibold">
             Account Details
          </h2>

          <CheckCircle2
            size={28}
            className="text-green-600 fill-green-600 text-white"
          />

        </div>

       

      </div>

      {/* User */}

      <p className="text-xl text-gray-600 mt-4">
        Logged in as
        <span className="font-medium text-black ml-2">
          {displayName} ({displayEmail})
        </span>
      </p>

    </motion.div>
  );
}
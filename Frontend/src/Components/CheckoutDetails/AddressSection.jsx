import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  MapPin,
  Pencil,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { buildApiUrl } from "../../services/api";

export default function AddressSection() {
  const [show, setShow] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [savingAddress, setSavingAddress] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const { user, updateUser } = useAuth();

  const displayName =
    user?.name ||
    (user?.firstName || user?.lastName
      ? `${user?.firstName || ""} ${user?.lastName || ""}`.trim()
      : "Guest");

  const addressLine = user?.address || "No address added yet";
  const cityLine = [user?.city, user?.state].filter(Boolean).join(", ") || "Add your city and state";
  const postalLine = user?.zip ? `India - ${user.zip}` : "Add your postal code";
  const phoneLine = user?.phone || "Phone not provided";

  const openAddressForm = () => {
    setFormData({
      name: user?.name || displayName || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zip: user?.zip || "",
      phone: user?.phone || "",
    });
    setErrorMessage("");
    setSuccessMessage("");
    setIsEditingAddress(true);
    setShow(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async (event) => {
    event.preventDefault();

    if (!user?.id) {
      setErrorMessage("Please log in before saving an address.");
      return;
    }

    setSavingAddress(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(buildApiUrl(`/api/users/${user.id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          zip: formData.zip.trim(),
          phone: formData.phone.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to save address.");
      }

      const updatedUser = {
        ...user,
        ...data.customer,
      };

      updateUser(updatedUser);
      setSuccessMessage("Address saved successfully.");
      setIsEditingAddress(false);
    } catch (error) {
      setErrorMessage(error.message || "Unable to save address.");
    } finally {
      setSavingAddress(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="border-b p-8"
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <h2 className="text-3xl font-semibold">
             Shipping Address
          </h2>

          <CheckCircle2
            size={26}
            className="text-green-600 fill-green-600 text-white"
          />

        </div>

        <button onClick={() => setShow(!show)}>
          <ChevronDown
            className={`cursor-pointer transition-transform duration-300 ${
              show ? "rotate-180" : ""
            }`}
          />
        </button>

      </div>

      {show && (
        <>
          {/* Address Card */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 border rounded-2xl p-6 bg-gray-50"
          >
            <div className="flex justify-between">

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-full bg-[#0d2746] text-white flex items-center justify-center">
                  <MapPin size={24} />
                </div>

                <div>

                  <h3 className="text-2xl font-semibold">
                    Home Address
                  </h3>

                  <p className="text-gray-600 mt-3">{displayName}</p>

                  <p className="text-gray-600">{addressLine}</p>

                  <p className="text-gray-600">{cityLine}</p>

                  <p className="text-gray-600">{postalLine}</p>

                  <p className="text-gray-600 mt-2">{phoneLine}</p>

                </div>

              </div>

              <button
                type="button"
                onClick={openAddressForm}
                className="flex items-center gap-2 text-[#0d2746] hover:text-black transition"
              >
                <Pencil size={16} />
                {user?.address || user?.city || user?.state || user?.zip || user?.phone ? "Edit" : "Add"}
              </button>

            </div>
          </motion.div>

          {isEditingAddress && (
            <form
              onSubmit={handleSaveAddress}
              className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              {errorMessage && <p className="mb-3 text-sm text-red-600">{errorMessage}</p>}
              {successMessage && <p className="mb-3 text-sm text-green-600">{successMessage}</p>}

              <div className="grid gap-4 md:grid-cols-2">
                <label className="text-sm text-gray-700">
                  Full Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Enter full name"
                  />
                </label>

                <label className="text-sm text-gray-700">
                  Phone
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Enter phone number"
                  />
                </label>

                <label className="text-sm text-gray-700 md:col-span-2">
                  Address
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="House number, street name"
                  />
                </label>

                <label className="text-sm text-gray-700">
                  City
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="City"
                  />
                </label>

                <label className="text-sm text-gray-700">
                  State
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="State"
                  />
                </label>

                <label className="text-sm text-gray-700">
                  ZIP / Postal Code
                  <input
                    type="text"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Postal code"
                  />
                </label>
              </div>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditingAddress(false)}
                  className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAddress}
                  className="rounded-full bg-[#0d2746] px-4 py-2 text-sm text-white disabled:opacity-70"
                >
                  {savingAddress ? "Saving..." : "Save Address"}
                </button>
              </div>
            </form>
          )}

          {/* Add New Address */}

          {!isEditingAddress && (
            <button
              type="button"
              onClick={openAddressForm}
              className="mt-6 w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-4 hover:border-[#0d2746] hover:text-[#0d2746] transition"
            >
              <Plus size={18} />
              Add New Address
            </button>
          )}
        </>
      )}
    </motion.div>
  );
}
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrackingTimeline from "./TrackingTimeline";
import { resolveBackendImageUrl } from "../../services/api";

export default function OrderCard({ order, onUpdateOrder, onDeleteOrder, onCancelOrder }) {
  const timelineRef = useRef(null);
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(order?.status || "Processing");
  if (!order || !order.items) return null;

  const resolveImageUrl = (image) => resolveBackendImageUrl(image);

  const handleBuyAgain = () => {
    navigate("/products");
    setFeedback("Redirecting you to products to reorder this item.");
  };

  const getAddressText = () => {
    const shippingAddress = order?.shippingAddress || {};
    const addressParts = [
      shippingAddress.fullName,
      shippingAddress.address || shippingAddress.street,
      shippingAddress.city,
      shippingAddress.state,
      shippingAddress.pincode || shippingAddress.zip,
      shippingAddress.country,
    ].filter(Boolean);

    return addressParts.join(", ") || order?.customerAddressText || order?.customer?.address || "Address not available";
  };

  const getEstimatedDelivery = () => {
    if (!order?.estimatedDelivery) return "To be confirmed";
    const date = new Date(order.estimatedDelivery);
    return Number.isNaN(date.getTime()) ? "To be confirmed" : date.toLocaleDateString();
  };

  const handleDownloadInvoice = () => {
    setFeedback("Invoice download will be available soon for this order.");
  };

  const handleNeedHelp = () => {
    setFeedback("Our support team will assist you shortly.");
  };

  const handleUpdateStatus = () => {
    if (!order) return;
    onUpdateOrder?.(order.id || order.orderId || order._id, selectedStatus);
    setFeedback(`Order status updated to ${selectedStatus}.`);
  };

  const handleDeleteOrder = () => {
    if (!order) return;
    if (window.confirm("Delete this order from your history?")) {
      onDeleteOrder?.(order.id || order.orderId || order._id);
      setFeedback("Order removed from your history.");
    }
  };

  const handleCancelOrder = () => {
    if (!order) return;
    if (window.confirm("Cancel this order?")) {
      onCancelOrder?.(order.id || order.orderId || order._id);
      setFeedback("Cancellation request sent.");
    }
  };

  const canCancel = ["Pending", "Confirmed", "Processing"].includes(String(order?.status || "").trim());

  useEffect(() => {
    setSelectedStatus(order?.status || "Processing");
  }, [order?.status]);

  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden mb-8">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-4 sm:px-6 sm:py-5 md:px-8">

        <div className="grid w-full grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4 md:gap-14">

          <div>
            <p className="text-xs uppercase text-gray-500">Order Placed</p>
            <p className="mt-1 font-semibold">{order.date || new Date(order.createdAt || Date.now()).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-500">Total</p>
            <p className="mt-1 font-semibold">₹{order.total}</p>
          </div>

          <div>
            <p className="text-xs uppercase text-gray-500">Status</p>

            <span
              className={`inline-flex mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : order.status === "Shipped" || order.status === "Out for Delivery"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.status || "Pending"}
            </span>

          </div>

          <div>
            <p className="text-xs uppercase text-gray-500">Order ID</p>
            <p className="mt-1 break-all font-semibold">{order.id || order.orderId}</p>
          </div>

        </div>
      </div>

      {/* PRODUCTS */}
      {order.items.map((item) => (
        <div
          key={item.id || item.name}
          className="flex flex-col items-stretch gap-6 border-b px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8 md:py-8"
        >

          {/* LEFT */}
          <div className="flex min-w-0 gap-4 sm:gap-6">

            <img
              src={resolveImageUrl(item.image)}
              alt={item.name}
              className="h-28 w-24 shrink-0 rounded-xl border object-cover sm:h-36 sm:w-32"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80";
              }}
            />

            <div className="min-w-0">

              <h2 className="break-words text-lg font-semibold sm:text-xl">{item.name}</h2>

              <div className="flex items-center gap-2 mt-2">
                <span className="text-yellow-500 text-lg">★★★★★</span>
                <span className="text-gray-500 text-sm">4.8 (286 Reviews)</span>
              </div>

              <p className="mt-4 text-gray-600">
                <strong>Color:</strong> {item.color || item.selectedColor || "N/A"}
              </p>

              <p className="text-gray-600">
                <strong>Size:</strong> {item.size || item.selectedSize || "N/A"}
              </p>

              {item.category && (
                <p className="text-gray-600">
                  <strong>Category:</strong> {item.category}
                </p>
              )}

              {item.brand && (
                <p className="text-gray-600">
                  <strong>Brand:</strong> {item.brand}
                </p>
              )}

              {item.material && (
                <p className="text-gray-600">
                  <strong>Material:</strong> {item.material}
                </p>
              )}

              <p className="text-gray-600">
                <strong>Quantity:</strong> {item.quantity || item.qty || 1}
              </p>

              <p className="text-2xl font-bold mt-4">
                ₹{item.price}
              </p>

              <p className="text-green-600 font-medium mt-3">
                ✓ Delivered on {order.date}
              </p>

            </div>
          </div>

          {/* RIGHT */}
          <div className="grid w-full grid-cols-2 gap-2 sm:gap-3 md:w-44 md:grid-cols-1">
            <button
              onClick={handleBuyAgain}
              className="rounded-lg border px-2 py-3 text-sm transition hover:bg-black hover:text-white sm:text-base"
            >
              Buy Again
            </button>

            <button
              onClick={() => {
                timelineRef.current?.scrollIntoView({ behavior: "smooth" });
                setFeedback("Tracking details opened below.");
              }}
              className="rounded-lg border px-2 py-3 text-sm transition hover:bg-black hover:text-white sm:text-base"
            >
              Track Package
            </button>

            <button
              onClick={handleDownloadInvoice}
              className="rounded-lg border px-2 py-3 text-sm transition hover:bg-black hover:text-white sm:text-base"
            >
              Download Invoice
            </button>

            <button
              onClick={handleNeedHelp}
              className="rounded-lg border px-2 py-3 text-sm transition hover:bg-black hover:text-white sm:text-base"
            >
              Need Help
            </button>
          </div>

        </div>
      ))}
            {/* VIEW DETAILS BUTTON */}
      <div className="flex flex-col items-center gap-3 border-b px-4 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            onClick={handleUpdateStatus}
            className="border rounded-lg px-6 py-2.5 hover:bg-black hover:text-white transition"
          >
            Update Status
          </button>

          <button
            onClick={handleCancelOrder}
            disabled={!canCancel}
            className={`rounded-lg px-6 py-2.5 transition ${
              canCancel
                ? "border border-red-200 text-red-600 hover:bg-red-50"
                : "border border-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            {canCancel ? "Cancel Order" : "Cancel Unavailable"}
          </button>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="border rounded-lg px-8 py-3 hover:bg-black hover:text-white transition"
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>

        {feedback && (
          <p className="text-sm text-green-600">{feedback}</p>
        )}
      </div>


      {/* SHIPPING + PAYMENT + COURIER + SUMMARY */}

      {showDetails && (

        <div className="border-t bg-[#fafafa] p-4 sm:p-6 md:p-8">

          <div className="grid lg:grid-cols-2 gap-8">


            {/* Shipping */}
            <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-6">
              <h3 className="text-lg font-semibold mb-5">Shipping Address</h3>
              <p className="font-semibold">{order.shippingAddress?.fullName || order.customer?.name || order.customerName || "Customer"}</p>
              <p className="text-gray-600 mt-1">{order.shippingAddress?.phone || order.customer?.phone || order.customerPhone || "Phone not available"}</p>
              <p className="text-gray-500 mt-4 leading-7">{getAddressText()}</p>
            </div>



            {/* Payment */}
            <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-6">

              <h3 className="text-lg font-semibold mb-5">
                 Payment Information
              </h3>


              <div className="space-y-4">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Method
                  </span>

                  <span className="font-medium">
                    {order.paymentMethod || order.payment?.method || "Cash on Delivery"}
                  </span>
                </div>


                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Status
                  </span>

                  <span className="text-green-600 font-semibold">
                    {order.paymentStatus || order.payment?.status || "Pending"}
                  </span>
                </div>


                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Transaction ID
                  </span>

                  <span className="max-w-full break-all text-right font-medium">
                    {order.transactionId || order.payment?.transaction || order.razorpayPaymentId || "Pending"}
                  </span>
                </div>

                {order.razorpayPaymentId ? (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Razorpay Payment ID</span>
                    <span className="max-w-full break-all text-right font-medium">{order.razorpayPaymentId}</span>
                  </div>
                ) : null}

                {order.razorpayOrderId ? (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Razorpay Order ID</span>
                    <span className="max-w-full break-all text-right font-medium">{order.razorpayOrderId}</span>
                  </div>
                ) : null}


              </div>

            </div>




            {/* Courier */}

            <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-6">

              <h3 className="text-lg font-semibold mb-5">
                 Courier Details
              </h3>


              <div className="space-y-4">


                <div className="flex justify-between">
                  <span className="text-gray-500">Partner</span>
                  <span className="font-medium">{order.courier || "Not Assigned"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Tracking No.</span>
                  <span className="max-w-full break-all text-right font-medium">{order.trackingNumber || "Generating..."}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Delivery</span>
                  <span className="font-medium">{getEstimatedDelivery()}</span>
                </div>


              </div>

            </div>





            {/* Summary */}

            <div className="rounded-xl border bg-white p-4 shadow-sm sm:p-6">


              <h3 className="text-lg font-semibold mb-5">
                 Order Summary
              </h3>



              <div className="space-y-4">


                <div className="flex justify-between">

                  <span>
                    Items
                  </span>

                  <span>
                    {order.items.length}
                  </span>

                </div>



                <div className="flex justify-between">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹{order.total}
                  </span>

                </div>



                <div className="flex justify-between">

                  <span>
                    Shipping
                  </span>

                  <span className="text-green-600">
                    FREE
                  </span>

                </div>



                <div className="flex justify-between font-bold text-lg border-t pt-4">

                  <span>
                    Total
                  </span>

                  <span>
                    ₹{order.total}
                  </span>

                </div>


              </div>


            </div>


          </div>




          {/* TRACKING TIMELINE */}

          <div ref={timelineRef} className="mt-10">
            <TrackingTimeline status={order.status} />
          </div>



        </div>

      )}


    </div>

  );
}
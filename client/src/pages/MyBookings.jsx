import { useState } from "react";
import { getBookingsByEmail } from "../services/api";

const MyBookings = () => {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    if (!email) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data } = await getBookingsByEmail(email);
      setBookings(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-gray-200 text-gray-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">My Bookings</h1>

        {/* Email Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border rounded-lg px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={fetchBookings}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Search
          </button>
        </div>

        {error && <div className="mb-4 text-red-500">{error}</div>}

        {loading && <p className="text-center">Loading...</p>}

        {!loading && bookings.length === 0 && email && (
          <p className="text-gray-500">No bookings found.</p>
        )}

        {/* Booking List */}
        {!loading && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-md rounded-xl p-5"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div>
                    <h2 className="font-semibold text-lg">
                      {booking.expert?.name}
                    </h2>

                    <p className="text-gray-600">{booking.expert?.category}</p>

                    <p className="mt-2 text-sm">
                      {booking.date} — {booking.timeSlot}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge(
                      booking.status,
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

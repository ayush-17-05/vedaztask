import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { createBooking } from "../services/api";

const Booking = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const selectedSlot = location.state;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!selectedSlot) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No slot selected. Please go back.</p>
      </div>
    );
  }

  const validateForm = () => {
    if (!form.name || !form.email || !form.phone) {
      return "All fields are required";
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      return "Invalid email format";
    }

    if (form.phone.length < 10) {
      return "Phone number must be at least 10 digits";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await createBooking({
        expert: id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: selectedSlot.date,
        timeSlot: selectedSlot.timeSlot,
        notes: form.notes,
      });

      alert("Booking successful 🎉");

      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 py-10">
        <div className="bg-white shadow-md rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-6">Confirm Booking</h1>

          {/* Slot Summary */}
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p>
              <strong>Date:</strong> {selectedSlot.date}
            </p>
            <p>
              <strong>Time:</strong> {selectedSlot.timeSlot}
            </p>
          </div>

          {error && <div className="mb-4 text-red-500">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg px-4 py-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="tel"
              placeholder="Phone"
              className="w-full border rounded-lg px-4 py-2"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <textarea
              placeholder="Notes (optional)"
              className="w-full border rounded-lg px-4 py-2"
              rows="3"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;

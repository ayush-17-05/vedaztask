import Booking from "../models/Booking.js";
import Expert from "../models/Expert.js";

export const createBooking = async (req, res) => {
  try {
    const { expert, name, email, phone, date, timeSlot, notes } = req.body;

    if (!expert || !name || !email || !phone || !date || !timeSlot) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const expertExists = await Expert.findById(expert);
    if (!expertExists) {
      return res.status(404).json({ message: "Expert not found" });
    }

    const booking = new Booking({
      expert,
      name,
      email,
      phone,
      date,
      timeSlot,
      notes,
    });

    await booking.save(); // Unique index protects here

    const io = req.app.get("io");

    io.to(expert.toString()).emit("slotBooked", {
      date,
      timeSlot,
    });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "This slot is already booked",
      });
    }

    console.error("❌ ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const bookings = await Booking.find({ email }).populate(
      "expert",
      "name category",
    );

    res.json(bookings);
  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const normalizedStatus =
      status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    if (!["Pending", "Confirmed", "Completed"].includes(normalizedStatus)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = normalizedStatus;
    await booking.save();

    res.json({ message: "Status updated", booking });
  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

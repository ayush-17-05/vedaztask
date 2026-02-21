import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExpertById } from "../services/api";
import SlotSelector from "../components/SlotSelector";
import socket from "../socket";

const ExpertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedSlot, setSelectedSlot] = useState(null);

  const fetchExpert = async () => {
    try {
      setLoading(true);
      const { data } = await getExpertById(id);
      setExpert(data);
    } catch (err) {
      setError("Failed to load expert");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpert();
  }, [id]);

  // 🔥 Real-time slot update
  useEffect(() => {
    socket.emit("joinExpertRoom", id);

    socket.on("slotBooked", ({ date, timeSlot }) => {
      setExpert((prev) => ({
        ...prev,
        availableSlots: prev.availableSlots.map((group) =>
          group.date === date
            ? {
                ...group,
                slots: group.slots.filter((slot) => slot !== timeSlot),
              }
            : group,
        ),
      }));
    });

    return () => {
      socket.off("slotBooked");
    };
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  if (!expert) return <p className="text-center mt-10">Expert not found</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Expert Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold">{expert.name}</h1>
          <p className="text-gray-600 mt-1">{expert.category}</p>
          <p className="mt-2">Experience: {expert.experience} years</p>
          <p className="mt-1">⭐ {expert.rating}</p>
        </div>

        {/* Slots */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Available Slots</h2>

          <SlotSelector
            slots={expert.availableSlots}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
          />

          {selectedSlot && (
            <button
              onClick={() =>
                navigate(`/booking/${expert._id}`, {
                  state: selectedSlot,
                })
              }
              className="mt-6 w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Book Selected Slot
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpertDetail;

const SlotSelector = ({ slots, selectedSlot, setSelectedSlot }) => {
  if (!slots || slots.length === 0) {
    return <p className="text-gray-500">No available slots.</p>;
  }

  return (
    <div className="space-y-8">
      {slots.map((group) => (
        <div key={group.date}>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {group.date}
          </h3>

          <div className="flex flex-wrap gap-3">
            {group.slots.map((slot) => {
              const isSelected =
                selectedSlot?.date === group.date &&
                selectedSlot?.timeSlot === slot;

              return (
                <button
                  key={slot}
                  onClick={() =>
                    setSelectedSlot({ date: group.date, timeSlot: slot })
                  }
                  className={`px-4 py-2 rounded-full border transition ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white hover:bg-blue-50 border-gray-300"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlotSelector;

import { Link } from "react-router-dom";

const ExpertCard = ({ expert }) => {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 hover:shadow-lg transition duration-300 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">{expert.name}</h2>
          <span className="text-yellow-500 font-medium">
            ⭐ {expert.rating}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-1">{expert.category}</p>

        <p className="mt-3 text-sm text-gray-600">
          {expert.experience} years experience
        </p>
      </div>

      <Link
        to={`/expert/${expert._id}`}
        className="mt-6 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-xl hover:opacity-90 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default ExpertCard;

import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
const USERS_PER_PAGE = 5;

const AllUsers = () => {
  const {user : loggedInUser} = useUser();
  console.log(loggedInUser);
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [claimedPoints, setClaimedPoints] = useState({}); // so that it is showm to the user who has claimed the pointes

  const fetchSuggestion = async (page) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/getAllUsers?page=${page}&limit=${USERS_PER_PAGE}`
      );
      setAllUsers(res?.data?.users || []);
      setTotalPages(res?.data?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleClaim = async (userId) =>{
    console.log(userId)
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/claimPoints/${userId}`)
      console.log(res)
      console.log(res.data)
      const points = res.data;
      setClaimedPoints((prev) => ({
        ...prev,
        [userId]: points,  // store per user
      }));
      
    } catch (error) {
      console.log(error);
      
    }
  }
  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    fetchSuggestion(page);
  }, [page]);

  if(!loggedInUser){
    return navigate("/")
    
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">All Users</h1>
        <p className="text-gray-500 mt-1">Page {page} of {totalPages}</p>
      </div>

      <div className="space-y-4 max-w-3xl mx-auto">
        {allUsers.length > 0 ? (
          allUsers.map((user) => (
            user._id === loggedInUser._id ? null : (
              <div
                key={user._id}
                className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">{user.username}</p>
                  <p className="text-sm text-gray-500">ID: {user._id}</p>
                  {claimedPoints[user._id] && (
                    <p className="text-green-600 font-medium mt-1">
                      🎉 Claimed: {claimedPoints[user._id]} points
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleClaim(user._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
                >
                  Claim
                </button>
                
              </div>
              
            )
          ))
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>

      <div className="flex justify-center mt-10 gap-4">
        <button
          onClick={handlePrevious}
          disabled={page === 1}
          className={`px-5 py-2 rounded-xl border transition font-medium ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className={`px-5 py-2 rounded-xl border transition font-medium ${
            page === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllUsers;

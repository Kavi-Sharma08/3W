import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client"
const Leaderboard = () => {
  const USER_PER_PAGE = 5
  const [userInLeaderboard, setuserInLeaderboard] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, settotalPages] = useState(0);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL ,{
      transports: ["websocket"], // 👈 force WebSocket transport
    });
    setSocket(newSocket);

    newSocket.on("leaderboard", (users) => {
      setuserInLeaderboard(users.slice((page - 1) * USER_PER_PAGE, page * USER_PER_PAGE));
      settotalPages(Math.ceil(users.length / USER_PER_PAGE));
  });

  return () => {
    newSocket.disconnect();
  };
  }, [page]);
  const fetchUsers =async ()=>{
    const users = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leaderboard?page=${page}&limit=${USER_PER_PAGE}`);
    setuserInLeaderboard(users?.data?.users);
    settotalPages(users?.data?.totalPages);

  }
  useEffect(()=>{
    fetchUsers();

  },[page])
  const handlePrevious =()=>{
    if(page > 1){
      setPage((prev)=>prev-1);

    }

  }
  const handleNext =()=>{
    if(page < totalPages){
      setPage((prev)=>prev+1);

    }
  }



  return (

    
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        🏆 Leaderboard
      </h2>
      <div className="flex justify-center mb-10 gap-4">
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

      {userInLeaderboard.length === 0 ? (
        <p className="text-center text-gray-500">No users to display.</p>
      ) : (
        <ul className="space-y-4">
          {userInLeaderboard.map((user, index) => (
            <li
              key={user._id}
              className="flex justify-between items-center px-4 py-3 bg-gray-100 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl font-semibold text-blue-600">
                  #{(page - 1) * USER_PER_PAGE + index + 1}
                </span>
                <span className="text-lg font-medium text-gray-800">
                  {user.username}
                </span>
              </div>
              <div className="text-gray-700 font-bold">
                {user.totalPoints} pts
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;

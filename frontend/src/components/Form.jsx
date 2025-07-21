import { useState , useEffect } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../Context/UserContext';
import axios from "axios"
const Form = () => {
    const {setUser} = useUser();
    const navigate  =  useNavigate();
    const [togglePasswordEye, settogglePasswordEye] = useState(false);
    const [usernameError, setusernameError] = useState("")
    const [formData, setformData] = useState({
        username : "Kavi26",
        name : "Kavi",
        password : "Kavi@123"
    })
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(formData)
        setusernameError("")

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addUser` ,{
                ...formData
            })
            console.log(res);
            setUser(res?.data);
            navigate("/users");
        } catch (error) {
            console.log(error);
            const usernameError = error?.response?.data?.message;
            console.log(usernameError)
            setusernameError(usernameError);
            
        }

    }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-indigo-200 flex justify-center items-center p-4">
        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
            Add <span className="text-blue-500">Profile</span>
            </h2>

            <form className="flex flex-col gap-5">
            
                <div className="flex flex-col">
                    <label htmlFor="username" className="mb-2 text-sm font-medium text-gray-700">
                    Username
                    </label>
                    <input
                    autoComplete="off"
                    id="username"
                    value={formData.username}
                    onChange={(e) =>
                        setformData((prev) => ({ ...prev, username: e.target.value }))
                    }
                    className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                    placeholder="Enter username"
                    />
                    {
                        usernameError && (
                            <div className='text-red-600'>
                                <p>{usernameError}</p>
                            </div>
                        )
                    }
                </div>

            
                <div className="flex flex-col">
                    <label htmlFor="Name" className="mb-2 text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        autoComplete="off"
                        id="Name"
                        value={formData.name}
                        onChange={(e) =>
                            setformData((prev) => ({ ...prev, Name: e.target.value }))
                        }
                        className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        placeholder="Enter full name"
                    />
                </div>

           
                <div className="relative flex flex-col">
                    <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        autoComplete="off"
                        type = {!togglePasswordEye ? "password" :"text"}
                        id="password"
                        value={formData.password}
                        onChange={(e) =>
                            setformData((prev) => ({ ...prev, password: e.target.value }))
                        }
                        className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        placeholder="Enter password"
                    />
                    <span onClick={()=>{settogglePasswordEye((prev)=>!prev)}} className='absolute right-3 top-10'>{!togglePasswordEye ? <FaRegEyeSlash size={18}/> : <FaRegEye size={18}/> }</span>
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2 font-semibold transition"
                >
                    Submit
                </button>
            </form>
        </div>
    </div>

  )
}

export default Form
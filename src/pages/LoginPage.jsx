import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "staff@clinic.com" && password === "123456") {
      localStorage.setItem("logged", "true");
      navigate("/calendar");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={ handleLogin } className="bg-white p-5 space-y-3">
            <h2 className="text-2xl font-bold">Login</h2>
            { error && <p className="text-red-500 text-sm">{ error }</p> }
            <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input className="p-2 border-2 rounded" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label htmlFor="password" className="block mb-1">Password</label>
                <input className="p-2 border-2 rounded" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="text-white bg-blue-600 w-full py-2 rounded hover:bg-blue-700" >
                Login
            </button>
        </form>
    </div>
  )
}
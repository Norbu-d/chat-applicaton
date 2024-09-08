import "../../App.css"; // Adjust path if necessary
import { Link } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
    // State to store input values
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login, loading } = useLogin(); // Assuming login and loading come from useLogin hook

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        await login(username, password);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 max-w-sm rounded-lg shadow-md bg-gray-100 bg-opacity-40 backdrop-filter backdrop-blur-md">
                <h2 className="text-xl font-bold mb-4 text-center text-blue-600">Messenger</h2>
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="input input-bordered w-full max-w-xs mb-4 p-2 rounded-md border-gray-300 bg-white bg-opacity-80 placeholder-gray-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input input-bordered w-full max-w-xs mb-4 p-2 rounded-md border-gray-300 bg-white bg-opacity-80 placeholder-gray-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button
                        type="submit"
                        className="btn btn-primary w-full max-w-xs py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Login"}
                    </button>
                </form>
                <p className="mt-4 text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

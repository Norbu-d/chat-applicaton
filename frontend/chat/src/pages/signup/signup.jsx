import "../../App.css"; // Adjust path if necessary
import { Link } from "react-router-dom";
import { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    await signup(inputs); // Correctly use the signup function
  };

  const handleCheckboxChange = (gender) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      gender: prevInputs.gender === gender ? "" : gender,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 max-w-sm rounded-lg shadow-md bg-gray-100 bg-opacity-40 backdrop-filter backdrop-blur-md">
        <h2 className="text-xl font-bold mb-4 text-center text-blue-600">Sign Up</h2>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full max-w-xs mb-4 p-2 rounded-md border-gray-300 bg-white bg-opacity-80 placeholder-gray-500"
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
          />
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full max-w-xs mb-4 p-2 rounded-md border-gray-300 bg-white bg-opacity-80 placeholder-gray-500"
            value={inputs.fullName}
            onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs mb-4 p-2 rounded-md border-gray-300 bg-white bg-opacity-80 placeholder-gray-500"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full max-w-xs mb-4 p-2 rounded-md border-gray-300 bg-white bg-opacity-80 placeholder-gray-500"
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
          />
          <div className="w-full max-w-xs mb-4">
            <label htmlFor="gender" className="block mb-2 text-gray-700">Gender</label>
            <GenderCheckbox
              selectedGender={inputs.gender}
              onCheckboxChange={handleCheckboxChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full max-w-xs py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600"
            disabled={loading} // Disable button while loading
          >
            {loading ?<span className="loading loading-spinner"></span> : "Sign Up"}
          </button>
        </form>
        {/* Text below the form */}
        <p className="mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext(); // Correct usage of useAuthContext

    const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
        // Log input values for debugging
        console.log("Signup Details:", { fullName, username, password, confirmPassword, gender });

        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
            });

            if (!res.ok) {
                // Handle non-2xx responses
                const errorData = await res.json();
                console.log("Error Response Data:", errorData); // Log error data for debugging
                throw new Error(errorData.error || "Signup failed");
            }

            const data = await res.json();
            console.log("Success Response Data:", data); // Log success data
            
            // Update auth context
            setAuthUser(data);

            // Save user data to localStorage
            localStorage.setItem("chat-user", JSON.stringify(data));

            toast.success("Signup successful!");
        } catch (error) {
            toast.error(error.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    // Log the passwords for debugging
    console.log("Password Check:", { password, confirmPassword });

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}

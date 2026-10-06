import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        setLoading(true);

        try {
            // Remove old/invalid login data
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: formData.email.trim(),
                        password: formData.password
                    })
                }
            );

            const data = await response.json();

            if (data.success && data.token) {

                // Save NEW JWT token
                localStorage.setItem("token", data.token);

                // Save user information
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                alert("Login successful!");

                // Open dashboard
                navigate("/", { replace: true });

            } else {
                alert(
                    data.message ||
                    "Login failed. Please check your email and password."
                );
            }

        } catch (error) {
            console.error("Login error:", error);

            alert(
                "Cannot connect to backend. Please make sure backend is running."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-logo">
                    P
                </div>

                <span className="login-label">
                    ADMIN CMS
                </span>

                <h1>
                    Welcome Back
                </h1>

                <p>
                    Login to manage your portfolio.
                </p>

                <form onSubmit={handleLogin}>

                    <div className="login-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="login-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;
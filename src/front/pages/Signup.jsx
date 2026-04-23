import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/api/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                }
            );

            const data = await res.json();
            console.log(data); 

            if (!res.ok) {
                alert(data.msg || "Error al registrarse");
                return;
            }

            alert("Usuario creado correctamente");
            navigate("/login");

        } catch (error) {
            console.error(error);
            alert("Error de conexión");
        }
    };

    return (
        <div>
            <h2>Signup</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Register</button>
            </form>
        </div>
    );
};
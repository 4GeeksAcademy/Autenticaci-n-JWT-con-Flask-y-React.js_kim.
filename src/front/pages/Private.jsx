import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    navigate("/login");
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(() => navigate("/login"));

    }, []);

    return <h1>Private Page 🔒</h1>;
};
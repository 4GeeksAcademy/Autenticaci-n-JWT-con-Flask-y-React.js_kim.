import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Navbar = () => {
	const navigate = useNavigate();
	const [token, setToken] = useState(sessionStorage.getItem("token"));

	useEffect(() => {
		const checkToken = () => {
			setToken(sessionStorage.getItem("token"));
		};

		window.addEventListener("storage", checkToken);

		return () => window.removeEventListener("storage", checkToken);
	}, []);

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		setToken(null); 
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>

				<div className="ml-auto">

					{!token && (
						<>
							<Link to="/login">
								<button className="btn btn-outline-primary me-2">Login</button>
							</Link>
							<Link to="/signup">
								<button className="btn btn-primary">Signup</button>
							</Link>
						</>
					)}

					{token && (
						<>
							<Link to="/private">
								<button className="btn btn-success me-2">Private</button>
							</Link>
							<button className="btn btn-danger" onClick={handleLogout}>
								Logout
							</button>
						</>
					)}

				</div>
			</div>
		</nav>
	);
};
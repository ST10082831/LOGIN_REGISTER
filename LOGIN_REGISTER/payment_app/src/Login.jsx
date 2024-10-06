import React from "react";
import {useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function Login(){

    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [error, setError] = useState("");
    const navigate = useNavigate()

    // Regex patterns for validation
    //const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email pattern
   //const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Password pattern

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validate inputs
       /* if (!emailPattern.test(email)) {
            setError("Invalid email format.");
            return;
        }
        if (!passwordPattern.test(password)) {
            setError("Password must be at least 8 characters long and contain letters and numbers.");
            return;
        }*/

         // Clear the error if passwords match
         setError("");

        axios.post('https://localhost:3000/login',{email, password})
        .then(result => {
            console.log(result)
            if(result.data === "SUCCESS"){
                navigate('/customerDashboard')
            }
    })
    .catch(err => {
        console.error(err);
        setError("Incorrect email or password.");
    });
    }

    return(
         <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25" style={{  minHeight: "400px" }}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                        type="email"
                        placeholder="Enter email"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Password</strong>
                        </label>
                        <input
                        type="password"
                        placeholder="Enter password"
                        autoComplete="off"
                        name="password"
                        className="form-control rounded-0"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                <p>Already have account?</p>
                    <Link to="/register" className="btn btn-default border w-100 rounded-0 text-decoration-none">
                        Register
                    </Link>
            </div>
        </div>
    )
}

export default Login;
"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"
import Link from "next/link"
import { toast } from 'react-toastify';

export default function verifyEmaiUsers() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true)
            toast.success("Email is verified successfully")
        } catch (error) {
            setError(true)
            console.log(error.response.data)
            toast.error("Email is not verified or expired time")
        }
    }
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyEmail()
        }
    }, [token])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl">verify your Email</h1>
            <h2>{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="bg-success">Email verified</h2>
                    <Link className="bg-primary" href="/login">Login</Link>
                </div>
            )}
            {error && (
                <div>
                    <h2>error</h2>
                </div>
            )}
        </div>
    );

}
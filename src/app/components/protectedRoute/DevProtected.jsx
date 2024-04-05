'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const DevProtected = ({ children }) => {
    const router = useRouter();
    const user = useSelector((state) => state.user.userDetails);
    const userId = user._id
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!userId || !token) {
            router.push('/developer/login');
        } else if (user.designation !== 'Interior Developer' && user.designation !== 'Exterior Developer' && user.designation !== 'File Verifier') {
            router.push('/error');
            toast.error('Unauthorized Access');
        }
    }, [userId, user.designation, token]);

    return userId ? children : null;
};


export default DevProtected
'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UserProtected = ({ children }) => {
    const router = useRouter();
    const user = useSelector((state) => state.user.userDetails);
    const userId = user._id
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!userId || !token) {
            router.push('/user/login');
        } else if (userId && user.designation !== 'user') {
            router.push('/error');
            toast.error('Unauthorized Access');
        }
    }, [userId, user.designation, token]);

    return userId ? children : null;
};

export default UserProtected;

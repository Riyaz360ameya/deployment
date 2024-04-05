'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UserProtected = ({ children }) => {
    const router = useRouter();
    const user = useSelector((state) => state.user.userDetails);
    const useId = user._id
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!useId || token) {
            router.push('/user/login');
            // toast.error('Please login');
        } else if (useId && user.designation !== 'user') {
            router.push('/error');
            toast.error('Unauthorized Access');
        }
    }, [useId, user.designation]);

    return useId ? children : null;
};

export default UserProtected;

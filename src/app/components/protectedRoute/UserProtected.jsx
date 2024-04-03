'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UserProtected = ({ children }) => {
    const router = useRouter();
    const user = useSelector((state) => state.user.userDetails);
    const isAuthenticated = !!user;

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/user/login');
            toast.error('Please login');
        } else if (isAuthenticated && user.designation !== 'user') {
            router.push('/error');
            toast.error('Unauthorized Access');
        }
    }, [isAuthenticated, router, user.designation]);

    return isAuthenticated ? children : null;
};

export default UserProtected;

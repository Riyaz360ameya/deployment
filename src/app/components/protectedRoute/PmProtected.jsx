'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PmProtected = ({ children }) => {
    const router = useRouter();
    const user = useSelector((state) => state.user.userDetails);
    const userId = user._id
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!userId || !token) {
            router.push('/projectManager/login');
        } else if (userId && user.designation !== 'Project Manager') {
            router.push('/error');
            toast.error('Unauthorized Access');
        }
    }, [userId, user.designation, token]);
    
    return userId ? children : null;
};


export default PmProtected
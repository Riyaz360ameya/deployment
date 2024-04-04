'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PmProtected = () => {
    const router = useRouter();
    const user = useSelector((state) => state.user.userDetails);
    const useId = user._id

    useEffect(() => {
        if (!useId) {
            router.push('/projectManager/login');
            // toast.error('Please login');
        } else if (useId && user.designation !== 'Project Manager') {
            router.push('/error');
            toast.error('Unauthorized Access');
        }
    }, [useId, router, user.designation]);

    return useId ? children : null;
};


export default PmProtected
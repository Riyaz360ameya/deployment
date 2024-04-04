'use client'
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const LeadProtected = () => {
    const router = useRouter();
    const user = useSelector((state) => state.user.userDetails);
    const useId = user._id

    useEffect(() => {
        if (!useId) {
            router.push('/teamLead/login');
            // toast.error('Please login');
        } else if (useId && user.designation !== 'Interior' || user.designation !== 'Exterior') {
            router.push('/error');
            toast.error('Unauthorized Access');
        }
    }, [useId, router, user.designation]);

    return useId ? children : null;
};


export default LeadProtected
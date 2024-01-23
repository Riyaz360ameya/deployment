import React from 'react'
import { useRouter } from 'next/navigation';

const PaymentModal = ({ setModal }) => {
    const router = useRouter()

    const onClose = () => {
        setModal(false)
    }
    const handleClose = (e) => {
        console.log('Event:', e);
        console.log('Target ID:', e.target.id);
        if (e.target.id === "payment") {
            onClose();
        }
    }
    const setPayment = () => {
        onClose();
        router.push("/proceed");
    }
    const setPaymentNo = () => {
        onClose();
    }
    return (
        <>
            <div
                id='payment'
                onClick={handleClose}
                className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
                <div className='bg-gradient-to-r from-black to-gray-800 p-8 rounded grid gap-3 '>
                    <h1 className='text-center text-white text-xl'>Make Payment To Start Your Project</h1>
                    <div className='flex  justify-between'>
                        <button className='bg-gradient-to-r from-red-500 py-2 px-5 rounded text-white font-bold' onClick={setPaymentNo}>No</button>
                        <button className='bg-gradient-to-l from-green-500 py-2 px-5 rounded text-white font-bold' onClick={setPayment}>OK</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default PaymentModal
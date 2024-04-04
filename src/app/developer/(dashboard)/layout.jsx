import DefaultLayout from '@/app/components/Layout/DefaultLayout'
import DevProtected from '@/app/components/protectedRoute/DevProtected'
import React from 'react'

export const metadata = {
    title: 'Ameya360',
    description: 'Ameya360 Project Management Tool',
}
const layout = ({ children }) => {
    return (
        <DevProtected>
            <DefaultLayout>
                {children}
            </DefaultLayout>
        </DevProtected>
    )
}

export default layout
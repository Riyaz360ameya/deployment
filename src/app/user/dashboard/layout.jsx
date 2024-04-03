import React from 'react'
import DefaultLayout from '@/app/components/Layout/DefaultLayout'
import UserProtected from '@/app/components/protectedRoute/UserProtected'

export const metadata = {
    title: 'Ameya360',
    description: 'Ameya360 Project Management Tool',
}
const layout = ({ children }) => {
    return (
        <UserProtected>
            <DefaultLayout  >
                {children}
            </DefaultLayout>
        </UserProtected>
    )
}

export default layout
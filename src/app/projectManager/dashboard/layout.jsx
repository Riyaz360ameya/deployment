import DefaultLayout from '@/app/components/Layout/DefaultLayout'
import PmProtected from '@/app/components/protectedRoute/PmProtected'
import React from 'react'

export const metadata = {
    title: 'Ameya360',
    description: 'Ameya360 Project Management Tool',
}
const layout = ({ children }) => {
    return (
        <PmProtected>
            <DefaultLayout>
                {children}
            </DefaultLayout>
        </PmProtected>
    )
}

export default layout
import DefaultLayout from '@/app/components/Layout/DefaultLayout'
import LeadProtected from '@/app/components/protectedRoute/LeadProtected'
import React from 'react'

export const metadata = {
    title: 'Ameya360',
    description: 'Ameya360 Project Management Tool',
}
const layout = ({ children }) => {
    return (
        <LeadProtected>
            <DefaultLayout>
                {children}
            </DefaultLayout>
        </LeadProtected>
    )
}

export default layout
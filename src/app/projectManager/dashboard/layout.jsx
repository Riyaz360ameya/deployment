import DefaultLayout from '@/app/Components/Layout/DefaultLayout'
import React from 'react'

export const metadata = {
    title: 'Ameya360',
    description: 'Ameya360 Project Management Tool',
}
const layout = ({ children }) => {
    return (
        <DefaultLayout>
            {children}
        </DefaultLayout>
    )
}

export default layout
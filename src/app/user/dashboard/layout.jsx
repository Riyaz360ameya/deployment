import React from 'react'
import DefaultLayout from '../../components/Layout/DefaultLayout'

export const metadata = {
    title: 'Ameya360',
    description: 'Ameya360 Project Management Tool',
}
const layout = ({ children }) => {
    return (
        <DefaultLayout  >
            {children}
        </DefaultLayout>
    )
}

export default layout
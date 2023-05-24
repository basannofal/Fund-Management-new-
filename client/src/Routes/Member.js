import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddMember from '../Pages/Member/AddMember'
import AllMember from '../Pages/Member/AllMember'

const Member = () => {
    return (
        <>
            <Routes>
                <Route path='/allmember' element={<AllMember />} />
            </Routes>

            <Routes>
                <Route path='/addmember' element={<AddMember />} />
            </Routes>
        </>
    )
}

export default Member
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import MemberDetail from '../Pages/Dashboard/MemberDetail'
import Reports from '../Pages/Dashboard/Reports'
import ThisMonth from '../Pages/Dashboard/ThisMonth'

const Clan = () => {
  return (
    <>
      
        <Routes>
            <Route path='/thismonth' element={<ThisMonth />} />
        </Routes>

        <Routes>
            <Route path='/reports' element={<Reports />} />
        </Routes>

        <Routes>
            <Route path='/memberdetail/:mid' element={<MemberDetail />} />
        </Routes>
    </>
  )
}

export default Clan
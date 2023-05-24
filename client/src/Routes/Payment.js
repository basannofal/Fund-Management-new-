import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddPayment from '../Pages/Payment/AddPayment'

const Payment = () => {
    return (
        <>
            <Routes>
                <Route path='/addpayment' element={<AddPayment />} />
            </Routes>
        </>
    )
}

export default Payment
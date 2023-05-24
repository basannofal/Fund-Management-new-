import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../../Layout/Sidebar'

const MemberDetail = () => {

    const { mid } = useParams("");
    const [mname, setMname] = useState('');
    const [paymentDetail, setPaymentDetail] = useState([]);
    const [totalmoney, setTotalmoney] = useState(0);
    const [totalhafta, setTotalhafta] = useState(0);
    const [jdate, setJdate] = useState('00/00/0000');
    const getData = async () => {
        try {
            const res = await axios.get(`/getpermember/${mid}`)
            setMname(`${res.data[0].f_name} ${res.data[0].m_name} ${res.data[0].l_name}`)
            console.log(res.data);
            var date = new Date(res.data[0].join_date).toJSON().slice(0, 10);
            setJdate(date)
        } catch (error) {
            console.log(error);
        }
    }

    const getPayment = async () => {
        try {
            const res = await axios.get(`/getpayment/${mid}`)
            console.log(res.data);
            setPaymentDetail(res.data)
            var sum = 0;
            res.data.map((e, i) => {
                sum = sum + e.payment_amount
                setTotalmoney(sum)
                setTotalhafta(i + 1)
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData()
        getPayment();
    }, []);


    return (
        <>

            <Sidebar />

            <section class="dashboard">
                <div class="top">
                    <i class="uil uil-bars sidebar-toggle" ></i>

                    <div class="search-box">
                        <i class="uil uil-search"></i>
                        <input type="text" placeholder="Search here..." />
                    </div>

                </div>

                <div class="dash-content">
                    <div class="overview">
                        <div class="title">
                            <i class="uil uil-tachometer-fast-alt"></i>
                            <span class="text">{mname}</span>
                        </div>
                        <div class="boxes">
                            <div class="box box1">
                                <ion-icon name="card-outline" size="large"></ion-icon>
                                <span class="text">Total Money</span>
                                <span class="number">{totalmoney}</span>
                            </div>
                            <div class="box box2">
                                <ion-icon name="people-outline" size="large"></ion-icon>
                                <span class="text">Payed Hafta</span>
                                <span class="number">{totalhafta}</span>
                            </div>
                            <div class="box box3">
                                <ion-icon name="calendar-outline" size="large"></ion-icon>
                                <span class="text">Joining Date</span>
                                <span class="number">{jdate}</span>
                            </div>
                        </div>
                    </div>

                    <div class="activity">
                        <div class="title">
                            <i class="uil uil-clock-three"></i>
                            <span class="text">All History</span>
                        </div>

                        <div className="row m-0 p-0">
                            <div className="col-lg-6">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th colSpan={4} className='text-center'>Credit</th>
                                        </tr>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            paymentDetail.map((e) => {
                                                var date = new Date(e.payment_date).toJSON().slice(0, 10)
                                                return (
                                                    <tr>
                                                        <td>{date}</td>
                                                        <td>{e.payment_amount}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="col-lg-6">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th colSpan={4} className='text-center'>Debit</th>
                                        </tr>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="col">00/00/0000</td>
                                            <td scope="col">999</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
            </section>


        </>
    )
}

export default MemberDetail
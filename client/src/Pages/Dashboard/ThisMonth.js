import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../Layout/Sidebar'

const ThisMonth = () => {

    const [member, setMember] = useState([]);
    const [total_debit, setTotal_debit] = useState(null);
    const getData = async () => {
        try {
            const res = await axios.get(`/getmonthrecord`)
            setMember(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        getData()
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

          

                <div class="dash-content  pt-3 mt-5" >

                    <div class="activity ">
                        <div class="title mt-5">
                            <i class="uil uil-user"></i>
                            <span class="text">All Member Report</span>
                        </div>



                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Joining Date</th>
                                    <th scope="col">Credit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    member.map((e, idx) => {
                                        var ga = e.total_paid - total_debit
                                        let flag = 0;
                                        var date = new Date(e.join_date).toJSON().slice(0, 10);

                                        if(e.total_paid === null)
                                        return (
                                            <>
                                                <tr style={{backgroundColor:"#e02000", color:"#fff"}}>
                                                    <th scope="row">{e.roll_no}</th>
                                                        <td>{`${e.f_name} ${e.m_name} ${e.l_name}`}</td>
                                                    <td>{date}</td>
                                                    <td>{e.total_paid === null ? 0 : e.total_paid}</td>
                                                    
                                                </tr>
                                            </>
                                        )
                                        else{
                                            return (
                                            <>
                                                <tr style={{backgroundColor:"#40c000", color:"#fff"}}>
                                                    <th scope="row">{e.roll_no}</th>
                                                        <td>{`${e.f_name} ${e.m_name} ${e.l_name}`}</td>
                                                    <td>{date}</td>
                                                    <td>{e.total_paid === null ? 0 : e.total_paid}</td>
                                                    
                                                </tr>
                                            </>
                                        )
                                        }
                                    })
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </section>

        </>
    )
}

export default ThisMonth
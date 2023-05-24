import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sidebar from '../../Layout/Sidebar'

const Reports = () => {

    const [totalrs, setTotalrs] = useState(0);
    const [totalpeople, setTotalpeople] = useState(0);
    const [hafta, setHafta] = useState(0);
    const [predate, setPredate] = useState(Date);
    const [nextdate, setNextdate] = useState(Date);
    const [monthTotalMoney, setMonthTotalMoney] = useState(null);
    const [monthTotalPeople, setMonthTotalPeople] = useState(null);

    const getTodayReport = async () => {
        try {
            const res = await axios.get(`/gettodayreport`)
            setTotalrs(res.data[0].amount)
            setTotalpeople(res.data[0].people)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    const Checkreport = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.get(`/getfullreport/${predate}/${nextdate}`)
            console.log(res.data);
            setMonthTotalMoney(res.data[0].amount)
            setMonthTotalPeople(res.data[0].people)
        } catch (error) {
            console.log(error);
        }
    }



    const getHafta = async () => {
        try {
            const res = await axios.get(`/gethafta`)
            setHafta(res.data[0].hafta)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTodayReport()
        getHafta()
    }, []);
    return (
        <>
            <Sidebar />

            <section class="dashboard">
                {/* <div class="top">
                    <i class="uil uil-bars sidebar-toggle" ></i>

                    <div class="search-box">
                        <i class="uil uil-search"></i>
                        <input type="text" placeholder="Search here..." />
                    </div>

                </div> */}

                <div class="dash-content mt-0 pt-0">
                    <div class="overview">
                        <div class="title">
                            <i class="uil uil-tachometer-fast-alt"></i>
                            <span class="text">Today Report </span>
                        </div>

                        <div class="boxes">
                            <div class="box box1">
                                <ion-icon name="card-outline" size="large"></ion-icon>
                                <span class="text">Total Money</span>
                                <span class="number">{totalrs}</span>
                            </div>
                            <div class="box box2">
                                <ion-icon name="people-outline" size="large"></ion-icon>
                                <span class="text">Payed People</span>
                                <span class="number">{totalpeople}</span>
                            </div>
                            <div class="box box3">
                                <ion-icon name="calendar-outline" size="large"></ion-icon>
                                <span class="text">Total Hafta</span>
                                <span class="number">{hafta}</span>
                            </div>
                        </div>
                    </div>

                    <div class="activity">
                        <div class="title">
                            <i class="uil uil-clock-three"></i>
                            <span class="text">Search Report</span>
                        </div>

                        <form>
                            <div class="form-row container my-5">
                                <div class="col-lg-5 px-5">
                                    <div className="row">
                                        <div className="col-lg-2">

                                            <label htmlFor="">From </label>
                                        </div>
                                        <div className="col-lg-10">

                                            <input type="date" class="form-control" placeholder="dd-mm-yyyy" value={predate} onChange={(e) => { setPredate(e.target.value) }} />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-5 px-5">
                                    <div className="row">
                                        <div className="col-lg-2">

                                            <label htmlFor="">To </label>
                                        </div>
                                        <div className="col-lg-10">

                                            <input type="date" class="form-control" placeholder="Last name" value={nextdate} onChange={(e) => { setNextdate(e.target.value) }} />
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-2 px-5">

                                    <button className='btn btn-primary' onClick={Checkreport} >Search</button>
                                </div>

                            </div>
                        </form>

                        {monthTotalMoney == null && monthTotalPeople == null
                            ? ""
                            :
                            <div class="boxes">
                                <div class="box box3">
                                    <ion-icon name="card-outline" size="large"></ion-icon>
                                    <span class="text">Total Money</span>
                                    <span class="number">{monthTotalMoney}</span>
                                </div>
                                <div class="box box2">
                                    <ion-icon name="people-outline" size="large"></ion-icon>
                                    <span class="text">Payed People</span>
                                    <span class="number">{monthTotalPeople}</span>
                                </div>
                                <div class="box box1">
                                    <ion-icon name="calendar-outline" size="large"></ion-icon>
                                    <span class="text">Total Hafta</span>
                                    <span class="number">{hafta}</span>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </section>

        </>
    )
}

export default Reports
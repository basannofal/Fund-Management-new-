import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';


const AddPayment = () => {

  const [memberId, setMemberId] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [collectedBy, setCollectedBy] = useState('');
  const [memberData, setMemberData] = useState([]);

  const savedata = async (e) => {
    e.preventDefault();
    const team = {
      memberId: memberId,
      rollNo: rollNo,
      paymentAmount: paymentAmount,
      collectedBy: collectedBy,
    }
    console.log(team);
    try {
      await axios.post(`/addpayment/${memberId}/${rollNo}`, team).then((res) => {
        console.log(res);
        window.alert("Payment Successfully");
      }).catch((e) => {
        window.alert(e.response.data.err);
        console.log(e);
      })
    } catch (error) {
      console.log(error);
    }
  }


  const checkMember = async (e) => {
    let grno = e.target.value;
    setRollNo(grno)
    try {
      setMemberId(0);
      await axios.get(`/checkpermember/${grno}`).then((res) => {
        if (res.data[0] != undefined) {
          setMemberId(res.data[0].id)
        }
        setMemberData(res.data)
        console.log(res.data);
      }).catch((e) => {
        console.log(e);
      })
    } catch (error) {
      console.log(error);
    }
  }

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

        <div class="dash-content   mt-5" >
          <div class="card">
            <span class="title mt-2">Add Payment  </span>
            <form class="form">
              <div class="group ">
                <input className='mb-2' minLength={0} placeholder="" type="number" value={rollNo} onChange={checkMember} />
                <label for="name">Roll No</label>
              </div>
              <small >{memberData.length === 0 ? <p></p> : <p style={{ backgroundColor: "#49649b" }} className="p-1 text-white"> {memberData[0].f_name} {memberData[0].m_name} {memberData[0].l_name} </p>}</small>


              <div class="group mt-3">
                <input placeholder="" type="text" value={paymentAmount} onChange={(e) => { setPaymentAmount(e.target.value) }} />
                <label for="name">Payment Amount</label>
              </div>

              <div class="group">
                <input placeholder="" type="text" value={collectedBy} onChange={(e) => { setCollectedBy(e.target.value) }} />
                <label for="name">Collected By</label>
              </div>

           




              <button type="submit" onClick={savedata}>Submit</button>
            </form>
          </div>

        </div>
      </section>
    </>
  )
}

export default AddPayment
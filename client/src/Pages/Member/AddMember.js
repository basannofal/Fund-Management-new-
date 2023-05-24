import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../../Layout/Sidebar';

const AddMember = () => {

  const [rollno, setRollno] = useState('');
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [jdate, setJdate] = useState('');



  const savedata = async (e) => {
    e.preventDefault();
    const team = {
      rollno: rollno,
      fname: fname,
      mname: mname,
      lname: lname,
      jdate: jdate,
    }
    console.log(team);
    try {
      await axios.post('/addmember', team).then((res) => {
        console.log(res);
        window.alert("Member Added Successfully");
      }).catch((e) => {
        console.log(e.response.data.err);
        window.alert(e.response.data.err)
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
            <span class="title mt-2">Add New Member </span>
            <form class="form">
              <div class="group">
                <input placeholder="" type="text" value={rollno} onChange={(e) => { setRollno(e.target.value) }} />
                <label for="name">Roll No</label>
              </div>


              <div class="group">
                <input placeholder="" type="text" value={fname} onChange={(e) => { setFname(e.target.value) }} />
                <label for="name">First Name</label>
              </div>

              <div class="group">
                <input placeholder="" type="text" value={mname} onChange={(e) => { setMname(e.target.value) }} />
                <label for="name">Middle Name</label>
              </div>

              <div class="group">
                <input placeholder="" type="text" value={lname} onChange={(e) => { setLname(e.target.value) }} />
                <label for="name">Last Name</label>
              </div>

              <div class="group">
                <input placeholder="" type="date" value={jdate} onChange={(e) => { setJdate(e.target.value) }} />
                <label for="name">Joining Date</label>
              </div>

              
          
              <button type="submit" onClick={savedata}>Submit</button>
            </form>
          </div>

        </div>
      </section>
    </>
  )
}

export default AddMember
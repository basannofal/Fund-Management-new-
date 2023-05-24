import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../../Layout/Sidebar'

const AllMember = () => {
  const [member, setMember] = useState([]);
  const [total_debit, setTotal_debit] = useState(null);
  const getData = async () => {
    try {
      const res = await axios.get(`/getmember`)
      setMember(res.data)
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  const getIncome = async () => {
    try {
      const res = await axios.get(`/getincome`)
      setTotal_debit(res.data[0].total_debit)
      console.log(total_debit);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    getData()
    getIncome()
  }, []);

  const deleteMember = async (id) => {
    try {
      console.log(id);
      const res = await axios.delete(`/deletemember/${id}`)


      getData()
    } catch (error) {
      window.alert(error)
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

        <div class="dash-content  pt-3" >
          <div class="overview" >
            <div class="title" style={{ display: "flex", justifyContent: "right" }}>
              <NavLink to={`/addmember`} style={{ textDecoration: "none" }}>
                <button className='btn btn-primary d-flex ' style={{ justifyContent: "center", alignItems: "center" }}>
                  <i class="uil uil-plus mr-2" style={{ backgroundColor: "#007bff" }}></i>
                  Add New Member
                </button>
              </NavLink>
            </div>

            {/* <div class="boxes">
              <div class="box box1">
                <i class="uil uil-thumbs-up"></i>
                <span class="text">Total Likes</span>
                <span class="number">50,120</span>
              </div>
              <div class="box box2">
                <i class="uil uil-comments"></i>
                <span class="text">Comments</span>
                <span class="number">20,120</span>
              </div>
              <div class="box box3">
                <i class="uil uil-share"></i>
                <span class="text">Total Share</span>
                <span class="number">10,120</span>
              </div>
            </div> */}
          </div>

          <div class="activity ">
            <div class="title mt-0">
              <i class="uil uil-user"></i>
              <span class="text">All Member</span>
            </div>



            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Joining Date</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Debit</th>
                  <th scope="col">Gross</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                {
                  member.map((e, idx) => {
                    var ga = e.total_paid - total_debit
                    let flag = 0;
                    var d = new Date(e.join_date);
                    var yyyy = d.getUTCFullYear() // Year
                    var mm = (d.getUTCMonth() + 1);
                    var dd = d.getUTCDate();
                    return (
                      <>
                        <tr>
                          <th scope="row">{e.roll_no}</th>
                          <NavLink to={`/memberdetail/${e.id}`} style={{color:"#000"}}>
                            <td>{`${e.f_name} ${e.m_name} ${e.l_name}`}</td>
                          </NavLink>
                          <td>{`${dd}-${mm}-${yyyy}`}</td>
                          <td>{e.total_paid === null ? 0 : e.total_paid}</td>
                          <td>{total_debit === null ? 0 : total_debit}</td>
                          <td>{ga >= 0 ? <p className='text-success'>{ga}</p> : <p className='text-danger'>{ga}</p>}</td>
                          <td><button className='btn btn-danger' onClick={() => { deleteMember(e.id) }}>Delete</button></td>
                        </tr>
                      </>
                    )
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

export default AllMember
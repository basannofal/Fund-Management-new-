import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  useEffect(() => {

  }, []);
  return (
    <>

      <nav>
        <div class="logo-name">
          <div class="logo-image">
          </div>

          <span class="logo_name">Sahakar</span>
        </div>

        <div class="menu-items">
          <ul class="nav-links">
            {/* <li>
              <a href="#">
                <NavLink to={'/allclan'}>
                  <i class="uil uil-estate"></i>
                  <span class="link-name">Clan</span>
                </NavLink>
              </a>
            </li> */}
            <li><a href="#">
              <NavLink to={`/allmember`}>
                <i class="uil uil-user"></i>
                <span class="link-name">Member</span>
              </NavLink>
            </a></li>

            <li><a href="#">
            <NavLink to={`/addpayment`} >
              <i class="uil uil-wallet"></i>
              <span class="link-name">Payment</span>
            </NavLink>
            </a></li>


            <li><a href="#">
            <NavLink to={`/thismonth`} >
              <i class="uil uil-store"></i>
              <span class="link-name">This Month Report</span>
            </NavLink>
            </a></li>

            <li><a href="#">
              <NavLink to={`/allyearlyincome`}>
                <i class="uil uil-calender"></i>
                <span class="link-name">Monthly Income</span>
              </NavLink>
            </a></li>


            
            <li><a href="#">
              <NavLink to={`/reports`}>
                <i class="uil uil-chart"></i>
                <span class="link-name">Reports</span>
              </NavLink>
            </a></li>



            {/* <li><a href="#">
              <i class="uil uil-comments"></i>
              <span class="link-name">Comment</span>
            </a></li>
            <li><a href="#">
              <i class="uil uil-share"></i>
              <span class="link-name">Share</span>
            </a></li> */}

          </ul>

          {/* <ul class="logout-mode">
            <li><a href="#">
              <i class="uil uil-signout"></i>
              <span class="link-name">Logout</span>
            </a></li>

            <li class="mode">
              <a href="#">
                <i class="uil uil-moon"></i>
                <span class="link-name">Dark Mode</span>
              </a>

              <div class="mode-toggle">
                <span class="switch"></span>
              </div>
            </li>
          </ul> */}
        </div>
      </nav>


    </>
  )
}

export default Sidebar
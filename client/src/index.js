import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import App from './Routes/App';
import Clan from './Routes/Clan';
import Member from './Routes/Member';
import YearlyIncome from './Routes/YearlyIncome';
import Payment from './Routes/Payment';
import './Assets/css/App.css'
import './Assets/css/Sidebar.css'


ReactDOM.render(
<BrowserRouter>
    <App />
    <Member />
    <Clan />
    <Payment />
    <YearlyIncome />
</BrowserRouter>,
document.getElementById("root"))

const express = require('express');
const router = express.Router();
const multer = require("multer");
const conn = require("../db/conn")


router.get("/gettodayreport", async (req, res) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    console.log(currentDate);

    const q = 'select sum(payment_amount) as amount, count(id) as people from payment where payment_date = ? group by payment_date';
    conn.query(q, [currentDate], (err, data) => {
        if (err) return res.json(err)
        console.log(data);
        return res.json(data);
    })
})


router.get("/gethafta", async (req, res) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    console.log(currentDate);

    const q = 'select count(id) as hafta from monthly_income';
    conn.query(q, (err, data) => {
        if (err) return res.json(err)
        console.log(data);
        return res.json(data);
    })
})



router.get("/getfullreport/:predate/:nextdate", async (req, res) => {

    const q = 'select sum(payment_amount) as amount, count(id) as people  from payment where payment_date between ? AND ?';

    const values = [
        req.params.predate,
        req.params.nextdate,
    ]
    conn.query(q, values, (err, data) => {
        if (err) { console.log(err); return res.json(err) }
        console.log(data);
        return res.json(data);
    })
})


router.get("/getpermember/:mid", async (req, res) => {

    const q = 'select * from member where id = ?';
    const mid = req.params.mid;
    conn.query(q, mid, (err, data) => {
        if (err) { console.log(err); return res.json(err) }
        console.log(data);
        return res.json(data);
    })
})

router.get("/getpayment/:mid", async (req, res) => {

    const mid = req.params.mid;
    const q = 'select  payment_amount, payment_date, roll_no, collected_by  from payment where member_id = ?';
    conn.query(q, mid, (err, data) => {
        if (err) { console.log(err); return res.json(err) }
        console.log(data);
        return res.json(data);
    })
})


router.get("/getmonthrecord", async (req, res) => {

    const date = new Date().toJSON().slice(0, 10)
    console.log(date);

    let dt = new Date();
    let no_of_months = 1;
    dt.setMonth(dt.getMonth() + no_of_months)
    const nextmonth = new Date(dt).toJSON().slice(0,10)
    console.log(nextmonth);

    const q = 'SELECT  m.id as id, m.roll_no as roll_no, m.f_name as f_name, m.m_name as m_name, m.l_name as l_name, m.join_date as join_date, sum(p.payment_amount) AS total_paid FROM member m left JOIN payment p ON m.id = p.member_id and p.payment_date between ? and ? group by p.member_id ORDER BY m.roll_no ASC';


    // const q = 'SELECT  m.id as id, m.roll_no as roll_no, m.f_name as f_name, m.m_name as m_name, m.l_name as l_name, m.join_date as join_date, sum(p.payment_amount) AS total_paid, sum(y.amount) as total_debit FROM member m left JOIN payment p ON m.id = p.member_id left JOIN monthly_income y ON y.month >= m.join_date group by p.member_id, p.payment_amount, y.amount  ORDER BY m.roll_no ASC';

    const values = [
        date,
        nextmonth
    ]



    // const q = 'select * from member'

    conn.query(q,values, (err, data) => {
        if (err) { console.log(err); return res.json(err) }
        return res.json(data);
    })
})




module.exports = router;
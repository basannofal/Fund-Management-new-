const conn = require("../db/conn")


// const checkRollNo = async (rollno) => {


// }

const addMember = async (req, res) => {
    // var rno = req.body.rollno;
    // const q = 'SELECT * FROM `member` WHERE roll_no = ?'
    // conn.query(q, [rno], (err, data) => {
    //     if (data.length === 0) {
    //         const insert_q = "insert into member (`roll_no`, `f_name`, `m_name`, `l_name`, `join_date`, `clanid`) values (?)";

    //         const values = [
    //             req.body.rollno,
    //             req.body.fname,
    //             req.body.mname,
    //             req.body.lname,
    //             req.body.jdate,
    //             req.body.clanid,

    //         ]

    //         conn.query(insert_q, [values], (err, data) => {
    //             if (err) return res.json(err)
    //             return res.json(data)
    //         })
    //     } else {
    //         console.log("availabel");
    //         return res.status(401).json({ error: "Roll Number Already Assigned" });
    //     }
    // })

    console.log("********REached*************");
    const q = "insert into member (`f_name`, `m_name`, `l_name`, `join_date`, `roll_no`) values (?)";

    const values = [
        req.body.fname,
        req.body.mname,
        req.body.lname,
        req.body.jdate,
        req.body.rollno,
    ]

    conn.query(q, [values], (err, data) => {
        if (err) return res.status(401).json({err:"Roll Number Allready Assiged"})
        return res.json(data)
    })
}

const getMember = async (req, res) => {

    const q = 'SELECT  m.id as id, m.roll_no as roll_no, m.f_name as f_name, m.m_name as m_name, m.l_name as l_name, m.join_date as join_date, sum(p.payment_amount) AS total_paid FROM member m left JOIN payment p ON m.id = p.member_id group by p.member_id ORDER BY m.roll_no ASC';


    // const q = 'SELECT  m.id as id, m.roll_no as roll_no, m.f_name as f_name, m.m_name as m_name, m.l_name as l_name, m.join_date as join_date, sum(p.payment_amount) AS total_paid, sum(y.amount) as total_debit FROM member m left JOIN payment p ON m.id = p.member_id left JOIN monthly_income y ON y.month >= m.join_date group by p.member_id, p.payment_amount, y.amount  ORDER BY m.roll_no ASC';

 
    

    // const q = 'select * from member'

    conn.query(q, (err, data) => {
        if (err) { console.log(err); return res.json(err) }
        console.log(data);
        return res.json(data);
    })
}


const getPerMember = async (req, res) => {
    const grno = req.params.grno;
    const q = 'SELECT * FROM `member` WHERE roll_no = ?'

    conn.query(q, [grno], (err, data) => {
        if (err) return res.json(err)
        console.log(data);
        return res.json(data);
    })
}

const deleteMember = async (req, res) => {
    const id = req.params.id
    const q = "delete from member where id = ?"

    conn.query(q, [id], (err, data) => {
        if (err) return res.json({ error: 1 })
        return res.json(data)
    })
}


const addPayment = async (req, res) => {
    const memberid = req.params.memberid;
    const rollno = req.params.rollno;
    let currentDate = new Date().toJSON().slice(0, 10);
    console.log(currentDate); 

    const q = "insert into payment (`member_id`, `payment_amount`, `payment_date`, `roll_no`, `collected_by`) values (?)";

    const values = [
        req.body.memberId,
        req.body.paymentAmount,
        currentDate,
        req.body.rollNo,
        req.body.collectedBy,
    ]

    conn.query(q, [values], (err, data) => {
        if (err)
        {
            console.log(err);
            return res.status(401).send({ err: "Incorrect Roll No" });
        } 
        return res.json(data)
    })
}

module.exports = { getMember, addMember, deleteMember, getPerMember, addPayment }
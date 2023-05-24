const conn = require("../db/conn")




const addYear = async (req, res) => {
    console.log("REached");
    const q = "insert into monthly_income ( `amount`, `month`) values (?)";

    const values = [
        req.body.amount,
        req.body.yearDate,
    ]

    conn.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
}

const getYear = async (req, res) => {
    const q = 'select * from monthly_income';
    conn.query(q, (err, data) => {
        if (err) return res.json(err)
        console.log(data);
        return res.json(data);
    })
}

const getincome = async (req, res) => {
    // const q = 'SELECT a.id, b.amount FROM monthly_income a CROSS JOIN ( SELECT SUM(amount) amount FROM monthly_income ) b';

    const q = 'SELECT SUM(amount) total_debit FROM monthly_income '
    conn.query(q, (err, data) => {
        if (err) return res.json(err)
        console.log(data);
        return res.json(data);
    })
}


const deleteYear = async (req, res) => {
    const id = req.params.id
    const q = "delete from monthly_income where id = ?"

    conn.query(q, [id], (err, data) => {
        if (err) return res.json({ error: 1 })
        return res.json(data)
    })
}

module.exports = { getYear, addYear, deleteYear, getincome }
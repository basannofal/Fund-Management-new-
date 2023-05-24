const express = require('express');
const router = express.Router();
const multer = require("multer");

const Member = require("../Controllers/Member")

router.route("/getmember").get(Member.getMember);
router.route("/checkpermember/:grno").get(Member.getPerMember);
router.route("/addmember").post(Member.addMember)
router.route("/deletemember/:id").delete(Member.deleteMember)
router.route("/addpayment/:memberid/:rollno").post(Member.addPayment)

module.exports = router;
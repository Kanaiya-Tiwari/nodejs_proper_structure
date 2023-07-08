const express=require('express');
const router=express.Router()
const {customer,transfer,transactions} = require("../Controller/controller")

router.route("/customers").get(customer);
router.route("/transfer").post(transfer);
router.route("/transactions").get(transactions);

module.exports=router;


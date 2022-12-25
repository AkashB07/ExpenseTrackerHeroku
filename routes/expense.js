const express = require('express');

const expenseController = require('../controller/expense');
const userauthentication = require('../middleware/auth');


const router = express.Router();

router.post('/addexpense', userauthentication.authenticate ,expenseController.addexpense)

router.get('/getexpenses', userauthentication.authenticate ,expenseController.getExpense)

router.get('/getuser', userauthentication.authenticate, expenseController.getUserDetails)

router.delete('/deleteexpense/:expenseid', userauthentication.authenticate, expenseController.deleteexpense)

router.get('/getexpensebyid/:userId', userauthentication.authenticate, expenseController.getExpenseById)

router.get('/download', userauthentication.authenticate, expenseController.downloadexpenses)

module.exports = router;

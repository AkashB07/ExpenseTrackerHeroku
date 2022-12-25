const express = require('express');

const downloadlistController = require('../controller/downloadlist');
const userauthentication = require('../middleware/auth');
const router = express.Router();


router.get('/report',userauthentication.authenticate, downloadlistController.getDownloadlist)

router.get('/getDailyExpenses',userauthentication.authenticate, downloadlistController.getDailyExpenses)

router.get('/getWeeklyExpenses',userauthentication.authenticate, downloadlistController.getWeeklyExpenses)

router.get('/getMonthlyExpenses',userauthentication.authenticate, downloadlistController.getMonthlyExpenses)


module.exports=router
const DownloadList = require('../models/downloadlist')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const getDownloadlist = async (req,res)=>{
    try {
        // if(!req.user.ispremiumuser){
        //     return res.status(401).json({ success: false, message: 'User is not a premium User'})
        // }
        const list = await DownloadList.findAll({where: {userId: req.user.id}});
        // console.log(list);
        return res.status(200).json(list)
    } 
    catch (error) {
        return res.status(500).json({succese: false, error: err})
    }
}

const getDailyExpenses = (req, res, next)=>{
    //console.log(req.user.id)
    const today = new Date().setHours(0,0,0,0)
    const now = new Date()

    req.user.getExpenses({
        where:{
            createdAt:{
                [Op.gt]: today,
                [Op.lt]: now
            }
        }
    })
    .then(result=>{
        //console.log(result)
        res.json(result)
    })
    
}

const getWeeklyExpenses = (req, res, next)=>{
    //console.log(req.user.id)
    const todayDate = new Date().getDate()
    const lastWeek  = new Date().setDate(todayDate-7)
    const now = new Date()
    
    req.user.getExpenses({
        where:{
            createdAt:{
                [Op.gt]: lastWeek,
                [Op.lt]: now
            }
        }
    })
    .then(result=>{
        //console.log(result)
        res.json(result)
    })
    
}

const getMonthlyExpenses = (req, res, next)=>{
    //console.log(req.user.id)
    const month = new Date().getMonth()
    const lastMonth  = new Date().setMonth(month-1)
    const now = new Date()
    
    req.user.getExpenses({
        where:{
            createdAt:{
                [Op.gt]: lastMonth,
                [Op.lt]: now
            }
        }
    })
    .then(result=>{
        //console.log(result)
        res.json(result)
    })
}

module.exports = {
    getDownloadlist,
    getDailyExpenses,
    getWeeklyExpenses,
    getMonthlyExpenses
}
const url = 'http://localhost'
// const url ='http://52.66.252.234'


const token = localStorage.getItem('token');

const btn = document.getElementById("btn");
const nav = document.getElementById("nav");

const dailyList = document.querySelector('#items-daily')
const weeklyList = document.querySelector('#items-weekly')
const monthlyList = document.querySelector('#items-monthly')

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
});

window.addEventListener('DOMContentLoaded', async()=>{
    try {
       const user = await axios.get(`${url}:3000/expense/getuser`, {headers: {"Authorization" : token}})
       const premium = user.data.user.ispremiumuser;
       console.log(premium)
       if(premium){
        let premiumDiv = document.querySelector(".premium-feature")

            premiumDiv.innerHTML = `
            <li><a href="../leaderboard/leaderboard.html" >Leaderboard</a></li>
            <li><a href="../Report/report.html">Report</a></li>
            `
            document.body.classList.add('dark')
        
        const downloaddata = await axios.get(`${url}:3000/downloadlist/report`, {headers: {"Authorization" : token}})
        const data=downloaddata.data
        const downloadlist_form=document.getElementById('downloadlist_form')
        for(let i=0;i<data.length;i++){
           downloadlist_form.innerHTML=downloadlist_form.innerHTML+` <li class="expense_header" >
           Downloaded at - ${data[i].createdAt} <span>  -  </span> <a href=${data[i].url}>click here to download</a> 
        </li>`
       }  

       let dailyExpenses = await axios.get(`${url}:3000/downloadlist/getDailyExpenses`, { headers: {"Authorization" : token} })
    
       let dailyArray = dailyExpenses.data
       
       for(let i=0; i<dailyArray.length; i++){
           display(dailyArray[i].expenseamount, dailyArray[i].category, dailyArray[i].description, dailyArray[i].createdAt.slice(0,10), dailyList)
       }
   
       let weeklyExpenses = await axios.get(`${url}:3000/downloadlist/getWeeklyExpenses`, { headers: {"Authorization" : token} })
       //console.log(weeklyExpenses)
   
       let weeklyArray = weeklyExpenses.data
       
       for(let i=0; i<weeklyArray.length; i++){
        console.log(weeklyArray[i])
           display(weeklyArray[i].expenseamount, weeklyArray[i].category, weeklyArray[i].description, weeklyArray[i].createdAt.slice(0,10), weeklyList)
       }
   
       let monthlyExpenses = await axios.get(`${url}:3000/downloadlist/getMonthlyExpenses`, { headers: {"Authorization" : token} }) 
    //    console.log(monthlyExpenses)
   
       let monthlyArray = monthlyExpenses.data
       for(let i=0; i<monthlyArray.length; i++){
        display(monthlyArray[i].expenseamount, monthlyArray[i].category, monthlyArray[i].description, monthlyArray[i].createdAt.slice(0,10), monthlyList)
    }
     }
    } 
    catch (err) {
        showError(err);
    }
})

function display(expAmount, expCategory, expDescription, expDate, itemList){

    
    let li = document.createElement("li")
    li.className = "list-group-item"
    
    li.innerHTML = `${expAmount}  -  ${expCategory}  -  ${expDescription}  -   ${expDate} `
    itemList.appendChild(li)
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}


let logoutBtn = document.querySelector('#logout')

logoutBtn.addEventListener('click', (e)=>{
    localStorage.clear()
    window.location.replace('../Login/login.html')
})
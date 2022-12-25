const url = 'http://localhost'
// const url ='http://52.66.252.234'

const expenseForm=document.getElementById('expense_from')

const btn = document.getElementById("btn");
const nav = document.getElementById("nav");

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
});

const token= localStorage.getItem('token')
let count=1;

window.addEventListener('DOMContentLoaded',async()=>{
    try {
        const user = await axios.get(`${url}:3000/expense/getuser`, {headers: {"Authorization" : token}})
       const premium = user.data.user.ispremiumuser;
       if(premium){
        let premiumDiv = document.querySelector(".premium-feature")

            premiumDiv.innerHTML = `
            <li><a href="../leaderboard/leaderboard.html" >Leaderboard</a></li>
            <li><a href="../Report/report.html">Report</a></li>
            `

            let paramString = window.location.href;
            const id=paramString.split('userid=')[1]
            const expense_item_cont=document.getElementById('expense_item_cont')
            let data = await axios.get(`${url}:3000/expense/getexpensebyid/${id}`,{
                headers:{"Authorization":token}})


            const usernameCont=document.getElementById('username_show')
            usernameCont.innerHTML=`<b class=>${data.data.name}</b>`
            data=data.data.expense
            for(let i=0;i<data.length;i++){
                expense_item_cont.innerHTML=  expense_item_cont.innerHTML+` <div class="expense_item">
                <p>${count}</p>
                <p>${data[i].expenseamount}</p>
                <p>${data[i].description}</p>
                <p>${data[i].category}</p>
                <p>${data[i].createdAt}</p>

                </div>`
                count++;
            } 
       }
    } 
    catch (err) {
        showError('You are not a premium user '+err);
    }
   
})


function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}


let logoutBtn = document.querySelector('#logout')

logoutBtn.addEventListener('click', (e)=>{
    localStorage.clear()
    window.location.replace('../Login/login.html')
})




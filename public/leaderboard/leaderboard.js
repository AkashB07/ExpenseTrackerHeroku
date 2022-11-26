// const url = 'http://localhost'
const url ='http://52.66.252.234'

const token = localStorage.getItem('token');

const btn = document.getElementById("btn");
const nav = document.getElementById("nav");

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
});

window.addEventListener('DOMContentLoaded',async ()=>{
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

            user_cont=  document.getElementById('use_cont')
            const alluser = await axios.get(`${url}:3000/user/getallusers`,{ headers: {"Authorization" : token}})
            let paramString = window.location.href;
            console.log(paramString.split('/'))
            console.log(alluser.data)
            var data=alluser.data
            data.sort((a, b) => parseFloat(b.totalexpense) - parseFloat(a.totalexpense));
            for(let i=0;i<data.length;i++){
                user_cont.innerHTML=user_cont.innerHTML+`<div class="users" id="users">
                <p>${i+1}</p>
                <p><a href='./user.html?userid=${data[i].id}'>${data[i].name}</a></p>
                <p>${data[i].totalexpense}</p>
                </div>`

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
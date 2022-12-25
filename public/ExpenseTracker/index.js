const url = 'http://localhost'
// const url ='http://52.66.252.234'

const token = localStorage.getItem('token');


async function addNewExpense(e){
    try {
        e.preventDefault();

        const expenseDetails = {
            expenseamount: e.target.expenseamount.value,
            description: e.target.description.value,
            category: e.target.category.value,
            
        }
        const response = await axios.post(`${url}:3000/expense/addexpense`, expenseDetails, {headers: {"Authorization" : token}});
        e.target.expenseamount.value = '';
        e.target.description.value = '';
        e.target.category.value = '';
        display(1);

    } catch (err) {
        showError(err);
    }
}
const btn = document.getElementById("btn");
const nav = document.getElementById("nav");

btn.addEventListener("click", () => {
    nav.classList.toggle("active");
    btn.classList.toggle("active");
});

window.addEventListener('DOMContentLoaded', async()=>{
    try {
        display(1)

       const user = await axios.get(`${url}:3000/expense/getuser`, {headers: {"Authorization" : token}})
       const premium = user.data.user.ispremiumuser;
     //console.log(premium)
       if(premium){
        let premiumDiv = document.querySelector(".premium-feature")

            premiumDiv.innerHTML = `
            <li><a href="../leaderboard/leaderboard.html" >Leaderboard</a></li>
            <li><a href="../Report/report.html">Report</a></li>
            <li><button onclick="download()" id="downloadexpense">Download File</button></li>
            `
            document.body.classList.add('dark')

       }   
    } 
    catch (err) {
        showError(err);
    }
})

async function display(page)
{
    try {
        document.getElementById('listOfExpenses').innerHTML='';
        document.getElementById('pagination').innerHTML='';
        
        const respone = await axios.get(`${url}:3000/expense/getexpenses/?page=${page}`, {headers: {"Authorization" : token}})
        console.log(location.href.split("page="))
        respone.data.expenses.forEach(expense => {
        addNewExpensetoUI(expense);
       });
       paginationHtmlCreation(respone)
        
    } catch (error) {
       showError(err);
    }
}

function paginationHtmlCreation(response){
    let currentPage = response.data.currentPage;
    let hasNextPage = response.data.hasNextPage;
    let nextPage = response.data.nextPage;
    let hasPreviousPage = response.data.hasPreviousPage;
    let previousPage = response.data.previousPage;
    let lastPage = response.data.lastPage;
    const pagination =document.getElementById('pagination');
    pagination.innerHTML='';

    if(hasPreviousPage){
        const btn2 = document.createElement('button');
        btn2.innerHTML =previousPage;
        btn2.addEventListener('click', () => display(previousPage));
        pagination.appendChild(btn2);
    }

    const btn1 = document.createElement('button');
    btn1.innerHTML =`<h3>${currentPage}</h3>`;
    btn1.addEventListener('click', () => display(currentPage));
    pagination.appendChild(btn1);

    if(hasNextPage){
        const btn3 = document.createElement('button');
        btn3.innerHTML =nextPage;
        btn3.addEventListener('click', () => display(nextPage));
        pagination.appendChild(btn3);
    }

    if(lastPage != currentPage && lastPage != nextPage){
        const btn4 = document.createElement('button');
        btn4.innerHTML =lastPage;
        btn4.addEventListener('click', () => display(lastPage));
        pagination.appendChild(btn4);
    }

}


function addNewExpensetoUI(expense){
    const parentElement = document.getElementById('listOfExpenses');
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
    <li id=${expenseElemId}>
    ${expense.expenseamount} - ${expense.description} - ${expense.category}  
    <button onclick='deleteExpense(event, ${expense.id})'>Delete Expense</button>
    </li>`;

}
async function deleteExpense(e, expenseid){
    try {
        await axios.delete(`${url}:3000/expense/deleteexpense/${expenseid}`, {headers: {"Authorization" : token}});
        removeExpenseFromUI(expenseid);
    } 
    catch (err) {
        showError(err);
    }  
}

function removeExpenseFromUI(expenseid){
    const expenseElemId = `expense-${expenseid}`;
    document.getElementById(expenseElemId).remove();
    display(1);
}

function showError(err){
    document.body.innerHTML += `<div style="color:red;"> ${err}</div>`
}

async function download()
{ 
    try {
        const response = await  axios.get(`${url}:3000/expense/download`, { headers: {"Authorization" : token} });
        if(response.status === 201){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileURL;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }   
    } 
    catch (error) {
        showError(error)
    }
}

document.getElementById('rzp-button1').onclick = async function (e) {
    const token = localStorage.getItem('token')
    const response  = await axios.get(`${url}:3000/purchase/premiummembership`, { headers: {"Authorization" : token} });
    console.log(response);
    var options =
    {
     "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
     "order_id": response.data.order.id,// For one time payment
     "prefill": {
               "name": "Test",
               "email": "test@gmail.com",
               "contact": "9654782014"
             },
     // This handler function will handle the success payment
     "handler": async function (response) {
        console.log(response);
        const res = await axios.post(`${url}:3000//purchase/updatetransactionstatus`,{
             order_id: options.order_id,
             payment_id: response.razorpay_payment_id,
         }, { headers: {"Authorization" : token} })
        
        console.log(res)
         alert('You are a Premium User Now')
         
     },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on('payment.failed', function (response){
    console.log(response)
    alert('Something went wrong')
 });
}

let logoutBtn = document.querySelector('#logout')

logoutBtn.addEventListener('click', (e)=>{
    localStorage.clear()
    window.location.replace('../Login/login.html')
})

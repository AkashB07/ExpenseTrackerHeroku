async function signup(e)
{
    try 
    {
        e.preventDefault();
        const signupDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        console.log(signupDetails.email);

        const respone = await axios.post('http://localhost:3000/user/signup', signupDetails)
        if(respone.status == 201)
        {
            window.location.href ="../Login/login.html";
        }
        else
        {
            throw new Error('Failed to login')
        }
    } 
    catch (error) 
    {
        document.body.innerHTML += `<div style="color:red;">${error}<div>`;
    }
}
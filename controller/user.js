const User = require('../models/users');

function isstringinvalid(string){
    if(string == undefined || string.length === 0){
        return true;
    }
    else{
        return false;
    }
}

exports.signup = async (req, res) => {
    try 
    {
        const{name, email, password} = req.body;
        console.log(name)

        if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(password))
        {
            return res.status(400).json({err: "Bad parameters. Something is missing"});
        }

        await User.create({name, email, password});
        res.status(201).json({message: 'Successfully created new user'});
    } 
    catch (error) {
        res.status(500).json(error);
    }
}

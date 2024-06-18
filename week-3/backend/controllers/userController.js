const User = require('../models/user');

const userController = {
    getAllUser: async (req,res) =>{
        try{
            const user = await User.find();
            return res.status(200).json(user)
        }catch(err){
            return res.status(500).json(err)
        }
    }
}

module.exports = userController

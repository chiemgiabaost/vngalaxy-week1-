

// const Joi = require('joi');
// import {StatusCodes} from 'http-status-codes';



//     createNew  = async (req, res, next) =>{

//         const correctCondition = Joi.object({
//             title: Joi.string().required().min(3).max(50).trim().strict(),
//             description: Joi.string().required().min(3).max(50).trim().strict(),
//         });
//         try{
//             console.log(req.body)
//             await correctCondition.validateAsync(req.body);
//             // next();
//             return res.status(StatusCodes.OK).json({message: 'Create new board'});  
//         }catch(err){
//             return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
//                 errors: new Error(err).message
//             })
//         }
//     }

//     export default boardValidation = {
//         createNew
//     }
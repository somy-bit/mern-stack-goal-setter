const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

const getGoals =asyncHandler(async (req,res)=>{

    const goals = await Goal.find({user:req.user.id});
    res.status(200).json(goals);
    
})

//get goal
const setGoal =asyncHandler( async (req,res)=>{

    if(!req.body.text){
        res.status(400);
        throw new Error('Please add a text field');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    });
    res.status(200).json( goal );
})

//delete goal
const deleteGoal =asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id);
    const user = await User.findById(req.user.id);
    
    if(!goal){
        res.status(400);
        throw new Error('Goal not found');
    }
      if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorized');
    }  

    await goal.deleteOne();
    res.status(200).json({ id: req.params.id });
})


const updateGoal =asyncHandler(async (req,res)=>{

    const user = await User.findById(req.user.id)
    const goal = await Goal.findById(req.params.id);

    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    if(goal.user.toString() !== user.id){
        res.status(401);
        throw new Error('User not authorized');
    }   

    if(!goal){
        res.status(400)
        throw new Error('Goal not found');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators: true,});
    return res.status(200).json(updatedGoal);
})

module.exports ={
    getGoals,
    setGoal,
    deleteGoal,
    updateGoal
}
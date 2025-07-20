const asyncHandler = require('express-async-handler');


const getGoals =asyncHandler(async (req,res)=>{
    res.status(200).json({ goals: ['Goal 1', 'Goal 2', 'Goal 3'] });
})


const setGoal =asyncHandler( async (req,res)=>{
    res.status(200).json({ goals: ['Goal 1', 'Goal 2', 'Goal 3'] });
})


const deleteGoal =asyncHandler(async (req,res)=>{
    res.status(200).json({ goals: `delete goal ${req.params.id}` });
})


const updateGoal =asyncHandler(async (req,res)=>{
    res.status(200).json({goals: `update goal ${req.params.id}` });
})

module.exports ={
    getGoals,
    setGoal,
    deleteGoal,
    updateGoal
}
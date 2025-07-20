const express = require('express');
const app = express();
const {getGoals,setGoal,updateGoal,deleteGoal} = require('../controllers/goalcontroller');
const { set } = require('mongoose');

const router = express.Router();

router.route('/').get(getGoals).post(setGoal);
router.route('/:id').delete(deleteGoal).put(updateGoal);


module.exports = router;
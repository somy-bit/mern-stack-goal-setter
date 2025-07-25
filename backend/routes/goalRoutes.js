const express = require('express');
const app = express();
const {getGoals,setGoal,updateGoal,deleteGoal} = require('../controllers/goalcontroller');

const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect,getGoals).post(protect,setGoal);
router.route('/:id').delete(protect,deleteGoal).put(protect,updateGoal);


module.exports = router;
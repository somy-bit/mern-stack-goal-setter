import { useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import Dialog from './Dialog';
import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';

function GoalItem({ goal }) {

    const [showDialog, setShowDialog] = useState(false);
    const dispatch = useDispatch()

    const handleDelete = () => {
       
        dispatch(deleteGoal(goal._id))
    }
    return (
        <div className=' w-full p-5 flex flex-col bg-gray-200 rounded-md items-center'>
            <div className='w-full flex flex-row justify-between items-center'>
                <div className='flex flex-col -space-y-0.5 justify-start text-xs text-gray-700'>
                    <p>{spiltDate(goal.updatedAt).year}</p>
                    <p>{spiltDate(goal.updatedAt).hour.substring(0, 5)}</p>
                </div>
                <button onClick={()=>setShowDialog(true)}>
                    <FaTrash className='h-4 w-4 text-red-500 ' />
                </button>
            </div>
            <p>
                {goal.text}
              
            </p>

            <Dialog
                isOpen={showDialog}
                onCancel={() => setShowDialog(false)}
                onConfirm={handleDelete}
                itemName="goal"
            />
        </div>
       


        
    )
}

export default GoalItem

function spiltDate(date) {
    const dateStr = date.toString()

    let year = dateStr.split('T')[0]
    let time = dateStr.split('T')[1]
    let hour = time.split('.')[0]

    return {
        year, hour
    }
}
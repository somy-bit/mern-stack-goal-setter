import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {createGoal} from '../features/goals/goalSlice'
import { toast } from 'react-toastify'
function GoalForm() {

    const [text,setText] = useState("")

    const dispatch = useDispatch()

    const onSubmit = (e)=>{
        e.preventDefault()
       
        dispatch(createGoal({text}))
        toast.done('creat')
        setText("")

    }

  return (
    <section className='w-full p-2 max-w-3xl'>

        <form className='flex flex-col w-full px-5  items-center space-y-6'>
            <label 
            className='text-lg font-semibold text-[#283747]'
            htmlFor='text'>Goal</label>
            <input 
            name='text'
            id="text"
            type="text"
            onChange={(e)=>setText(e.target.value)}
            className='border-b shadow-sm focus:shadow-md bg-gray-100 rounded-md p-2 overflow-y-scroll focus:outline-none w-full max-w-3xl mx-auto'
            value={text}
            placeholder='Start making great goals ..'
            />
            <button
            className='w-full bg-gray-900 text-white p-2 rounded-md'
            onClick={onSubmit}
            >
                Add Goal
            </button>
        </form>
    </section>
  )
}

export default GoalForm
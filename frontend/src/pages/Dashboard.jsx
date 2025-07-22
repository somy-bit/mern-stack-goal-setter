import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm';
import { getGoals, reset } from '../features/goals/goalSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import GoalItem from '../components/GoalItem';


function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth);
  const { goals, isError,isSuccess, isLoading, message } = useSelector((state) => state.goals);



  useEffect(() => {

    if (isError) {
      toast.error(message)
    }

    if(isSuccess){
      toast.done(message)
    }
    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => { dispatch(reset()) }
  }, [user, isError, message, dispatch, navigate])

  if(isLoading) return (<Spinner />)

  return (
    <>
      <section className='w-full py-10 flex flex-col space-y-6 items-center justify-center '>
        <h1 className='text-xl font-semibold text-gray-900'>Welcome  <span className='text-[#283747] ml-2 text-2xl '>{user && user.name}</span></h1>
        <p className='text-lg font-bold text-gray-500'>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className='w-full grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 px-5 max-w-3xl'>
        {goals?.map((goal, index) => (

          <GoalItem
            goal={goal}
            key={goal._id}
          />

        ))}
      </section>

    </>
  )
}

export default Dashboard
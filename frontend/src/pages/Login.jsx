
import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch,useSelector } from 'react-redux';
import {login,reset} from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import {toast} from 'react-toastify'


function Login() {

    const [formData, setFormData] = useState({
      
        email: '',
        password: '',
       
    });

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isError ,isSuccess ,isLoading , message ,user} = useSelector((state)=>state.auth)


    useEffect(()=>{

        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){
            navigate('/')
        }

        dispatch(reset())

    },[dispatch,isError,isSuccess,message,navigate,user,isLoading])

     const {  email, password } = formData;

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,password
        }
        dispatch(login(userData))
    }


    if(isLoading) return (<Spinner />)

   
    return (
        <>
            <section className='w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg md:shadow-md'>
                <div className='flex flex-col items-center space-y-4'>
                    <h1 className='text-2xl text-gray-900 justify-center font-bold flex items-center space-x-2'>
                        <FaSignInAlt />
                        <p>Login</p>
                    </h1>
                    <p className='text-gray-500'>Please enter your credentials</p>
                </div>

                <div className='mt-6 '>
                    <form action="" className='flex flex-col space-y-8'>
                   
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Email"
                            className='w-full p-2 border-b border-gray-300 rounded mt-4 focus:outline-none focus:border-blue-500 focus:shadow-sm'
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Password"
                            className='w-full p-2 border-b border-gray-300 rounded mt-4 focus:outline-none focus:border-blue-500 focus:shadow-sm'
                        />
                     
                        <button
                            disabled={ !email || !password }
                            type="submit"
                            className='w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600 bg-gray-900
                             text-white p-2 rounded hover:shadow-lg transition duration-200'
                            onClick={onSubmit}
                        >
                            Log In
                        </button>
                    </form>
                </div>


            </section>
        </>
    )
}

export default Login
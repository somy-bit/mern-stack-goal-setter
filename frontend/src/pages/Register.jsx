
import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner';


function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });



    const onSubmit = (e) => {
        e.preventDefault();
       
        if (password !== confirmPassword) {
            toast.error("passwords dont match")
        } else {

            const userData = {
                name, email, password
            }

            dispatch(register(userData))
        }


    }

    const { name, email, password, confirmPassword } = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


    useEffect(() => { 

        if(isError){
            toast.error(message)
        }

        if(isSuccess || user){

            navigate('/')
        }

        dispatch(reset())
    },
        [isError, isSuccess, user, message, dispatch, isLoading, navigate])

        if(isLoading) return (
            <Spinner />
        )

    return (
        <>
            <section className='w-full max-w-md mx-auto mt-10 p-6 bg-white rounded-lg md:shadow-md'>
                <div className='flex flex-col items-center space-y-4'>
                    <h1 className='text-2xl text-gray-900 justify-center font-bold flex items-center space-x-2'>
                        <FaUser />
                        <p>Register</p>
                    </h1>
                    <p className='text-gray-500'>Please create an account</p>
                </div>

                <div className='mt-6 '>
                    <form action="" className='flex flex-col space-y-8'>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Name"
                            className='w-full p-2 border-b border-gray-300 rounded mt-4 focus:outline-none focus:border-blue-500 focus:shadow-sm'
                        />
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
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            placeholder="Confirm Password"
                            className='w-full p-2 border-b border-gray-300 rounded mt-4 focus:outline-none focus:border-blue-500 focus:shadow-sm'
                        />
                        <button
                            disabled={!name || !email || !password || password !== confirmPassword}
                            type="submit"
                            className='w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-600 bg-gray-900
                             text-white p-2 rounded hover:shadow-lg transition duration-200'
                            onClick={onSubmit}
                        >
                            Register
                        </button>
                    </form>
                </div>


            </section>
        </>
    )
}

export default Register
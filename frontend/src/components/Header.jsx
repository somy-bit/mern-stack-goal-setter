import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Header() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const [open, setOpen] = useState(false);

    const onLogout = () => {

        dispatch(logout())
        dispatch(reset())
        navigate('/')
        setOpen(false)
    }

    return (
        <header className='w-full'>
            <div className=' flex justify-between items-center p-4 bg-gray-800 text-white'>
                <Link to='/'>Goal Setter</Link>
                {user ? (
                    <button
                        onClick={() => setOpen(!open)}
                        className='hover:text-gray-300 '>

                        <p className='text-sm ' >{user.name}</p>
                    </button>
                ) :
                    (
                        <ul className="flex space-x-4 ">
                            <li className='hover:text-gray-300 '>
                                <Link to='/login' className='flex items-center space-x-1'>
                                    <FaSignInAlt />
                                    <p className='text-xs font-extralight' >Login</p>
                                </Link>
                            </li>
                            <li className='hover:text-gray-300 '>
                                <Link to='/register' className='flex items-center space-x-1'>
                                    <FaUser />
                                    <p className='text-xs font-extralight'>Register</p>
                                </Link>
                            </li>
                        </ul>
                    )
                }


            </div>
            {open && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
                    <div className="py-1">

                        <button
                            onClick={onLogout}
                            href="#logout"
                            className=" px-4 py-2 text-sm flex items-center space-x-1 text-red-600 hover:bg-red-50"
                        >
                            <FaSignOutAlt />Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header
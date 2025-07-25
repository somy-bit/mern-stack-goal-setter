import axios from 'axios'

const API_URL = process.env.BACKEND_URL+'api/users/'

//regiter
export const register = async (userData) => {

    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//login
export const login = async(userData)=>{

    const response = await axios.post(API_URL+"login",userData)

    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}


//logout
export const logout = async()=>{

    localStorage.removeItem('user');
}


const authService ={
    register,
    logout,
    login
}

export default authService
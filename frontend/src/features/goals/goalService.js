import axios from 'axios'

const API_URL = process.env.BACKEND_URL+'api/goals/'

//create goal 

export const createGoal = async (goalData ,token)=>{
    const config ={
        headers:{
            Authorization :`Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL,goalData,config);

    return response.data
}

//delete goal


export const deleteGoal = async (id ,token)=>{
    const config ={
        headers:{
            Authorization :`Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL+id,config);

    return response.data
}


//get all goals for user


export const getGoals = async (token)=>{
    const config ={
        headers:{
           Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.get(API_URL,config);

    return response.data
}


const goalService = {
    createGoal,
    getGoals,
    deleteGoal
}

export default goalService
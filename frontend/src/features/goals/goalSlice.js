import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    message: '',
    isLoading: false
}

//creat goal
export const createGoal = createAsyncThunk('goals/create', async (gData, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token
        console.error('user..........',thunkApi.getState().auth.user)
        return await goalService.createGoal(gData, token)
        
    } catch (error) {
        const message = (error.response || error.response.data
            || error.response.data.message)
            || error.message || error.toString()

        return thunkApi.rejectWithValue(message)
    }
})

//delete goal by id 
export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token
        console.error('user..........',thunkApi.getState().auth.user)
        return await goalService.deleteGoal(id, token)
        
    } catch (error) {
        const message = (error.response || error.response.data
            || error.response.data.message)
            || error.message || error.toString() || "failed to delete"

        return thunkApi.rejectWithValue(message)
    }
})

//get goals from user

export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkApi) => {

    try {
        const token = thunkApi.getState().auth.user.token
        return await goalService.getGoals(token)

    } catch (error) {
        const message = (error.response || error.response.data
            || error.response.data.message)
            || error.message || error.toString() || "failed to create goal"

        return thunkApi.rejectWithValue(message)
    }
})

/// 

export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => initialState

    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.goals.push(action.payload);
                state.isSuccess = true
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.goals = action.payload;
                state.isSuccess = true
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
               .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.goals = state.goals.filter(goal => goal._id !== action.payload.id);
                state.isSuccess = true
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
})

export const { reset } = goalSlice.actions
export default goalSlice.reducer
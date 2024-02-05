import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false,
    error : null,
    currentuser: null
}

const UserSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading = true
            state.error = null
        },
        signInSuccess : (state,action)=>{
            state.loading = false
            state.error = null
            state.currentuser = action.payload
        },
        signInFailure : (state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        updateStart :(state)=>{
            state.loading = true
            state.error = null
        },
        updateSuccess :(state,action)=>{
            state.loading = false,
            state.error = false
            state.currentuser = action.payload
        },
        updateFailure :(state,action)=>{
            state.loading = false,
            state.error = action.payload
        },
        deleteStart :(state)=>{
            state.loading = true
            state.error = null
        },
        deleteSuccess :(state,action)=>{
            state.loading = false,
            state.error = false
            state.currentuser = null
        },
        deleteFailure :(state,action)=>{
            state.loading = false,
            state.error = action.payload
        }
    }
})

export  const  {signInStart,signInSuccess,signInFailure,updateFailure,updateStart,updateSuccess
                    ,deleteStart,deleteSuccess,deleteFailure} = UserSlice.actions

export default UserSlice.reducer;
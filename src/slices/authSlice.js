import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // the localstroage.getItem("token") is used to get token if it is logged in
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    loading: false,
    signupData: null
    
}

const authSlice  = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        setLoading(state, value){
            state.loading = value.payload
        },
        setSignupData(state, value){
            state.signupData = value.payload
        },
        setToken(state, value){
            state.token = value.payload
        }
    }

})

export const {setToken, setSignupData, setLoading} = authSlice.actions
 
export default authSlice.reducer
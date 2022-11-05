import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { navigate } from "../navigationRef";

const authReducer = (state, action) =>{
    switch(action.type){
        case 'add_error':
            return {...state, errorMessage: action.payload}
        case 'signin':
            return {token: action.payload, errorMessage: ''}
        case 'clear_error_message':
            return {...state, errorMessage: ''}
        case 'resolve_initial_auth':
            return {...state, resolvedInitialAuth: true}
        case 'signout':
            return {...state, token: null, errorMessaga:''}
        default:
            return state
    }
}

const clearErrorMessage = (dispatch) => ()=>{
    dispatch({type: 'clear_error_message' })
}

const localSignin = (dispatch) => async()=>{
    const token  = await AsyncStorage.getItem('token')
    if(token)
    {
        dispatch({type: 'signin', payload: token})
    }
    dispatch({type: 'resolve_initial_auth'})
}

const signup = (dispatch) => async ({email,password})=>{
    try {
        console.log("dispathed ", email,password)
        const response = await trackerApi.post('/signup',{email,password})
        
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({type: 'signin', payload: response.data.token})
        
        //navigate()
    } catch (error) {
        dispatch({type: 'add_error', payload: 'Something went wrong with sign up' })
    }
}

const signin = (dispatch) => async ({email,password})=>{
    try {
        console.log("dispathed ", email,password)
        const response = await trackerApi.post('/signin',{email,password})

        console.log(response,"response")
        
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({type: 'signin', payload: response.data.token})
        
        //navigate()
    } catch (error) {
        console.log(error)
        dispatch({type: 'add_error', payload: 'Something went wrong with sign in' })
    }
}

const signout = (dispatch) => async ()=>{
    console.log("sign out called")
    await AsyncStorage.removeItem('token')
    dispatch({type:'signout'})
}

export const {Provider, Context} = createDataContext(
    authReducer,
    {signin,signup, signout,clearErrorMessage, localSignin},
    {token: null, errorMessaga:'',resolvedInitialAuth:false}
)
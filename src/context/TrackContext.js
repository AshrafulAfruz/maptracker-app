import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { navigate } from "../navigationRef";

const trackReducer = (state, action) =>{
    switch(action.type){
        case 'start_recording':
            return {...state, recording: true}
        case 'fetch_tracks':
            return action.payload
        default:
            return state
    }
}
const fetchTracks = (dispatch) => async()=>{
    try{
        console.log("start fetching")
        const response = await trackerApi.get('/tracks')
        console.log(response.status)
        dispatch({type:'fetch_tracks', payload: response.data})
    }
    catch(err)
    {
        console.log(err)
    }
    
}
const createTrack = (dispatch) => async (name, locations)=>{
    await trackerApi.post('/tracks',{name,locations})
}

export const {Provider, Context} = createDataContext(
    trackReducer,
    {fetchTracks,createTrack},
    []
)
import { useState, useEffect } from "react";
import {requestForegroundPermissionsAsync,watchPositionAsync, Accuracy} from 'expo-location'

export default (shouldTrack,callback)=>{

    const [err, setErr] = useState(null);
    
    useEffect(() => {

        let subsriber;
        const startWatching = async () => {
            try{
                let { status } = await requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErr('Permission to access location was denied');
                    return;
                } else {
                    setErr(null)
                    subsriber =  await watchPositionAsync({
                        accuracy: Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 10
                    },callback)
                }
            }catch (err){
                setErr('Permission to access location was denied');
            }
        }

        console.log(shouldTrack, "should track")
        if(shouldTrack){
            startWatching()
        } else {
            if(subsriber){
                subsriber.remove()
                subsriber=null
            }
        }
        return ()=>{
            if(subsriber){
                subsriber.remove()
                subsriber=null
            }
        }
    }, [shouldTrack,callback]);

    return [err]
}


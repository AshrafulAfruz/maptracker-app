import * as Location from 'expo-location'

const tenMetreWithDegress = 0.0001;

const getLocation = increment =>{
    return{
        timestamp: 10000000,
        coords:{
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude:  90.4282537 + increment*tenMetreWithDegress,
            latitude: 23.786389737 +increment *tenMetreWithDegress
        },
        mocked: true
    }
}

let counter = 0;

setInterval(()=>{
    Location.EventEmitter.emit('Expo.locationChanged',{
        watchId: Location._getCurrentWatchId(),
        location: getLocation(counter)
    })
    counter++
},1000)
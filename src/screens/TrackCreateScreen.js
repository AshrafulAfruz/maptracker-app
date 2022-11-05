//import '../_mockLocation'
import React, { useCallback, useContext } from 'react'
import {StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Map from '../components/Map'
import { Text } from '@rneui/base'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import { useIsFocused } from '@react-navigation/native'
import TrackForm from '../components/TrackForm'

const TrackCreateScreen = ()=>{
    const isFocused = useIsFocused();
    console.log(isFocused, "us focused")
    const {state: {recording}, addLocation} = useContext(LocationContext)
    const callback = useCallback(
        (location)=>{
            addLocation(location,recording)
        },
        [recording]
    )
    const [err] = useLocation(isFocused|| recording,callback)

    return (
        <SafeAreaView>
            <Text h2>Create a Track</Text>
            <Map/>
            {err? <Text>Please enable location services</Text>: null}
            <TrackForm/>
        </SafeAreaView> 
    )
}

const styles = StyleSheet.create({

})
export default TrackCreateScreen

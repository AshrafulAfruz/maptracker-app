import React from 'react'
import { useContext } from 'react'
import {View,StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Context as TrackContext} from '../context/TrackContext'
import MapView, { Polyline } from 'react-native-maps'
import Spacer from '../components/Spacer'
import { Text } from '@rneui/base'
const TrackDetailScreen = ({route})=>{
    const {state} = useContext(TrackContext)
    const _id = route?.params?._id
    const track = state.find(trk=> trk._id===_id)
    return (
        <>
            <Spacer>
                <Text h3>{track.name}</Text>
            </Spacer>
            
            <MapView
                style={styles.map} 
                initialRegion={{
                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                    ...track.locations[0].coords
                }}
            >
                <Polyline coordinates={track.locations.map(loc=>loc.coords)} />
            </MapView>
        </>
    )
}

const styles = StyleSheet.create({
    map:{
        height:300
    }
})
export default TrackDetailScreen

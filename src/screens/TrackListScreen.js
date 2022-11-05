import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useContext } from 'react'
import {View,StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Context as TrackContext } from '../context/TrackContext'
import { ListItem,Text } from '@rneui/base'
const TrackListScreen = ({navigation})=>{
    const {fetchTracks, state} =  useContext(TrackContext)

    useFocusEffect(
        useCallback(()=>{
           console.log('focus callled')
            fetchTracks()
            return () => {};
        },[])
    )
    
    return (
        <SafeAreaView>
            <Text h2>Track Lists</Text>
            <FlatList
                data={state}
                keyExtractor={item=>item._id}
                renderItem={({item,index})=>{
                    return (
                        <TouchableOpacity 
                            onPress={()=>navigation.navigate('TrackDetail',{_id: item._id})}
                            >
                            <ListItem key={index} bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        </TouchableOpacity>
                    )
                }}
            />
        </SafeAreaView> 
    )
}

const styles = StyleSheet.create({

})
export default TrackListScreen

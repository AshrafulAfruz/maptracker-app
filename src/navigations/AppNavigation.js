import React , { useContext,useEffect } from "react"; 
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AccountScreen from "../screens/AccountScreen";
import SigninScreen from "../screens/SigninScreen";
import TrackCreateScreen from "../screens/TrackCreateScreen";
import TrackListScreen from "../screens/TrackListScreen";
import TrackDetailScreen from "../screens/TrackDetailScreen";
import SignupScreen from "../screens/SignupScreen";
import { navigationRef } from "../navigationRef";
import { Context as AuthContext} from "../context/AuthContext";

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator()
const BottomTab = createBottomTabNavigator()
const InnerStack = createNativeStackNavigator()

const MainNavigator = ()=>{
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='Signin' component={SigninScreen} />
        </Stack.Navigator>
    )
}

const TracklistNavigator = ()=> {
    return (
        <InnerStack.Navigator screenOptions={{ headerShown: false }}>
            <InnerStack.Screen name="TrackList" component={TrackListScreen} />
            <InnerStack.Screen name="TrackDetail" component={TrackDetailScreen} options={{headerShown: true}} />
        </InnerStack.Navigator>
    )
}

const TabNavigator = ()=> {
    return (
        <BottomTab.Navigator screenOptions={{ headerShown: false }}>
            <BottomTab.Screen 
                name="trackListFlow" 
                component={TracklistNavigator}  
                options={{
                    tabBarLabel: 'Tracks',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
                    )
                }}
            />
            <BottomTab.Screen 
                name="TrackCreate" 
                component={TrackCreateScreen}
                options={{
                    tabBarLabel: 'Add Track',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus-circle-outline" color={color} size={size} />
                    )
                }}
                />
            <BottomTab.Screen 
                name="Account" 
                component={AccountScreen} 
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-settings" color={color} size={size} />
                    )
                }}
                />
        </BottomTab.Navigator>
    )
}

export default function AppContainer() {
    const {state,localSignin} = useContext(AuthContext)

    useEffect(() => {
        localSignin()
    }, []);
    
    return(
      <NavigationContainer ref={navigationRef}>
        {state.resolvedInitialAuth===false?null: state.token===null?<MainNavigator />:<TabNavigator/> }
      </NavigationContainer>
    )
} 
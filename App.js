import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {Provider as AuthProvider, Context as AuthContext} from './src/context/AuthContext'
import {Provider as LocationProvider, Context as LocationContext} from './src/context/LocationContext'
import { Provider as TrackProvider } from "./src/context/TrackContext";

// import { createAppContainer, createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";

// import AccountScreen from "./src/screens/AccountScreen";
// import SigninScreen from "./src/screens/SigninScreen";
// import SignupScreen from "./src/screens/SignupScreen";
// import TrackCreateScreen from "./src/screens/TrackCreateScreen";
// import TrackListScreen from "./src/screens/TrackListScreen";
// import TrackDetailScreen from "./src/screens/TrackDetailScreen";

import AppContainer from "./src/navigations/AppNavigation"

const App = ()=>{
 
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <AppContainer/>
          </SafeAreaProvider> 
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
    
  )
    
}

export default App

// const switchNavigator = createSwitchNavigator({
//    loginFlow: createStackNavigator({
//     Signup: SignupScreen,
//     Signin: SigninScreen
//    }),
//    mainFlow: createBottomTabNavigator({
//     trackListFlow: createStackNavigator({
//       TrackList: TrackListScreen,
//       TrackDetail: TrackDetailScreen
//     }),
//     TrackCreate: TrackCreateScreen,
//     Account: AccountScreen
//    })
// })


// export default createAppContainer(switchNavigator)
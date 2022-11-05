import React, { useContext,useEffect } from 'react'
import {View, StyleSheet} from 'react-native'
import {Text} from '@rneui/themed'
import { Context as AuthContext } from '../context/AuthContext';

import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignupScreen = ({navigation})=>{
    const {state, signup,clearErrorMessage} = useContext(AuthContext)

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            clearErrorMessage()
            console.log("clear message called in sign up")
        });
    
        return unsubscribe;
    }, [navigation]);

    return (
            <View style={styles.container}>
                <AuthForm
                    headerText="Signup For Tracker"
                    errorMessage ={state.errorMessage}
                    submitButtonText="Sign Up"
                    onSubmit = {signup}
                 />
                 <NavLink
                    text="Already have an account? Sign in instead"
                    LinkRouteName="Signin"
                 />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    }
}) 
export default SignupScreen

import React, { useContext, useEffect } from 'react'
import {View,StyleSheet,Text, Button} from 'react-native'

import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = ({navigation})=>{
    const {state, signin,clearErrorMessage} = useContext(AuthContext)
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            clearErrorMessage()
            console.log("clear message called in sign in")
        });
    
        return unsubscribe;
    }, [navigation]);
    
    return ( 
        <View style={styles.container}>
            <AuthForm
                headerText="Sign In to Your Account"
                errorMessage ={state.errorMessage}
                submitButtonText="Sign In"
                onSubmit = {signin}
            />
            <NavLink
                text="Don't have an account? Sign up instead."
                LinkRouteName="Signup"
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
export default SigninScreen

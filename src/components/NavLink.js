import React from "react";
import { StyleSheet , TouchableOpacity} from "react-native";
import { Text  } from "@rneui/base";
import Spacer from "./Spacer";

import { useNavigation } from "@react-navigation/native";

const NavLink = ({text, LinkRouteName })=>{
    const navigation = useNavigation()

    return (
        <TouchableOpacity  onPress={()=>{navigation.navigate(LinkRouteName)}}>
            <Spacer>
                <Text style={styles.link} >{text}</Text> 
            </Spacer>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    link: {
        color: 'blue',
        fontSize: 15
    }
})

export default NavLink
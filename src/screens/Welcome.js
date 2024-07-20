import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import { UserContext } from '../contexts/userContext';

export default function Welcome({ navigation: { navigate } }) {
    const { user } = useContext(UserContext)
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao YouCook</Text>
            <View style={styles.body}>
                <TouchableOpacity style={styles.btnwel} onPress={() => navigate('SignIn')}>
                    <Text style={styles.txtbtn}>Já tenho conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnwel} onPress={() => navigate('SignUp')}>
                    <Text style={styles.txtbtn}>Criar conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E65E1A'
    },
    title:{
        flex: 1,
        marginTop: 150,
        color: '#fff',
        fontSize: 42,
        fontWeight: 'bold',
        alignItems: "center",
    },
    btnwel: {
        height: 75,
        width: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DBE619',
        padding: 10,
        marginBottom: 30,
    },
    txtbtn: {
        flex: 1,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        alignContent: 'space-between',
        alignItems: 'center',
    }
});
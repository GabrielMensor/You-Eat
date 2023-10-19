import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import 'react-native-gesture-handler';
import React, { useContext } from 'react';

export default function Welcome({ navigation: { navigate } }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao YouCook</Text>
            <View style={styles.body}>
                <TouchableOpacity style={styles.btnwel} onPress={() => navigate('SignIn')}>
                    <Text style={styles.txtbtn}>Já tenho uma conta</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnwel} onPress={() => navigate('SignUp')}>
                    <Text style={styles.txtbtn}>Criar uma conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title:{
        flex: 1,
        marginTop: 15,
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnwel: {
        height: 75,
        width: 250,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
    },
    txtbtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 1,
        alignContent: 'space-between',
        alignItems: 'center',
    }
});
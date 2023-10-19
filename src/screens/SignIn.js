import { useState, createContext, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Pessoas from 'react-native-vector-icons/Fontisto';
import Chef from 'react-native-vector-icons/MaterialCommunityIcons';
import Deliveryman from 'react-native-vector-icons/MaterialIcons';

import { getAuth, signInWithEmailAndPassword, auth } from 'firebase/auth'
import { firebaseConfig, autht } from '../../FirebaseConfig'
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';


export default function SignIn({ navigation: { navigate } }) {

    /* const UserContext = createContext() */      // EXPORTAR O CONTEXTO

    const [email, setEmail] = useState()
    const [senha, setPassword] = useState()
    const [loading, setLoading] = useState(false)

        function fazerLogin () {
            setLoading(true)
            console.log(senha)
            signInWithEmailAndPassword(autht, email, senha)       // LOGAR USUÁRIO EXISTENTE
            .then(async (userCredential) => {
                alert('Entrou')
                const user = userCredential.user;
                console.log(user)
                setLoading(false)
                navigate('Home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                alert('Não entrou')
                setLoading(false)
            })
            /* navigate('Home')  */
        }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>YouCook</Text>
            <View style={styles.types}>
                <TouchableOpacity style={styles.acountType}>
                    <Pessoas name="persons" size={38} style={{ marginRight: 2 }} />
                    <Text style={styles.txt}>Cliente</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acountType}>
                    <Chef name="chef-hat" size={38} style={{ marginRight: 12 }} />
                    <Text style={styles.txt}>Empreendedor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acountType}>
                    <Deliveryman name="sports-motorsports" size={38} style={{ marginRight: 12 }} />
                    <Text style={styles.txt}>Entregador</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <TextInput style={styles.input} placeholder='E-mail' onChangeText={text => setEmail(text)} value={email}></TextInput>
                <TextInput style={styles.input} placeholder='Senha' onChangeText={text => setPassword(text)} value={senha}></TextInput>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => fazerLogin()}>
                <Text>Entrar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        flex: 1,
        marginTop: 20,
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        fontSize: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        marginBottom: 5,
        width: 250,
        height: 5,
        padding: 3,
    },
    body: {
        height: 200,
        marginBottom: 54,
        borderWidth: 2,
        borderRadius: 15,
        padding: 25,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 248,
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 50,
    },
    acountType: {
        height: 100,
        width: 110,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        marginLeft: 5,
    },
    types: {
        flexDirection: 'row',
        marginBottom: 20,
    }
});

/* export const useUser = () => {           EXPORTAR O CONTEXTO
    return useContext(UserContext);
  }; */
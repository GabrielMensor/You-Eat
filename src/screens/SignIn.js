import { useState, createContext, useEffect } from 'react';
import { useContext } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import Pessoas from 'react-native-vector-icons/Fontisto';
import Chef from 'react-native-vector-icons/MaterialCommunityIcons';
import Deliveryman from 'react-native-vector-icons/MaterialIcons';

import { getAuth, signInWithEmailAndPassword, auth, onAuthStateChanged } from 'firebase/auth'       // FIREBASE
import { autht, firebaseConfig } from '../../FirebaseConfig'
import { database } from '../../fb';
import { doc, getDoc, getDocs, getFirestore, collection, query, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import { UserContext } from '../contexts/userContext'               // CONTEXTOS

const accentColor = '#1AB32E'
const initialColor1 = '#000';
const initialColor2 = '#000';
const initialColor3 = '#000';

export default function SignIn({ navigation: { navigate } }) {

    /* const UserContext = createContext() */      // EXPORTAR O CONTEXTO
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [accountType, setAccountType] = useState()

    const [isCli, setIsCli] = useState();
    const [isEmp, setIsEmp] = useState();
    const [isEnt, setIsEnt] = useState();

    const [clientColor, setClientColor] = useState(initialColor1);
    const [emprColor, setEmprColor] = useState(initialColor2);
    const [entColor, setEntrColor] = useState(initialColor3);

    const { LocalSignIn } = useContext(UserContext)

/*     useEffect(() => {
        // Criar um observador para o estado de autenticação do usuário
        const authStateChange = onAuthStateChanged((user) => {
          // Se o usuário estiver logado, atualizar o estado do usuário
          if (user) {
            setUser(user);
          }
        });
        
    // Retornar uma função de limpeza para cancelar a inscrição no observador
    return () => authStateChange();
}, []); */

    function handleColorButton(nr) {
        if (nr === 1) {
            setClientColor(accentColor)
            setEmprColor(initialColor2)
            setEntrColor(initialColor3)

            setAccountType('cliente')

        } else if (nr === 2) {
            setClientColor(initialColor1)
            setEmprColor(accentColor)
            setEntrColor(initialColor3)

            setAccountType('empreendedor')

        } else if (nr === 3) {
            setClientColor(initialColor1)
            setEmprColor(initialColor2)
            setEntrColor(accentColor)

            setAccountType('entregador')

        } else {
            console.log('O valor para accountType não é compatível')
        }
    }

    async function fazerLogin() {
        if (!accountType) {
            alert('Selecione um dos tipos de conta');
            return;
        }
        setError('');
        setLoading(true);

        signInWithEmailAndPassword(autht, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const userUid = user.uid;

                const citiesRef = collection(database, accountType);
                const q = query(citiesRef, where("uid", "==", userUid));

                getDocs(q)
                    .then((querySnapshot) => {
                        // Usar o array docs do objeto querySnapshot
                        const docs = querySnapshot.docs;
                        docs.forEach((doc) => {
                            const userData = doc.data();
                            console.log(userData)
                            if (userData) {
                                console.log(userData.nome)
                                const iden = userData.uid
                                const mionome = userData.nome
                                const codice = userData.codigo
                                const iscodice = userData.iscodigo
                                const indirizzo = userData.email
                                const parola = userData.password
                                const strada = userData.rua
                                const quatiere = userData.bairro
                                const citta = userData.cidade
                                const nascita = userData.datanasc
                                const stato = userData.estado
                                const nrdicarta = userData.nrcartao
                                const targa = userData.placa
                                const descrizione = userData.descricao
                                const disponibile = userData.isavailable

                                LocalSignIn(iden, quatiere, citta, nascita, indirizzo, stato, iscodice, mionome, codice, nrdicarta, strada, parola, accountType, targa, descrizione, disponibile)
                                setLoading(false);
                                let itensnumber = 0
                                navigate('Home', {itensnumber});
                            }
                            else {
                                alert('errado com alguma variável')
                            }
                        })
                    })
                    .catch((error) => {
                        alert(error.code);
                        alert(error.message);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>YouCook</Text>
            <View style={styles.types}>
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 110,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 2,
                        marginLeft: 5,
                        borderColor: clientColor,
                        backgroundColor: '#D9D9D9'
                    }}
                    onPress={() => handleColorButton(1)}
                >
                    <Pessoas name="persons" size={38} style={{ marginRight: 2, color: clientColor }} />
                    <Text style={{ color: clientColor }}>Cliente</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 110,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 2,
                        marginLeft: 5,
                        borderColor: emprColor,
                        backgroundColor: '#D9D9D9'
                    }}
                    onPress={() => handleColorButton(2)}
                >
                    <Chef name="chef-hat" size={38} style={{ marginRight: 12, color: emprColor }} />
                    <Text style={{ color: emprColor }}>Empreendedor</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 110,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 2,
                        marginLeft: 5,
                        borderColor: entColor,
                        backgroundColor: '#D9D9D9'
                    }}
                    onPress={() => handleColorButton(3)}
                >
                    <Deliveryman name="sports-motorsports" size={38} style={{ marginRight: 12, color: entColor }} />
                    <Text style={{ color: entColor }}>Entregador</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <TextInput style={styles.input} placeholder='E-mail' onChangeText={text => setEmail(text)} value={email}></TextInput>
                <TextInput style={styles.input} placeholder='Senha' onChangeText={text => setPassword(text)} value={password} secureTextEntry={true}></TextInput>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => fazerLogin()}>
                <Text>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 35, marginTop: 2}} onPress={() => navigate('SignUp')}>
                <Text style={{  color: '#DBE619'  }}>Não possui conta ainda? Clique aqui</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#E65E1A'
    },
    title: {
        flex: 1,
        marginTop: 100,
        color: '#fff',
        fontSize: 45,
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
        backgroundColor: '#d9d9d9',
        borderRadius: 10,
    },
    body: {
        height: 200,
        marginBottom: 54,
        borderWidth: 2,
        borderRadius: 15,
        padding: 25,
        backgroundColor: '#DBE619'
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 248,
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: '#DBE619'
    },
    accountTypeCli: {
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
    },
    red: {
        backgroundColor: 'red',
        alignItems: 'center',
        padding: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DBE619',
        padding: 10,
    },
});
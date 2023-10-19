import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseConfig, autht } from '../../FirebaseConfig'
import database from '../../fb'
import { getFirestore, doc, getDoc, Firestore, addDoc, collection, auth } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

let contador = 1

export default function SignUp({ navigation: { navigate } }) {

    const [nome, setNome] = useState()
    const [cpf, setCpf] = useState()
    const [cnpj, setCnpj] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [visibleTitle, setVisibleTitle] = useState(true)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();


/*     let uid = firebase.auth.currentUser.uid; */

    const CadastrarUsuario = async (accountType) => {
        if (password.length < 6) {                                  // Verificar tamanho da senha mínima do Firebase
            console.error('A senha precisa ter mais de 5 dígitos')
            return
        } else {
            console.log('Senha de bom tamanho')
        }
        
        if (accountType === 'cliente') {                            // Verificações de tipo de conta
            console.log('cliente')
/*             firebase.database.ref('clientes').child(uid).set({
                login:login,
                password:password,
                userType: "cliente"
           }); */
        } else if (accountType === 'empreendedor') {
            console.log('empreendedor')
/*             firebase.database.ref('empreendedor').child(uid).set({
                login:login,
                password:password,
                userType: "empreendedor"
           }); */
        } else if (accountType === 'entregador') {
            console.log('entregador')
/*             firebase.database.ref('entregador').child(uid).set({
                login:login,
                password:password,
                userType: "entregador"
           }); */
        } else {
            console.error('Algo de errado aconteceu')
            return
        }

        console.log(email)
            createUserWithEmailAndPassword(autht, email, password).then(() => {
/*                 setLoading(true) */
                console.log('1')
                getNewUserData(accountType)
                console.log('2')
/*                 setLoading(false)
 */                alert('Por favor, entre em sua nova conta')
                console.log('3')
                navigation.navigate('SignIn')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/email-already-in-use') {
                    alert('Esse email já está em uso')
                } else if (errorCode == "auth/invalid-email") {
                    alert("Endereço de e-mail inválido");
                } else if (errorCode == "auth/operation-not-allowed") {
                    alert("Operação negada.");
                } else if (errorCode == "auth/weak-password") {
                    alert("Senha muito fraca");
                } else{
                    console.log(errorCode)
                    console.log(errorMessage)
                }
            });
    }

    function getNewUserData(accountType) {
        const userRef = doc(database, accountType, auth().currentUser.uid);
        console.log('dentro')
        addDoc(userRef, collection(database, accountType).doc(auth().currentUser.uid.set({
            uid: auth().currentUser.uid,
            nome,
            cpf,
            email,
            senha: password,
            rua: '',
            bairro: '',
            cidade: '',
            datanasc: '',
            estado: '',
            nrcartao: '',
        })))
    }

    // Função para salvar as informações da conta

    const [formCli, setFormCli] = useState(false);
    const showFormCli = () => {
        contador = contador + 1
        setFormCli(!formCli)
        setFormEnt(false)
        setFormDel(false)
        if (contador % 2 === 0) {
            setVisibleTitle(false)
        } else {
            setVisibleTitle(true)
        }
    };

    const [formEnt, setFormEnt] = useState(false);
    const showFormEnt = () => {
        contador = contador + 1
        setFormCli(false)
        setFormEnt(!formEnt)
        setFormDel(false)
        if (contador % 2 === 0) {
            setVisibleTitle(false)
        } else {
            setVisibleTitle(true)
        }
    };

    const [formDel, setFormDel] = useState(false);
    const showFormDel = () => {
        contador = contador + 1
        setFormCli(false)
        setFormEnt(false)
        setFormDel(!formDel)
        if (contador % 2 === 0) {
            setVisibleTitle(false)
        } else {
            setVisibleTitle(true)
        }
    };

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                {visibleTitle && <Text style={styles.title}>YouCook</Text>}
                <TouchableOpacity style={{ height: 100, width: 300, borderWidth: 2 }} onPress={() => showFormCli()}><Text>Como Cliente</Text></TouchableOpacity>
                <View style={styles.formView}>
                    {formCli &&
                        <ScrollView style={styles.form}>
                            <Text>Formulário de Cliente</Text>
                            <TextInput style={styles.input} placeholder='Seu nome' onChangeText={text => setNome(text)} value={nome}></TextInput>
                            <TextInput style={styles.input} placeholder='Seu CPF' onChangeText={text => setCpf(text)} value={cpf}></TextInput>
                            <TextInput style={styles.input} placeholder='Seu email' onChangeText={text => setEmail(text)} value={email}></TextInput>
                            <TextInput style={styles.input} placeholder='Digite a senha' onChangeText={text => setPassword(text)} value={password} secureTextEntry={true}></TextInput>
                            <TouchableOpacity style={styles.btn} onPress={() => CadastrarUsuario('cliente')}>
                                <Text>Continuar</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    }
                </View>
                <TouchableOpacity style={{ height: 100, width: 300, borderWidth: 2 }} onPress={() => showFormEnt()} visible={formCli}><Text>Como Empreendedor</Text></TouchableOpacity>
                <View style={styles.formView}>
                    {formEnt &&
                        <ScrollView style={styles.form}>
                            <Text>Formulário de Empreendedor</Text>
                            <TextInput style={styles.input} placeholder='Nome da empresa' onChangeText={text => setNome(text)} value={nome}></TextInput>
                            <TextInput style={styles.input} placeholder='Seu CNPJ' onChangeText={text => setCnpj(text)} value={cnpj}></TextInput>
                            <TextInput style={styles.input} placeholder='Seu email' onChangeText={text => setEmail(text)} value={email} /* autoComplete='email' */></TextInput>
                            <TextInput style={styles.input} placeholder='Digite a senha' onChangeText={text => setPassword(text)} value={password} secureTextEntry={true}></TextInput>
                            <TouchableOpacity style={styles.btn} onPress={() => CadastrarUsuario('empreendedor')}>
                                <Text>Continuar</Text>
                            </TouchableOpacity>
                        </ScrollView>}
                </View>
                <TouchableOpacity style={{ height: 100, width: 300, borderWidth: 2 }} onPress={() => showFormDel()} visible={formCli}><Text>Como Entregador</Text></TouchableOpacity>
                <View style={styles.formView}>
                    {formDel &&
                        <ScrollView style={styles.form}>
                            <Text>Formulário de Entregador</Text>
                            <TextInput style={styles.input} placeholder='Seu nome' onChangeText={text => setNome(text)} value={nome}></TextInput>
                            <TextInput style={styles.input} placeholder='Seu CPF' onChangeText={text => setCpf(text)} value={cpf} ></TextInput>
                            <TextInput style={styles.input} placeholder='Seu email' onChangeText={text => setEmail(text)} value={email}></TextInput>
                            <TextInput style={styles.input} placeholder='Digite a senha' onChangeText={text => setPassword(text)} value={password} secureTextEntry={true}></TextInput>
                            <TouchableOpacity style={styles.btn} onPress={() => CadastrarUsuario('entregador')}>
                                <Text>Continuar</Text>
                            </TouchableOpacity>
                        </ScrollView>}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        marginTop: 25,
        marginBottom: 60,
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        marginBottom: 15,
        marginHorizontal: 5,
        padding: 3,
        width: 144,
        height: 35,
    },
    body: {
        height: 150,
        marginBottom: 54,
    },
    formView: {
        marginBottom: 20,
    },
    form: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    formdois: {
        width: '100%',
    },
    left: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    right: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 150,
        borderWidth: 1,
        borderRadius: 15,
    },
});
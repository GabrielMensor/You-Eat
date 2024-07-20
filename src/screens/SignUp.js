import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { firebaseConfig, autht } from '../../FirebaseConfig'
import { database } from '../../fb'
import { getFirestore, doc, getDoc, Firestore, addDoc, collection, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';

import { RadioButton } from 'react-native-paper';

let contador = 1

export default function SignUp({ navigation: { navigate } }) {

    const [nome, setNome] = useState()
    const [checked, setChecked] = useState('cpf')
    const [codigo, setCodigo] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [visibleTitle, setVisibleTitle] = useState(true)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation();

    // Função que valida o CPF
    function validaCPF(cpf) {
        // Extrai os números do CPF
        cpf = cpf.replace(/[^\d]+/g, '');

        // Verifica se o CPF tem 11 dígitos
        if (cpf.length != 11) {
            return false;
        }

        // Verifica se o CPF tem todos os dígitos iguais (inválido)
        if (cpf == '00000000000' ||
            cpf == '11111111111' ||
            cpf == '22222222222' ||
            cpf == '33333333333' ||
            cpf == '44444444444' ||
            cpf == '55555555555' ||
            cpf == '66666666666' ||
            cpf == '77777777777' ||
            cpf == '88888888888' ||
            cpf == '99999999999') {
            return false;
        }

        // Calcula o primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = 11 - (soma % 11);
        if (resto == 10 || resto == 11) {
            resto = 0;
        }
        if (resto != parseInt(cpf.charAt(9))) {
            return false;
        }

        // Calcula o segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = 11 - (soma % 11);
        if (resto == 10 || resto == 11) {
            resto = 0;
        }
        if (resto != parseInt(cpf.charAt(10))) {
            return false;
        }

        // Se chegou até aqui, o CPF é válido
        return true;
    }

    // Função que valida o CNPJ
    function validaCNPJ(cnpj) {

        // Extrai os números do CNPJ
        cnpj = cnpj.replace(/[^\d]+/g, '');

        // Verifica se o CNPJ tem 14 dígitos
        if (cnpj.length != 14) {
            return false;
        }

        // Verifica se o CNPJ tem todos os dígitos iguais (inválido)
        if (cnpj == '00000000000000' ||
            cnpj == '11111111111111' ||
            cnpj == '22222222222222' ||
            cnpj == '33333333333333' ||
            cnpj == '44444444444444' ||
            cnpj == '55555555555555' ||
            cnpj == '66666666666666' ||
            cnpj == '77777777777777' ||
            cnpj == '88888888888888' ||
            cnpj == '99999999999999') {
            return false;
        }

        // Calcula o primeiro dígito verificador
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return false;
        }

        // Calcula o segundo dígito verificador
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return false;
        }

        // Se chegou até aqui, o CNPJ é válido
        return true;
    }

    const CadastrarUsuario = async (accountType) => {
        if (password.length < 6) {                                  // Verificar tamanho da senha mínima do Firebase
            alert('A senha precisa ter mais de 5 dígitos')
            return
        } else {
            alert('Senha de bom tamanho')
        }
            if (checked === 'cpf') {
                const validacao = validaCPF(codigo)
                if (!validacao) {
                    alert('CPF inválido')
                    return
                }
            } else if (checked === 'cnpj') {
                const validacao = validaCNPJ(codigo)
                if (!validacao) {
                    alert('CNPJ inválido')
                    return
                }
            } else {
                alert('Nome de checked é inválido')
                return
            }
        console.log(email)
        await createUserWithEmailAndPassword(autht, email, password).then((userCredential) => {
            setLoading(true)
            const user = userCredential.user;
            const novoUsuario = getNewUserData(user, accountType);

            if (novoUsuario) {
                console.log(novoUsuario);
            } else {
                console.log('Houve um erro ao criar o novo usuário.');
                console.error('Erro ao criar o novo usuário:');
            }
            setLoading(false)
            alert('Por favor, entre em sua nova conta')
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
                } else {
                    console.log(errorCode)
                    console.log(errorMessage)
                }
            });
    }

    async function getNewUserData(user, accountType) {
        const newUser = {
            uid: user.uid,
            nome,
            codigo,
            iscodigo: checked,
            email,
            password,
            rua: '',
            bairro: '',
            cidade: '',
            datanasc: '',
            estado: '',
            nrcartao: '',
        }

        if (accountType === 'empreendedor'){
            newUser.descricao = ''
        } else if (accountType === 'entregador') {
            newUser.placa = ''
            newUser.isavailable = ''
        }

        console.log(accountType);
        await addDoc(collection(database, accountType), newUser);
        alert('Cadastro efetuado com SUCESSO');
    }


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
        <ScrollView style={{ flex: 1, backgroundColor: '#E65E1A' }}>
            <View style={styles.container}>
                {visibleTitle && <Text style={styles.title}>YouCook</Text>}
                <TouchableOpacity style={{ height: 100, width: 300, borderWidth: 2, backgroundColor: '#D9D9D9' }} onPress={() => showFormCli()}><Text>Como Cliente</Text></TouchableOpacity>
                <View style={styles.formView}>
                    {formCli &&
                        <ScrollView style={styles.form}>
                            <Text style={{ color: '#fff' }}>Formulário de Cliente</Text>
                            <TextInput style={styles.input} placeholder='Seu nome' onChangeText={text => setNome(text)} value={nome}></TextInput>
                            <TextInput style={styles.input} placeholder='Seu CPF' onChangeText={text => setCodigo(text) && verificaTipoEValidaNumero(text)} value={codigo}></TextInput>
                            <TextInput style={styles.input} placeholder='Seu email' onChangeText={text => setEmail(text)} value={email}></TextInput>
                            <TextInput style={styles.input} placeholder='Digite a senha' onChangeText={text => setPassword(text)} value={password} secureTextEntry={true}></TextInput>
                            <TouchableOpacity style={styles.btn} onPress={() => CadastrarUsuario('cliente')}>
                                <Text>Continuar</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    }
                </View>
                <TouchableOpacity style={{ height: 100, width: 300, borderWidth: 2, backgroundColor: '#D9D9D9' }} onPress={() => showFormEnt()} visible={formCli}><Text>Como Empreendedor</Text></TouchableOpacity>
                <View style={styles.formView}>
                    {formEnt &&
                        <ScrollView style={styles.form}>
                            <Text style={{ color: '#fff' }}>Formulário de Empreendedor</Text>
                            <TextInput style={styles.input} placeholder='Nome da empresa' onChangeText={text => setNome(text)} value={nome}></TextInput>
                            <RadioButton.Item
                                label='CPF'
                                style={{ flexDirection: 'row-reverse', margin: 0 }}
                                value='cpf'
                                status={checked === 'cpf' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('cpf')}
                            />
                            <RadioButton.Item
                                label='CNPJ'
                                style={{ flexDirection: 'row-reverse', margin: 0 }}
                                value='cnpj'
                                status={checked === 'cnpj' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('cnpj')}
                            />
                            <TextInput style={styles.input} placeholder='Seu código' onChangeText={text => setCodigo(text)} value={codigo}></TextInput>
                            <TextInput style={styles.input} placeholder='Seu email' onChangeText={text => setEmail(text)} value={email} /* autoComplete='email' */></TextInput>
                            <TextInput style={styles.input} placeholder='Digite a senha' onChangeText={text => setPassword(text)} value={password} secureTextEntry={true}></TextInput>
                            <TouchableOpacity style={styles.btn} onPress={() => CadastrarUsuario('empreendedor')}>
                                <Text>Continuar</Text>
                            </TouchableOpacity>
                        </ScrollView>}
                </View>
                <TouchableOpacity style={{ height: 100, width: 300, borderWidth: 2, backgroundColor: '#D9D9D9' }} onPress={() => showFormDel()} visible={formCli}><Text>Como Entregador</Text></TouchableOpacity>
                <View style={styles.formView}>
                    {formDel &&
                        <ScrollView style={styles.form}>
                            <Text style={{ color: '#fff' }}>Formulário de Entregador</Text>
                            <TextInput style={styles.input} placeholder='Seu nome' onChangeText={text => setNome(text)} value={nome}></TextInput>
                            <TextInput style={styles.input} placeholder='Seu CPF' onChangeText={text => setCodigo(text)} value={codigo} ></TextInput>
                            <TextInput style={styles.input} placeholder='Seu email' onChangeText={text => setEmail(text)} value={email}></TextInput>
                            <TextInput style={styles.input} placeholder='Digite a senha' onChangeText={text => setPassword(text)} value={password} secureTextEntry={true}></TextInput>
                            <TouchableOpacity style={styles.btn} onPress={() => CadastrarUsuario('entregador')}>
                                <Text>Continuar</Text>
                            </TouchableOpacity>
                        </ScrollView>}
                </View>
                <TouchableOpacity style={{ marginBottom: 35, marginTop: 2}} onPress={() => navigate('SignUp')}>
                <Text style={{  color: '#DBE619'  }}>Já possui conta? Clique aqui</Text>
            </TouchableOpacity>
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
        marginTop: 100,
        marginBottom: 60,
        color: '#fff',
        fontSize: 45,
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
        backgroundColor: '#D9D9D9',
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
        backgroundColor: '#FFD700'
    },
});
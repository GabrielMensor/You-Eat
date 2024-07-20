import { View, StyleSheet, Text, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'  // tirar posteriormente
import Modal from 'react-native-modal';

import { signOut } from "firebase/auth";
import { autht } from "../../FirebaseConfig";

import { doc, getDoc, getDocs, getFirestore, collection, query, where, writeBatch } from 'firebase/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { database } from '../../fb';

import { UserContext } from '../contexts/userContext';
import React, { useContext, useEffect, useState } from 'react';

export default function ModelEmtrepreneur({ navigation: { navigate }, route }) {
    const { user } = useContext(UserContext)
    const [nome, setNome] = useState(user.nome)
    const [descricao, setDescricao] = useState(user.descricao)
    const [rua, setRua] = useState(user.rua)
    const [bairro, setBairro] = useState(user.bairro)
    const [cidade, setCidade] = useState(user.cidade)
    const [estado, setEstado] = useState(user.estado)
    const [datanasc, setDatanasc] = useState(user.datanasc)
    const [nrcartao, setNrcartao] = useState(user.nrcartao)
    const [inputVisibility, setInputVisibility] = useState(false)

    const [modalVisibility, setModalVisibility] = useState(false)

    const { LocalSignIn } = useContext(UserContext)
    const accountType = user.tipoConta

    useEffect(() => {
        accountType !== 'empreendedor' ? setModalVisibility(true) : setModalVisibility(false)
    }, [])

    const handleLogOut = () => {
        signOut(autht).then(() => {
            navigate('Welcome')
            console.log('Usuário saiu com segurança')
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
            alert('Não saiu')
        })
    }
    console.log(user)
    
    const handleDocumentId = async () => {
        const q = query(collection(database, accountType), where('uid', '==', user.uid))
        console.log(1)
        const documenti = await getDocs(q)
        if (documenti.size === 1) {
            console.log(2)
            console.log(documenti.docs[0].id)
            return documenti.docs[0].id
        } else {
            console.error('Erro: Múltiplos ou nenhum documento encontrado')
            console.log(3)
            return null
        }
    }

    const handleUpdate = async () => {
        const DocumentId = await handleDocumentId()
        console.log(DocumentId)
        try {
            const batch = writeBatch(database)
            const theUserRef = doc(database, 'empreendedor', DocumentId)
            const updatedData = {
                uid: user.uid,
                bairro: bairro,
                cidade: cidade,
                datanasc: datanasc,
                descricao: descricao,
                email: user.email,
                estado: estado,
                iscodigo: user.iscodigo,
                nome: nome,
                codigo: user.codigo,
                nrcartao: nrcartao,
                rua: rua,
                password: user.password,
            }
            batch.set(theUserRef, updatedData)
            await batch.commit()

            setInputVisibility(false)
            LocalSignIn(user.uid, bairro, cidade, datanasc, user.email, estado, user.iscodigo, nome, user.codigo, nrcartao, rua, user.password, user.tipoConta, user.placa, descricao, user.isavailable)
            console.log('Dados atualizados com sucesso')
        } catch (error) {
            console.error('Erro ao atualizar os dados do usuário: ', error.message)
        }
    }

    // O modal serve para quando o sujeito tem um tipo de conta que não tem acesso a determinada parte do app
    return (
        <ScrollView>
            <Modal
                isVisible={modalVisibility}
                backdropOpacity={0.85}
                style={{margin: 0, height: '100%', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}
                propagateSwipe={true}
            >
                <Text style={{color: 'white', marginBottom: 10}}>Você não tem permissão para estar nessa tela</Text>
                <TouchableOpacity onPress={() => navigate('Home', { itensnumber })} style={styles.btnModal}>
                    <Text>Voltar para Home</Text>
                </TouchableOpacity>
            </Modal>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Icon name="person-circle" size={250} style={styles.imgperfil} />
                </View>
                <View style={styles.textBody}>
                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>Nome: </Text>
                        <Text style={styles.fieldData}>{user.nome}</Text>
                    </View>
                    {inputVisibility &&
                        <TextInput
                            editable
                            onChangeText={text => setNome(text)}
                            value={nome}
                            style={styles.inputs}
                        />}

                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>Descrição: </Text>
                        <Text style={styles.fieldData}>{user.descricao ? user.descricao : 'Não preenchido'}</Text>
                    </View>
                    {inputVisibility &&
                        <TextInput
                            editable
                            multiline
                            numberOfLines={5}
                            onChangeText={text => setDescricao(text)}
                            placeholder='Descrição do empreendimento'
                            value={descricao}
                            style={styles.biggerInput}
                        />}

                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>{user.iscodigo === 'cnpj' ? 'CNPJ: ' : 'CPF: '}</Text>
                        <Text style={styles.fieldData}>{user.codigo}</Text>
                    </View>
                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>E-mail: </Text>
                        <Text style={styles.fieldData}>{user.email}</Text>
                    </View>
                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>Senha: </Text>
                        <Text style={styles.fieldData}>{user.password}</Text>
                    </View>
                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>Rua: </Text>
                        <Text style={styles.fieldData}>{user.rua ? user.rua : 'Não preenchido'}</Text>
                    </View>
                    {inputVisibility &&
                        <TextInput
                            editable
                            onChangeText={text => setRua(text)}
                            placeholder='Digite sua rua'
                            value={rua}
                            style={styles.inputs}
                        />}

                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>Bairro: </Text>
                        <Text style={styles.fieldData}>{user.bairro ? user.bairro : 'Não preenchido'}</Text>
                    </View>
                    {inputVisibility &&
                        <TextInput
                            editable
                            onChangeText={text => setBairro(text)}
                            placeholder='Digite seu bairro'
                            value={bairro}
                            style={styles.inputs}
                        />}

                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>Cidade: </Text>
                        <Text style={styles.fieldData}>{user.cidade ? user.cidade : 'Não preenchido'}</Text>
                    </View>
                    {inputVisibility &&
                        <TextInput
                            editable
                            onChangeText={text => setCidade(text)}
                            placeholder='Digite sua cidade'
                            value={cidade}
                            style={styles.inputs}
                        />}

                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>Estado: </Text>
                        <Text style={styles.fieldData}>{user.estado ? user.estado : 'Não preenchido'}</Text>
                    </View>
                    {inputVisibility &&
                        <TextInput
                            editable
                            onChangeText={text => setEstado(text)}
                            placeholder='Digite seu estado'
                            value={estado}
                            style={styles.inputs}
                        />}

                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>Data de Nascimento: </Text>
                        <Text style={styles.fieldData}>{user.datanasc ? user.datanasc : 'Não preenchido'}</Text>
                    </View>
                    {inputVisibility &&
                        <TextInput
                            editable
                            onChangeText={text => setDatanasc(text)}
                            placeholder='Digite sua data de nascimento'
                            value={datanasc}
                            style={styles.inputs}
                        />}

                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>Número do cartão: </Text>
                        <Text style={styles.fieldData}>{user.nrcartao ? user.nrcartao : 'Não preenchido'}</Text>
                    </View>
                    {inputVisibility &&
                        <TextInput
                            editable
                            onChangeText={text => setNrcartao(text)}
                            placeholder='Digite o número do cartão'
                            value={nrcartao}
                            style={styles.inputs}
                        />}

                    {!inputVisibility &&
                        <>
                            <TouchableOpacity style={styles.btn} onPress={() => handleLogOut()}>
                                <Text>Sair da conta</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={() => setInputVisibility(true)}>
                                <Text>Alterar dados</Text>
                            </TouchableOpacity>
                        </>}
                    {inputVisibility &&
                        <>
                            <TouchableOpacity style={styles.btn} onPress={() => handleUpdate()} visible={inputVisibility}>
                                <Text>Confirmar alterações</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn} onPress={() => setInputVisibility(false)} visible={inputVisibility}>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </>}
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
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 100,
        borderWidth: 1,
        marginBottom: 5,
    },
    iconContainer: {
        width: 250,
        marginLeft: 14,
        justifyContent: "space-between",
    },
    nameAndData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputs: {
        borderWidth: 1,
        marginTop: 3,
        marginBottom: 3,
        padding: 4,
        borderRadius: 10,
    },
    biggerInput: {
        borderWidth: 1,
        marginTop: 3,
        marginBottom: 3,
        /* padding: 8, */
        borderRadius: 10,
        height: 100,
        width: 230,
    },
    fieldData: {
        maxWidth: 175,
    },
    btnModal: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 100,
        borderWidth: 1,
        marginBottom: 5,
    }
});
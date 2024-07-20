import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'

import { database } from '../../fb';

import { TheRequestContext } from '../contexts/userContext'
import { collection, query, where, getDocs, writeBatch, doc, updateDoc, DocumentReference } from 'firebase/firestore';

export default function DeliveryNotice({ navigation: { navigate } }) {

    const { thisRequest } = useContext(TheRequestContext)
    const { setLocalRequest } = useContext(TheRequestContext)

    const [aempreendedor, setAEmpreendedor] = useState([0])
    const [acliente, setACliente] = useState([0])

    /* console.log('PEDIDO CHEGANDO DO CONTEXTO=========== ', thisRequest) */

    const emEntrega = thisRequest.emEntrega

    const queryEmprAddress = async () => {
        try {
            const theAddress = query(collection(database, 'empreendedor'), where('uid', '==', thisRequest.codemp))
            const snapshot = await getDocs(theAddress)
            const empreData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            console.log('Empree Data ===== ', empreData)
            setAEmpreendedor(empreData)
        } catch (error) {
            console.error('Erro com pesquisa por endereço do empreendedor', error)
        }
    }

    const queryClienteAddress = async () => {
        try {
            const theAddress = query(collection(database, 'cliente'), where('uid', '==', thisRequest.codcli))
            const snapshot = await getDocs(theAddress)
            const clienteData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            console.log('cliente Data ===== ', clienteData)
            setACliente(clienteData)
        } catch (error) {
            console.error('Erro com pesquisa por endereço do cliente', error)
        }
    }

    useEffect(() => {
        queryEmprAddress()
        queryClienteAddress()
    }, [])

    async function recusarPedido() {
        try {
            console.log('1')
            const batch = writeBatch(database)
            console.log('2')
            const theReqRef = doc(database, 'pedido', thisRequest.idPedido)
            console.log('3')
            const updatedData = {
                isentaccept: 'recusado',
            }
            console.log('4')
            if (theReqRef instanceof DocumentReference) {
                console.log('é referência')
                await updateDoc(theReqRef, updatedData);
                alert('Pedido recusado com sucesso')
                navigate('Home')
            } else {
                console.log('theReqRef não é uma referência para um documento');
            }

            setLocalRequest(thisRequest.nomeProduto, thisRequest.nomeEmpre, thisRequest.nomeCli, thisRequest.nomeEnt, thisRequest.valorTotal, thisRequest.qtdeprod, thisRequest.imgum, thisRequest.codent, thisRequest.isempaccept, 'recusado', thisRequest.idPedido)
            console.log('Dados atualizados com sucesso')
        } catch (error) {
            console.error('Erro ao atualizar os dados do usuário: ', error.message)
        }
    }
    async function aceitarPedido() {
        try {
            console.log('1')
            const batch = writeBatch(database)
            console.log('2')
            const theReqRef = doc(database, 'pedido', thisRequest.idPedido)
            /*             const theDelRef = query(database, 'entregador', where('uid','==',thisRequest.codent)) */
            console.log('3')
            const updatedData = {
                isentaccept: 'aceito',
            }
            /*             const changeState = {
                            isavailable: false
                        } */
            console.log('4')
            if (theReqRef instanceof DocumentReference) {
                console.log('é referência')
                await updateDoc(theReqRef, updatedData);
                alert('Pedido aceito com sucesso')
                navigate('Home')
            } else {
                console.log('theReqRef não é uma referência para um documento');
            }

            /*             if (theDelRef instanceof DocumentReference) {
                            console.log('é referência')
                            await updateDoc(theDelRef, changeState)
                            alert('Você está indiponível para novas entregas até realizar a presente')
                            navigate('Home')
                        } else {
                            console.log('theReqRef não é uma referência para um documento');
                        } */

            setLocalRequest(thisRequest.nomeProduto, thisRequest.nomeEmpre, thisRequest.nomeCli, thisRequest.nomeEnt, thisRequest.valorTotal, thisRequest.qtdeprod, thisRequest.imgum, thisRequest.codent, thisRequest.isempaccept, 'aceito', thisRequest.idPedido)
            console.log('Dados atualizados com sucesso')
        } catch (error) {
            console.error('Erro ao atualizar os dados do usuário: ', error.message)
        }
    }

    async function concluirPedido() {
        try {
            console.log('1')
            const batch = writeBatch(database)
            console.log('2')
            const theReqRef = doc(database, 'pedido', thisRequest.idPedido)
            console.log('3')
            const updatedData = {
                isfinished: true,
            }
            console.log('4')
            if (theReqRef instanceof DocumentReference) {
                console.log('é referência')
                await updateDoc(theReqRef, updatedData);
                alert('Pedido finalizado com sucesso')
                navigate('Home')
            } else {
                console.log('theReqRef não é uma referência para um documento');
            }

            setLocalRequest(thisRequest.nomeProduto, thisRequest.nomeEmpre, thisRequest.nomeCli, thisRequest.nomeEnt, thisRequest.valorTotal, thisRequest.qtdeprod, thisRequest.imgum, thisRequest.codent, thisRequest.isempaccept, thisRequest.isentaccept, thisRequest.idPedido)
            console.log('Dados finalizados com sucesso')
        } catch (error) {
            console.error('Erro ao atualizar os dados do usuário: ', error.message)
        }
    }

    return (
        <ScrollView>
            <View style={styles.requestBody}>
                <Image source={thisRequest.imgum} style={styles.imgcar}></Image>
                <View style={{ maxWidth: 180 }}>
                    <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 17 }}>{thisRequest.nomeProduto}</Text>
                    <Text style={styles.dePara}>
                        <Text style={{ color: '#E65E1A', maxWidth: 180 }}>De: </Text>{thisRequest.nomeEmpre} {'\n'} {aempreendedor[0].rua} - {aempreendedor[0].bairro} - {aempreendedor[0].cidade}
                    </Text>
                    <Text style={styles.dePara}>
                        <Text style={{ color: '#E65E1A', maxWidth: 180 }}>Para: </Text>{thisRequest.nomeCli} {'\n'} {acliente[0].rua} - {acliente[0].bairro} - {acliente[0].cidade}
                    </Text>
                </View>
            </View>
            <Text></Text>
{!thisRequest.isfinished &&
           <>
            {!emEntrega &&
                <>
                    <TouchableOpacity style={styles.acceptBtn} onPress={() => aceitarPedido()}>
                        <Text style={{ color: '#fff' }}>ACEITAR PEDIDO</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.refuseBtn} onPress={() => recusarPedido()}>
                        <Text style={{ color: '#fff' }}>RECUSAR PEDIDO</Text>
                    </TouchableOpacity></>}
            {emEntrega &&
                <>
                    <TouchableOpacity style={styles.acceptBtn} onPress={() => concluirPedido()}>
                        <Text style={{ color: '#fff' }}>CLIQUE QUANDO CONCLUIR O PEDIDO</Text>
                    </TouchableOpacity>
                </>}</>}
{thisRequest.isfinished &&
<Text style={{ marginLeft: 75, marginTop: 100 }}>ESTE PEDIDO JÁ FOI FINALIZADO</Text>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItens: 'center',
    },
    textEachRequest: {
        marginBottom: 20,
        height: 200,
        borderWidth: 2,
    },
    imgcar: {
        height: 100,
        width: 100,
        borderRadius: 180,
    },
    acceptBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        width: '100%',
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 5,
        backgroundColor: '#1A4FE6'
    },
    refuseBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        width: '100%',
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 5,
        backgroundColor: '#933100',
    },
    requestBody: {
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 10,
    },
    dePara: {
        width: 250,
        marginLeft: 10,
        marginTop: 10,
    },
})
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'

import { TheRequestContext } from '../contexts/userContext';

import { collection, query, getDocs, where, writeBatch, doc, updateDoc, DocumentReference } from 'firebase/firestore';
import { database } from '../../fb';

export default function RequestApproval({ navigation: { navigate } }) {

    const { thisRequest } = useContext(TheRequestContext)
    const { setLocalRequest } = useContext(TheRequestContext)

    const [adeliveryman, setADeliveryman] = useState([0])
    console.log(thisRequest)

    const queryAboutDelivery = async () => {
        try {
            const theDeliverman = query(collection(database, 'entregador'), where('uid', '==', thisRequest.codent))
            const snapshot = await getDocs(theDeliverman)
            const deliveryData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            console.log('Deliveryman Data========= ',deliveryData)
            setADeliveryman(deliveryData)
        } catch (error) {
            console.error('Algo de errado ao pesquisa por mais dados do entregador: ', error)
        }
    }

    useEffect(() => {
        queryAboutDelivery()
        console.log(adeliveryman)
    }, [])

    async function recusarPedido() {
        try {
            console.log('1')
            const batch = writeBatch(database)
            console.log('2')
            const theReqRef = doc(database, 'pedido', thisRequest.idPedido)
            console.log('3')
            const updatedData = {
                isempaccept: 'recusado',
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

            setLocalRequest( thisRequest.nomeProduto, thisRequest.nomeEmpre, thisRequest.nomeCli, thisRequest.nomeEnt, thisRequest.valorTotal, thisRequest.qtdeprod, thisRequest.imgum, thisRequest.codent, 'recusado', thisRequest.isentaccept, thisRequest.idPedido, thisRequest.codemp)
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
            console.log('3')
            const updatedData = {
                isempaccept: 'aceito',
            }
            console.log('4')
            if (theReqRef instanceof DocumentReference) {
                console.log('é referência')
                await updateDoc(theReqRef, updatedData);
                alert('Pedido aceito com sucesso')
                navigate('Home')
              } else {
                console.log('theReqRef não é uma referência para um documento');
              }

            setLocalRequest( thisRequest.nomeProduto, thisRequest.nomeEmpre, thisRequest.nomeCli, thisRequest.nomeEnt, thisRequest.valorTotal, thisRequest.qtdeprod, thisRequest.imgum, thisRequest.codent, 'aceito', thisRequest.isentaccept, thisRequest.idPedido)
            console.log('Dados atualizados com sucesso')
        } catch (error) {
            console.error('Erro ao atualizar os dados do usuário: ', error.message)
        }
    }
    return (
        <ScrollView>
            <SafeAreaView>
                <View style={styles.requestBody}>
                    <Image source={thisRequest.imgum} style={styles.imgcar}></Image>
                    <View style={styles.two}>
                        <View style={styles.nameAndData}>
                            <Text>{thisRequest.nomeProduto}</Text>
                            <Text style={styles.fieldName}>Nome do cliente: {thisRequest.nomeCli}</Text>
                        </View>
                        <View style={styles.nameAndData}>
                            <Text style={styles.fieldName}>Valor total: {thisRequest.valorTotal}</Text>
                        </View>
                        <View style={styles.nameAndData}>
                            <Text style={styles.fieldName}>Quantidade: {thisRequest.qtde}</Text>
                        </View>
                        <View style={styles.nameAndData}>
                            <Text style={styles.fieldName}>Entregador: {thisRequest.nomeEnt}</Text>
                        </View>
                        <View style={styles.nameAndData}>
                            <Text style={styles.fieldName}>Placa do veículo: {adeliveryman[0].placa}</Text>
                        </View>
                        <View style={styles.nameAndData}>
                            <Text style={styles.fieldName}>E-mail: {adeliveryman[0].email}</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            <Text></Text>
            <TouchableOpacity style={styles.acceptBtn} onPress={() => aceitarPedido()}>
                <Text style={{ color: '#fff' }}>ACEITAR PEDIDO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refuseBtn} onPress={() => recusarPedido()}>
                <Text style={{ color: '#fff' }}>RECUSAR PEDIDO</Text>
            </TouchableOpacity>
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
        marginTop: 20,
        marginLeft: 15,
    }
})
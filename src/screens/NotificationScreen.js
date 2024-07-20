import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'

import { collection, query, where, getDocs } from 'firebase/firestore'
import { database } from '../../fb';

import { UserContext } from '../contexts/userContext';
import { TheRequestContext } from '../contexts/userContext';

export default function NotificationScreen({ navigation: { navigate } }) {

    const { user } = useContext(UserContext)
    const { setLocalRequest } = useContext(TheRequestContext)

    const [requests, setRequests] = useState([])

    const accountType = user.tipoConta
    let codeType = ''
    if (accountType === 'cliente') {
        codeType = 'codcli'
    } else if (accountType === 'empreendedor') {
        codeType = 'codemp'
    } else if (accountType === 'entregador') {
        codeType = 'codent'
    } else {
        console.error('Seu tipo de conta é inválido')
    }

    const queryAbouRequests = async () => {
        try {
            const requestsRef = collection(database, 'pedido')
            const q = query(requestsRef, where(codeType, '==', user.uid))
            const snapshot = await getDocs(q)
            const requestsData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            console.log('Dados de PEDIDOS===== ', requestsData)
            setRequests(requestsData)

        } catch (error) {
            console.error('Erro ao buscar por suas notificações: ', error)
        }
    }
    let emEntrega = false

    const NewNotification = (isviewemp, isviewent, isempaccept, isentaccept, isfinished) => {
        if (accountType === 'entregador' && isentaccept === 'pendente') {
            return 'Pedido Novo'
        } else if (accountType === 'empreendedor' && isempaccept === 'pendente') {
            return 'Pedido Novo'
        } else if (accountType === 'cliente' && isempaccept === 'aceito' && isentaccept === 'aceito') {
            return 'Aceito'
        } else if (accountType === 'cliente') {
            if (isempaccept === 'recusado' || isentaccept === 'recusado') {
                return 'Recusado'
            }
        } else if (accountType === 'cliente' && isempaccept === 'pendente' && isentaccept === 'pendente') {
            return 'Sob aprovação'
        } else if (isempaccept === 'aceito' && isentaccept === 'aceito' && isfinished === true) {
            return 'Finalizado'
        } else if (accountType === 'entregador' && isempaccept === 'aceito' && isentaccept === 'aceito') {
            emEntrega = true
            return 'Para realizar'
        } else {
            return 'Em processo'
        }
    }

    useEffect(() => {
        queryAbouRequests()
        console.log(requests)
    }, [])

    const NotificationItem = ({ nomeProduto, nomeEmpre, nomeCli, nomeEnt, valorTotal, qtdeprod, imgum, codent, isempaccept, isentaccept, idPedido, codemp, codcli, isviewemp, isviewent, isfinished }) => {
        return (
            <View style={{ marginLeft: 14, marginRight: 13, marginBottom: 10, marginTop: 7, width: 180, height: 180, flexDirection: 'row', borderBottomWidth: 1, padding: 5 }}>
                <Image source={imgum} style={{ width: 120, height: 120, justifyContent: 'center', marginRight: 10 }} />
                <View>
                <Text style={{ marginLeft: 80, color: '#fff', backgroundColor: '#0038FF' }}>{NewNotification(isviewemp, isviewent, isempaccept, isentaccept, isfinished) ? NewNotification(isviewemp, isviewent, isempaccept, isentaccept, isfinished): 'Em processo'}</Text>
                    <Text>{nomeProduto}</Text>
                    {accountType !== 'cliente' &&
                        <Text>Cliente: {nomeCli}</Text>}
                    {accountType !== 'entregador' &&
                        <Text>Entregador: {nomeEnt}</Text>}
                    {accountType !== 'empreendedor' &&
                        <Text>Empreendedor: {nomeEmpre}</Text>}
                    <Text>Valor total: {valorTotal}</Text>
                    <Text>Quantidade: {qtdeprod}</Text>
                    {accountType !== 'cliente' &&
                        <TouchableOpacity onPress={() => {
                            setLocalRequest(nomeProduto, nomeEmpre, nomeCli, nomeEnt, valorTotal, qtdeprod, imgum, codent, isempaccept, isentaccept, idPedido, codemp, codcli, emEntrega, isfinished),
                            accountType === 'empreendedor' ? navigate('RequestApproval') : navigate('DeliveryNotice')
                        }}>
                            <Text style={{ color: '#E65E1A' }}>Ver mais detalhes</Text>
                        </TouchableOpacity>}
                </View>
            </View>
        )
    }

    return (
        <View>
            <>
                <Text style={styles.txtscroll}>Veja pedidos novos e passados</Text>
                <ScrollView style={styles.scrollView}>
                    {requests.map((item, index) => (
                        <React.Fragment key={index + '222222'}>
                            <NotificationItem nomeProduto={item.nomepro} nomeEmpre={item.nomeemp} nomeCli={item.nomecli} nomeEnt={item.nomeent} valorTotal={item.frete + item.subTotal} qtdeprod={item.qtdeprod} imgum={item.imgum} codent={item.codent} isempaccept={item.isempaccept} isentaccept={item.isentaccept} idPedido={item.id} codemp={item.codemp} codcli={item.codcli} isviewemp={item.isviewemp} isviewent={item.isviewent} isfinished={item.isfinished} />
                        </React.Fragment>))}
                </ScrollView>
            </>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})
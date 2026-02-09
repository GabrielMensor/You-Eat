import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'

import React, { useContext, useState, useEffect } from 'react'
import { EntrepreneurProductContext } from '../contexts/userContext'

import { collection, query, getDocs, where, writeBatch, doc } from 'firebase/firestore'
import 'firebase/compat/firestore';
import { database } from '../../fb';

export default function ModelProductEntrepreneur({ navigation: { navigate, replace } }) {

    const { thisProductEnter } = useContext(EntrepreneurProductContext)
    const { setLocalProductEnter } = useContext(EntrepreneurProductContext)

    const [nome, setNome] = useState(thisProductEnter.nome)
    const [preco, setPreco] = useState(thisProductEnter.preco)
    const [descricao, setDescricao] = useState(thisProductEnter.descricao)
    const [qtdeProduto, setQtdeProduto] = useState(thisProductEnter.qtde)

    const [qtdeEncomen, setQtdeEncomen] = useState(0)
    const [simbolo, setSimbolo] = useState('')
    const [balanceColor, setBalanceColor] = useState('#000')
    const [inputVisibility, setInputVisibility] = useState(false)

    const qtdeEncomendas = async () => {
        let newQtde = 0
        try {
            const docsRef = collection(database, 'pedido')
            const theQuery = query(docsRef, where('codpro', '==', thisProductEnter.productId), where('isfinished', '==', false))
            getDocs(theQuery)
                .then((querySnapshot) => {
                    const docs = querySnapshot.docs
                    docs.forEach((doc) => {
                        const qtdeData = doc.data()
                        newQtde += qtdeData.qtdeprod
                        console.log('BOA SOMA: ', newQtde)
                        setQtdeEncomen(newQtde)
                    })
                    setTimeout(() => {
                        if (thisProductEnter.qtde - newQtde < 0) {
                            console.log(1)
                            setSimbolo('')
                            setBalanceColor('#ff0000')
                        } else if (thisProductEnter.qtde - newQtde > 0) {
                            setSimbolo('+')
                            setBalanceColor('#12E900')
                            console.log(thisProductEnter.qtde - qtdeEncomen)
                        }
                    },50)
                })
        } catch (error) {
            console.error(`Erro ao pesquisar pela quantidade de encomendados: ${error}`)
        }
    }
    useEffect(() => {
        /* setQtdeEncomen(0) */
        qtdeEncomendas()
    }, [])

    const handleUpdate = async () => {
        console.log(0)
        try {
            console.log(0.1)
            const batch = writeBatch(database)
            console.log(0.2)
            const theProdRef = doc(database, 'produto', thisProductEnter.productId)
            console.log(1)
            const updatedData = {
                codempre: thisProductEnter.codempre,
                nome: nome,
                imgum: thisProductEnter.imgum,
                preco: preco,
                descricao: descricao,
                qtde: qtdeProduto,
            }
            console.log(2)
            batch.set(theProdRef, updatedData)
            console.log(3)
            await batch.commit()
            console.log(4)

            setInputVisibility(false)
            setLocalProductEnter(thisProductEnter.productId, nome, thisProductEnter.imgum, preco, descricao, qtdeProduto, thisProductEnter.codempre)
            console.log('Dados atualizados com sucesso')
            replace('Home')
        } catch (error) {
            console.error('Erro ao atualizar os dados do usuário: ', error.message)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.productHead}>
                <Image source={thisProductEnter.imgum} style={styles.imgcar} />
                {!inputVisibility &&
                    <Text style={styles.title}>{thisProductEnter.nome}</Text>}
                {inputVisibility &&
                    <TextInput
                        editable
                        onChangeText={text => setNome(text)}
                        placeholder='Novo nome do produto'
                        value={nome}
                        style={styles.inputs}
                    />}
            </View>
            <View style={styles.productHead}>
            <Text style={styles.title}>Preço</Text>
            {!inputVisibility &&
                <Text style={styles.title}>R$ {thisProductEnter.preco}</Text>}
            {inputVisibility &&
                <TextInput
                    editable
                    onChangeText={text => setPreco(text)}
                    placeholder='Novo preço do produto'
                    value={preco}
                    style={styles.inputs}
                />}
            </View>
            <View style={styles.descriptionNameAndData}>
                <Text style={styles.descriptionName}>Descrição do produto: </Text>
                {!inputVisibility &&
                    <Text style={styles.descriptionDataFront}>{thisProductEnter.descricao}</Text>}
                {inputVisibility &&
                    <TextInput
                        editable
                        onChangeText={text => setDescricao(text)}
                        placeholder='Nova descrição do produto'
                        value={descricao}
                        style={styles.inputs}
                    />}
            </View>
            <View style={styles.entrepreneurData}>
                <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>Produzidos: </Text>
                    {!inputVisibility &&
                        <Text style={styles.fieldData}>{thisProductEnter.qtde}</Text>}
                    {inputVisibility &&
                        <TextInput
                            editable
                            onChangeText={text => setQtdeProduto(text)}
                            placeholder='Nova quantidade do produto'
                            value={qtdeProduto}
                            style={styles.inputs}
                        />}
                </View>
                <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>Encomendados: </Text>
                    <Text style={styles.fieldData}>{qtdeEncomen}</Text>
                </View>
                <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>Saldo do estoque: </Text>
                    <Text style={{ color: balanceColor }}>{simbolo} {thisProductEnter.qtde - qtdeEncomen}</Text>
                </View>
            </View>
            {inputVisibility &&
                <TouchableOpacity style={styles.buyBtn} onPress={() => handleUpdate()}>
                    <Text style={{ color: '#fff' }}>CONFIRMAR ALTERAÇÕES</Text>
                </TouchableOpacity>}
            {!inputVisibility &&
                <>
                    <TouchableOpacity style={styles.buyBtn} onPress={() => setInputVisibility(true)}>
                        <Text style={{ color: '#fff' }}>ALTERAR DADOS</Text>
                    </TouchableOpacity>
{/*                     <TouchableOpacity style={styles.delBtn} onPress={() => { }}>
                        <Text>EXCLUIR PRODUTO</Text>
                    </TouchableOpacity> */}
                </>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
    },
    imgcar: {
        height: 150,
        width: 150,
        borderRadius: 180,
    },
    productHead: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        marginTop: 20,
        color: '#000',
        fontSize: 25,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    descriptionNameAndData: {
        width: 350,
        borderWidth: 3,
        marginTop: 10,
        padding: 3,
        marginLeft: 1,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 150,
        borderWidth: 1,
    },
    delBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        width: '100%',
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 5,
        backgroundColor: '#933100',
    },
    buyBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        width: '100%',
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 5,
        backgroundColor: '#1A4FE6'
    },
    entrepreneurData: {
        flexDirection: 'column',
        height: 150,
        borderWidth: 2,
        marginTop: 5,
        padding: 9,
    },
    imgpen: {
        height: 30,
        width: 30,
    },
    nameAndData: {
        flexDirection: 'row'
    },
    inputs: {
        borderWidth: 1,
        marginTop: 3,
        marginBottom: 3,
        marginRight: 5,
        padding: 4,
        borderRadius: 10,
        width: 190,
    },
})
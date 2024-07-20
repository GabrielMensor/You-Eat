import { collection, query, getDocs, querySnapshot, where } from 'firebase/firestore'
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { database } from '../../fb'
import { useContext, useEffect, useState } from 'react'

import { CartContext } from '../contexts/userContext'

export default function ModelProduct({ navigation: { navigate }, route }) {
    // Pegando variaveis vindas como props do produto
    const productId = route.params.productId
    const nome = route.params.nome
    const imgum = route.params.imgum
    const preco = route.params.preco
    const descricao = route.params.descricao
    const qtde = route.params.qtde
    const codempre = route.params.codempre

    const [idenEnter, setIdenEnter] = useState()
    const [nomeEnter, setNomeEnter] = useState()
    const [emailEnter, setEmailEnter] = useState()
    const [ruaEnter, setRuaEnter] = useState()
    const [bairroEnter, setBairroEnter] = useState()
    const [cidadeEnter, setCidadeEnter] = useState()
    const [estadoEnter, setEstadoEnter] = useState()
    const [nascitaEnter, setNascitaEnter] = useState()
    const [descricaoEnter, setDescricaoEnter] = useState()

    const [qtdePedido, setQtdePedido] = useState()

    const { cart } = useContext(CartContext)
    const { SetLocalCart } = useContext(CartContext)

    const searchForEntrepreneur = async () => {
        const entreRef = collection(database, 'empreendedor')
        const q = query(entreRef, where("uid", '==', codempre))

        try {
            getDocs(q)
                .then((querySnapshot) => {
            const docs = querySnapshot.docs
            docs.forEach((doc) => {
                const empreData = doc.data()
                console.log(empreData)
                if (empreData) {
                    setIdenEnter(empreData.uid)
                    setNomeEnter(empreData.nome)
                    setEmailEnter(empreData.email)
                    setRuaEnter(empreData.rua)
                    setBairroEnter(empreData.bairro)
                    setCidadeEnter(empreData.cidade)
                    setEstadoEnter(empreData.estado)
                    setNascitaEnter(empreData.datanasc)
                    setDescricaoEnter(empreData.descricao)
                }
            })
        })
} catch (error) {
    console.log(error)
    console.log('Algo de errado aconteceu')
}}
useEffect(() => {
    searchForEntrepreneur()
}, [])

function addToCart() {      // contexto criado e fazer modificações no contexto
    function isFloat(x) {
        if(!isNaN(x)) {
            if(parseInt(x) !== parseFloat(x)) {
                    return true;
          }
        }   
        return false;
    }

    if((qtdePedido < 2) || (isFloat(qtdePedido)) || (isNaN(qtdePedido))) {
        console.log('Valor inválido. Peça um número inteiro e maior que 1')
        return
    }
    const item = {
        productId: productId,
        nome: nome,
        imgum: imgum,
        preco: preco,
        qtdePedido: qtdePedido,
        idenEnter: idenEnter,
        nomeEnter: nomeEnter,
        addressEnter: `${ruaEnter} - ${bairroEnter} - ${cidadeEnter} - ${estadoEnter}`,
    }
    console.log(item)
    const chamada = SetLocalCart(item)
    if (chamada === 'existe') {
        return
    }
    else if (chamada === 'novo'){
        console.log(cart)
        navigate('Cart')
    } else {
        console.log('Algo de errado aconteceu')
    }
}

return (
    <ScrollView style={styles.container}>
        <View style={styles.productHead}>
            <Image
                source={imgum} style={styles.imgcar}></Image>
            <Text style={styles.title}>{nome}</Text>
        </View>
        <Text style={styles.descriptionName}>Disponível {qtde} unidades</Text>
        <Text style={styles.title}>R$ {preco}</Text>
        <TouchableOpacity style={styles.buyBtn} onPress={() => addToCart()}>
            <Text style={{ color: '#fff' }}>ADICIONAR AO CARRINHO</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
            <TextInput
                editable
                onChangeText={text => setQtdePedido(text)}
                value={qtdePedido}
                style={styles.inputs}
                keyboardType={'numeric'}
                maxLength={3}
            />
            <Text style={{ marginTop: 10 }}>Quantidade (veja a descrição do produto)</Text>
            </View>
        <View style={styles.descriptionNameAndData}>
            <Text style={styles.descriptionName}>Descrição do produto: </Text>
            <Text style={styles.descriptionDataFront}>{descricao}</Text>
        </View>
        <View style={styles.entrepreneurData}>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Empreendedor: </Text>
                <Text style={styles.fieldData}>{nomeEnter}</Text>
                <Text></Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Descrição: </Text>
                <Text style={styles.fieldData}>{descricaoEnter}</Text>
                <Text></Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>E-mail: </Text>
                <Text style={styles.fieldData}>{emailEnter}</Text>
                <Text></Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Rua: </Text>
                <Text style={styles.fieldData}>{ruaEnter}</Text>
                <Text></Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Bairro: </Text>
                <Text style={styles.fieldData}>{bairroEnter}</Text>
                <Text></Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Cidade - UF: </Text>
                <Text style={styles.fieldData}>{cidadeEnter} - {estadoEnter}</Text>
                <Text></Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Há: </Text>
                <Text style={styles.fieldData}>{nascitaEnter} anos no YouCook</Text>
            </View>
        </View>
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
        width: 340,
        borderWidth: 3,
        marginTop: 10,
        padding: 3,
        marginLeft: 5,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 150,
        borderWidth: 1,
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
        height: 400,
        borderWidth: 2,
        marginTop: 5,
        padding: 9,
        width: 340,
        marginLeft: 5,
    },
    inputs: {
        borderWidth: 1,
        marginTop: 3,
        marginBottom: 3,
        marginRight: 5,
        padding: 4,
        borderRadius: 10,
        width: 35
    },
})
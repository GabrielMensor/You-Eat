import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Modal from 'react-native-modal';

import { UserContext, CartContext } from '../contexts/userContext'
import React, { useContext, useEffect, useState, useMemo } from 'react'
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { database } from '../../fb';

export default function ModelRequests({ navigation: { navigate, replace }, route }) {
    const { user } = useContext(UserContext)
    const { cart } = useContext(CartContext)
    const { removeCartsItens } = useContext(CartContext)
    const { deleteCart } = useContext(CartContext)
    const { totalValue } = useContext(CartContext)
    const { setTotalValue } = useContext(CartContext)

    const [finishTotal, setFinishTotal] = useState()

    const [shipping, setShipping] = useState()
    const [theDeliveryman, setTheDeliveryman] = useState({})


    const [subTotal, setSubTotal] = useState(0)

    const enterIdenArray = cart.map(objeto => objeto.idenEnter)
    console.log(enterIdenArray)

    let newCart = []
    let newnewCart = []
    function newsCart() {
        cart.map((item, index) => (
            newCart.push(item.addressEnter)
        ))
        console.log(newCart)
        for (let value of newCart) {
            console.log(value)
            if (newnewCart.includes(value)) {
                continue
            } else {
                newnewCart.push(value)
                console.log('Chegando aqui ', newnewCart)
            }
        }
    }
    newsCart()

    if (Object.keys(cart).length === 0) {
        alert('Seu pedido está vazio. Compre algo para finalizar')
        navigate('Home', { itensnumber: 0 })
    }

    const deliver = route.params.deliver
    useEffect(() => {
        totalsub = totalValue
        setSubTotal(totalsub)
        calculateShipping()
        researchDeliveryman()
        console.log('SUBTOTAL',subTotal)
    }, [])

    let contador = 0
    let values = 0
    function calculateShipping() {
        if (!deliver) {
            setShipping(0)
            setFinishTotal(Math.round(100 * totalValue) / 100)
            return
        }
        let arrayShipping = []
        cart.map((item) => {
            let itemShipping = Math.round(100 * (item.qtdePedido * item.preco / 10)) / 100
            console.log('PARTE ================================',itemShipping)
            if (!arrayShipping.includes(itemShipping)) {
                arrayShipping.push(itemShipping)   
            }
            for (let value of arrayShipping) {
                contador += value
                arrayShipping.splice(arrayShipping.indexOf(value), 1)
            }
            contador = Math.round(contador * 100) / 100
            console.log('CONTADOR======', contador)
        })
        setShipping(contador)
        const totaltemp = Math.round(100 * (totalValue + contador)) / 100
        setFinishTotal(totaltemp)
    }

    let deliverymanData = []
    async function researchDeliveryman() {
        const delivermanRef = collection(database, 'entregador')
        const q = query(delivermanRef, where('isavailable', '==', true))

        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            let array = [doc.id, doc.data().nome, doc.data().placa, doc.data().datanasc, doc.data().email, doc.data().uid]
            deliverymanData.push(array)
        })
        let thheDeliveryman = deliverymanData[0]
        console.log('dentro==', thheDeliveryman)
        setTheDeliveryman(thheDeliveryman)
    }

    const [isCancelModal, setIsCancelModal] = useState(false)

    const dataagora = new Date()
    console.log(dataagora)

    function newRequest (item){
        return{
            codcli: user.uid,
            codemp: item.idenEnter,
            codent: theDeliveryman[5],
            codpro: item.productId,
            nomepro: item.nome,
            nomecli: user.nome,
            nomeemp: item.nomeEnter,
            nomeent: theDeliveryman[1],
            imgum: item.imgum,
            data: dataagora,
            isviewcli: false,
            isentaccept: 'pendente',
            isviewemp: false,
            isempaccept: 'pendente',
            isviewent: false,
            isfinished: false,
            qtdeprod: parseInt(item.qtdePedido),
            subTotal: Math.round(totalValue),
            frete: deliver ? Math.round((item.qtdePedido * item.preco/10) * 100) / 100 : 0
        }
      };

    async function finalizarPedido() {
      cart.forEach(async (item) => {
        console.log(1)
        const cartItem = newRequest(item)
        console.log(2)
        console.log(cartItem)
        console.log(3)
        try {
          const docRef = await addDoc(collection(database, 'pedido'), cartItem);
          alert('Pedido cadastrado com sucesso \n Seu pedido pode ser aprovado em até 1 hora')
          setTimeout(() => {
            deleteCart()
          }, 100)
          navigate('Home', { itensnumber: 0 })
        } catch (error) {
          console.error('Erro ao adicionar documento: ', error);
        }
      });
    }

    function cancelModal() {
        return (
            <Modal
                isVisible={isCancelModal}
                backdropOpacity={0.85}
                style={{ margin: 0, height: '100%', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', color: '#fff' }}
                propagateSwipe={true}
            >
                <Text style={{ color: '#fff' }}>Você tem certeza que deseja cancelar este pedido</Text>
                <Text style={{ color: '#fff' }}>Se ele for cancelado, o carrinho será esvaziado</Text>


                <TouchableOpacity onPress={() => setIsCancelModal(false)} style={styles.continuebtn}>
                    <Text style={{ color: '#fff' }}>Continuar pedido</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => cancelRequest()} style={styles.cancelrequestbtn}>
                    <Text style={{ color: '#fff' }}>Cancelar pedido</Text>
                </TouchableOpacity>
            </Modal>
        )
    }

    function cancelRequest() {
        deleteCart()
        replace('Home', { itensnumber: 0 })
    }

    const uniqueNames = {}
    const filteredData = cart.filter(item => {
        if (uniqueNames[item.nomeEnter]) {
            return false
        } else {
            uniqueNames[item.nomeEnter] = item.nomeEnter
            return true
        }
    })
    unique = Object.values(uniqueNames)

    return (
        <View style={styles.container}>
            {cancelModal()}
            <View style={styles.bigHeader}>
                <Text style={styles.textHeader}>Meu Pedido</Text>
            </View>
            <View style={styles.boxContainer}>
                <View style={styles.textEachRequest}>
                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>Nome do cliente: {user.nome}</Text>
                    </View>
                    <View style={styles.nameAndData}>
                        <Text style={styles.fieldName}>Empreendedor(es) pedido(s): </Text>
                        <Text>{unique[0]}{'\n'}{unique[1]}{'\n'}{unique[2]}{'\n'}{unique[3]}</Text>
                    </View>
                </View>
            </View>
            <FlatList
                data={cart}
                renderItem={({ index, item }) => {
                    let value = 0
                    if (itensnumber !== 0) {
                        cart.map((item) => {
                            let precoVez = parseFloat(item.preco)
                            let qtdeVez = parseFloat(item.qtdePedido)
                            value += precoVez * qtdeVez
                            value = Math.round(value * 100) / 100
                        })
                    } else {
                        value = 0
                    }

                    return (
                        <View style={styles.productSeccion}>
                            <Image source={item.imgum} style={styles.imgcar} />
                            <View style={{ marginTop: 10, width: 160 }}>
                                <Text>{item.nome}</Text>
                                <Text>{item.qtdePedido} x R$ {item.preco}</Text>
                                <Text>R$ {Math.round(item.qtdePedido * item.preco * 100) / 100}</Text>
                            </View>
                            <TouchableOpacity onPress={() => removeCartsItens(index)}>
                                <Icon name='trash' size={25} color={'red'} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
                keyExtractor={(item) => item.productId}
            >


            </FlatList>
            <View>
                {deliver &&
                    <View style={styles.deliverContainer}>
                        <Text>Modelo de entrega: Entregadores YouCook</Text>
                        <Text>Nome do entregador: {theDeliveryman[1]}</Text>
                        <Text>Placa do veículo: {theDeliveryman[2]}</Text>
                        <Text>Idade: DATANASC{theDeliveryman[3]}</Text>
                        <Text>E-mail: {theDeliveryman[4]}</Text>
                    </View>}
                {!deliver &&
                    <View style={styles.autoClientContainer}>
                        <Text>Modelo de entrega: Busca no local</Text>
                        <Text>Endereço(s)</Text>
                        {newnewCart.map((item, index) => (
                            <Text key={index}>{index + 1}. {item}</Text>
                        ))}
                    </View>
                }
                <View style={styles.finalRequest}>
                    <Text>Sub-total: R$ {totalValue ? totalValue : '0,00'}</Text>
                    <Text>Frete: R$ {shipping ? shipping : '0,00'}</Text>
                    <Text>Total: R$ {finishTotal ? finishTotal : '0,00'}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.buyBtn} onPress={() => finalizarPedido()}>
                <Text style={{ color: '#fff' }}>FINALIZAR PEDIDO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => { setIsCancelModal(true) }}>
                <Text style={{ color: '#fff' }}>CANCELAR PEDIDO</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',


    },
    boxContainer: {
        alignItens: 'center',
        marginLeft: 10,
    },
    textBody: {
        width: 350,
        alignItems: 'center',
    },
    imgcar: {
        height: 100,
        width: 100,
        borderRadius: 180,
        marginRight: 7,
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
    cancelBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        width: '100%',
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 5,
        backgroundColor: '#933100',
    },
    bigHeader: {
        marginBottom: 20,
        borderWidth: 1,
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E65E1A'
    },
    textHeader: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: '500',
        color: '#fff'
    },
    productSeccion: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        marginLeft: 10,
        padding: 10,
        width: 310,
        height: 120,
    },
    continuebtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 100,
        borderWidth: 1,
        backgroundColor: '#1A4FE6'
    },
    cancelrequestbtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 100,
        borderWidth: 1,
        backgroundColor: '#f0000f'
    },
    nameAndData: {
        maxWidth: '100%',
        marginBottom: 10,
    },
    autoClientContainer: {
        marginHorizontal: 15,
    },
    finalRequest: {
        marginTop: 20,
    }
})
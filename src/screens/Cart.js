import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';

import { CartContext } from '../contexts/userContext'
import { useContext, useEffect, useState } from 'react'

export default function Cart({ navigation: { navigate } }) {
    const [modalVisibility, setModalVisibility] = useState(false)
    const [deliver, setDeliver] = useState(true)

    const { cart } = useContext(CartContext)
    const { removeCartsItens } = useContext(CartContext)
    const { totalValue } = useContext(CartContext)
    const { setTotalValue } = useContext(CartContext)

    useEffect(() => {
        if (itensnumber === 0) {
            setTotalValue(0)
        }
    })

    let itensnumber = Object.keys(cart).length
    console.log(cart)

    return (
        <View style={styles.container}>
            <Modal
            isVisible={modalVisibility}
            backdropOpacity={0.85}
            style={{margin: 0, height: '100%', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center', color: '#fff'}}
            propagateSwipe={true}
            >
                <Text style={{ color: '#fff'}}>Como você gostaria de receber sua encomenda?</Text>
                <RadioButton.Item
                    label='Entregadores YouCook'
                    labelStyle={{ color: '#fff'}}
                    style={{ margin: 0 }}
                    value={true}
                    status={deliver === true ? 'checked' : 'unchecked'}
                    onPress={() => setDeliver(true)}
                />
                <RadioButton.Item
                    label='Buscar no local'
                    labelStyle={{ color: '#fff'}}
                    style={{ margin: 0 }}
                    value={false}
                    status={deliver === false ? 'checked' : 'unchecked'}
                    onPress={() => setDeliver(false)}
                />
                <TouchableOpacity style={styles.btn} onPress={() => navigate('ModelRequests', { deliver }) && console.log(deliver) && setModalVisibility(false)}>
                    <Text>Confirmar escolha</Text>
                </TouchableOpacity>
            </Modal>
            <View style={styles.cartHeader}>
                <Text style={styles.textHeader}>Meu Carrinho</Text>
            </View>
            <Text style={styles.txt}>{Object.keys(cart).length === 0 ? 'O carrinho está vazio!' : 'Veja os elementos do seu carrinho'}</Text>
            <FlatList
                data={cart}
                renderItem={({ index, item }) => {
                    let value = 0
                    if (itensnumber !== 0) {
                        cart.map((item) => {
                            let precoVez = parseFloat(item.preco)
                            let qtdeVez = parseFloat(item.qtdePedido)
                            console.log('Quantos há: ', qtdeVez)
                            value += precoVez * qtdeVez
                            console.log(item.preco, value)
                            value = Math.round(value * 100) / 100
                        })
                    } else {
                        value = 0
                    }

                    setTimeout(() => {
                        setTotalValue(value)
                    }, 300);

                    return (
                        <View style={styles.productSeccion}>
                            <Image source={item.imgum} style={styles.imgcar} />
                            <View style={{ marginTop: 10, width: 160 }}>
                                <Text>{item.nome}</Text>
                                <Text>{item.nomeEnter}</Text>
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
            <Text>Valor do carrinho: R$ {totalValue}</Text>
{totalValue!==0 &&            
            <TouchableOpacity style={styles.buyBtn} onPress={() => setModalVisibility(true)}>
                <Text style={{ color: '#fff' }}>FAZER PEDIDO</Text>
            </TouchableOpacity>}
            <TouchableOpacity style={styles.buyBtn} onPress={() => navigate('Home', { itensnumber })}>
                <Text style={{ color: '#fff' }}>CONTINUAR COMPRANDO</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    txt: {
        flex: 1,
        marginTop: 20,
        color: '#000',
        fontSize: 22,
        fontWeight: '700',
        alignItems: 'center',
        justifyContent: 'center',
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
    imgcar: {
        height: 100,
        width: 100,
        borderRadius: 180,
        marginRight: 7,
    },
    productSeccion: {
        flexDirection: 'row',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        width: 310,
        height: 120,
    },
    cartHeader: {
        marginBottom: 50,
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
        color: '#fff',
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 100,
        borderWidth: 1,
        backgroundColor: '#1A4FE6'
    },
})
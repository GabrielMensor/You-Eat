import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFive from 'react-native-vector-icons/FontAwesome5'

import { useNavigation } from '@react-navigation/native';

import React, { useContext, useState, useEffect, useCallback } from 'react';
import { UserContext } from '../contexts/userContext';
import { CartContext } from '../contexts/userContext';
import { EntrepreneurProductContext } from '../contexts/userContext'
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';

import { database } from '../../fb';

const illustrativeImages = [
    require('../../assets/ProductPictures/brigadeiro.jpg'),     // 7    10
    require('../../assets/ProductPictures/pastel.jpg'),         // 8    11
    require('../../assets/ProductPictures/boloTorta1.jpg'),     // 9    12
    require('../../assets/ProductPictures/coxinha.jpg'),        // 16   13
    require('../../assets/ProductPictures/beijinho.jpg')        // 17   14
]

export default function Home({ navigation: { navigate }, route }) {

    const { user } = useContext(UserContext)
    const { cart } = useContext(CartContext)
    const { setLocalProductEnter } = useContext(EntrepreneurProductContext)

    const accountType = user.tipoConta

    function handleAccountTypeScreen(accountType) {
        switch (accountType) {
            case 'cliente':
                navigate('ModelClient')
                break
            case 'empreendedor':
                navigate('ModelEntrepreneur')
                break
            case 'entregador':
                navigate('ModelDeliveryman')
                break
            default:
                console.error('Algo de errado aconteceu com o tipo de conta')
        }
    }

    function IconNumberItem() {
        return (
            <View style={{ height: 24, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ margin: 0, padding: 0 }}>{(route.params.itensnumber !== 0) ? itensnumber = route.params.itensnumber : itensnumber = 0}</Text>
            </View>
        )
    }

    console.log(Object.keys(cart.length))
    let marleft = 0
    accountType === 'empreendedor' ? marleft = 0 : marleft = 17
    let paddHor = 0
    accountType === 'empreendedor' ? paddHor = 2 : paddHor = 0

    const AllProductItem = ({ nome, imgum, preco, descricao, qtde, codempre, productId }) => {
        return (
            <TouchableOpacity style={{ marginLeft: marleft, maxWidth: 120 }} onPress={() => {
                accountType !== 'empreendedor' ?
                navigate('ModelProduct', {
                    productId: productId,
                    nome: nome,
                    imgum: imgum,
                    preco: preco,
                    descricao: descricao,
                    qtde: qtde,
                    codempre: codempre,
                }) :
                (setLocalProductEnter(productId, nome, imgum, preco, descricao, qtde, codempre),
                    navigate('ModelProductEntrepreneur'))
            }}>
                {accountType !== 'empreendedor' ? <Image source={imgum} style={{ width: 115, height: 115, justifyContent: 'center' }} /> : <Image source={imgum} style={{ width: 120, height: '30%', justifyContent: 'center' }} />}
                <View style={{ height: 70, paddingHorizontal: paddHor }}>
                    <Text>{nome}</Text>
                    <Text>R$ {preco}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    // Código para a primeira fileira
    // Cria uma variável de estado para armazenar os produtos
    const [allProducts, setAllProducts] = useState([])

    // Cria uma função assíncrona para buscar todos os produtos do banco de dados
    const productList = async () => {
        try {
            const productRef = collection(database, 'produto')
            const allTheProducts = query(productRef)
            const snapshot = await getDocs(allTheProducts)
            const productData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setAllProducts(productData)
        } catch (err) {
            console.log(err)
        }
    }
    // Chamar a função productList quando o componente for montado
    useEffect(() => {
        productList()
    }, [])


    // Código para a segunda fileira

    const [secondProducts, setSecondProducts] = useState([])

    const secondProductList = async () => {
        try {
            const productRef = collection(database, 'produto')
            const secondProducts = query(productRef, orderBy('nome'))
            const snapshot = await getDocs(secondProducts)
            const productData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setSecondProducts(productData)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        secondProductList()
    }, [])

    // Código para a terceira fileira
    const [thirdProducts, setThirdProducts] = useState([])

    const thirdProductList = async () => {
        try {
            const productRef = collection(database, 'produto')
            const thirdProducts = query(productRef, orderBy('preco'))
            const snapshot = await getDocs(thirdProducts)
            const productData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            setThirdProducts(productData)
        } catch (err) {
            console.log(err)
        }
    }

    // Chamar a função productList quando o componente for montado
    useEffect(() => {
        thirdProductList()
    }, [])

    const [productEnter, setProductEnter] = useState([])
    const productDocumentByEmper = async () => {
        console.log(1)
        try {
            console.log(2)
            const q = query(collection(database, 'produto'), where('codempre', '==', user.uid))
            console.log(3)
            const querySnapshot = await getDocs(q);
            console.log(4)
            const enterProductData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }))
            console.log(5)
            console.log(enterProductData)
            setProductEnter(enterProductData)
        } catch (error) {
            console.error('Erro ao importar produtos do empreendedor: ', error)
        }
    }
    useEffect(() => {
        setTimeout(() => {
            productDocumentByEmper()
        }, 100)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.cartHeader}>
                <Text style={styles.textHeader}>YouCook</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {accountType === 'cliente' &&
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 38,
                        width: 110,
                        borderWidth: 1,
                    }}>
                        <Icon name="cart" size={38} style={{ marginRight: 12 }} onPress={() => navigate('Cart')} />
                        {IconNumberItem()}
                    </TouchableOpacity>}

                {accountType !== 'empreendedor' &&
                    <TouchableOpacity style={styles.btnicon} onPress={() => handleAccountTypeScreen(accountType)}>
                        <Icon name="person-circle" size={38} />
                    </TouchableOpacity>}
                <TouchableOpacity style={styles.btnicon} onPress={() => { }}>
                    <IconFive name="bell" size={30} onPress={() => navigate('NotificationScreen')}></IconFive>
                </TouchableOpacity>
                {accountType === 'empreendedor' &&
                    <>
                        <TouchableOpacity style={styles.btnicon} onPress={() => handleAccountTypeScreen(accountType)}>
                            <Icon name="person-circle" size={38} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnicon} onPress={() => navigate('ProductRegistration')}>
                            <Icon name="ios-add" size={38} />
                        </TouchableOpacity>
                    </>}
            </View>
            {accountType !== 'empreendedor' &&
                <ScrollView vertical={true} horizontal={false}>
                    <Text style={{ marginTop: 15 }}>Bem-vindo {user.nome}</Text>
                    <>
                        <Text style={styles.txtscroll}>Tudo no YouCook</Text>
                        <ScrollView horizontal={true} style={styles.scrollView}>
                            {allProducts.map((product, index) => (
                                <React.Fragment key={index + '222222'}>
                                    <AllProductItem nome={product.nome} imgum={product.imgum} preco={product.preco} productId={product.id} descricao={product.descricao} qtde={product.qtde} codempre={product.codempre} key={product.productId + "allPorduct"} />
                                </React.Fragment>))}
                        </ScrollView>
                    </>

                    <>
                        <Text style={styles.txtscroll}>Mais para você</Text>
                        <ScrollView horizontal={true} style={styles.scrollView}>
                            {secondProducts.map((product, index) => (
                                <React.Fragment key={index + '121212'}>
                                    <AllProductItem nome={product.nome} imgum={product.imgum} preco={product.preco} productId={product.id} descricao={product.descricao} qtde={product.qtde} codempre={product.codempre} key={product.productId + "secondProduct"} />
                                </React.Fragment>))}
                        </ScrollView>
                    </>
                    <>
                        <Text style={styles.txtscroll}>Com preço baixo!</Text>
                        <ScrollView horizontal={true} style={styles.scrollView}>
                            {thirdProducts.map((product, index) => (
                                <React.Fragment key={index + '202020'}>
                                    <AllProductItem nome={product.nome} imgum={product.imgum} preco={product.preco} productId={product.id} descricao={product.descricao} qtde={product.qtde} codempre={product.codempre} key={product.productId + "thirdProduct"} />
                                </React.Fragment>))}
                        </ScrollView>
                    </>
                </ScrollView>}
            {accountType === 'empreendedor' &&
                <>
                    <Text style={{ marginTop: 15 }}>Bem-vindo {user.nome}</Text>
                    <Text style={styles.txtmyproducts}>Meus produtos</Text>
                    <View style={styles.scrollViewEnter}>
                        {productEnter.map((product, index) => (
                            <React.Fragment key={index + '202020'}>
                                <AllProductItem nome={product.nome} imgum={product.imgum} preco={product.preco} productId={product.id} descricao={product.descricao} qtde={product.qtde} codempre={product.codempre} key={product.productId + "enterProduct"} />
                            </React.Fragment>))}
                    </View>
                </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        flex: 1,
        marginTop: 20,
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        marginBottom: 5,
        width: 250,
        height: 5,
    },
    body: {
        height: 150,
        marginBottom: 54,
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 100,
        borderWidth: 1,
    },
    imgcar: {
        height: 110,
        width: 125,
    },
    elemento: {
        flex: 1,
        justifyContent: 'center',
        width: 150,
        height: 160,
    },
    btnicon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 38,
        width: 38,
        borderWidth: 1,
    },
    scrollView: {
        backgroundColor: '#f0f0f0',
        height: 170,
        marginLeft: 20,
    },
    scrollViewEnter: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    filho: {
        backgroundColor: '#fff',
        width: 100,
        height: 100,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txtscroll: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        marginRight: 150,
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 15,
    },
    txtmyproducts: {
        marginRight: 150,
        fontSize: 30,
        fontWeight: 'bold',
        paddingVertical: 12
    },
    cartHeader: {
        borderWidth: 1,
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E65E1A'
    },
    textHeader: {
        marginTop: 27,
        marginRight: 200,
        fontSize: 25,
        fontWeight: '500',
        color: '#fff',
    },
});
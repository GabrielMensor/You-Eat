import { View, StyleSheet, Text, TouchableOpacity, TextInput, Image, LogBox, ScrollView } from 'react-native'
import Modal from 'react-native-modal';
import { useContext, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { database } from '../../fb';
import { collection, addDoc } from 'firebase/firestore';

import { UserContext } from '../contexts/userContext';


LogBox.ignoreLogs([`Setting a timer for a long period`]);     // Evita avisos irritantes de que foi definido um cronometro para um periodo muito grande

const illustrativeImages = [                                 // Importa as imagens para cadastro
    require('../../assets/ProductPictures/brigadeiro.jpg'),     // 7    10
    require('../../assets/ProductPictures/pastel.jpg'),         // 8    11
    require('../../assets/ProductPictures/boloTorta1.jpg'),     // 9    12
    require('../../assets/ProductPictures/coxinha.jpg'),        // 16   13
    require('../../assets/ProductPictures/beijinho.jpg')        // 17   14
]

export default function ProductRegistration({ navigation: { navigate, replace } }) {
    const [nome, setNome] = useState('')
    const [descricao, setDescricao] = useState('')
    const [qtde, setQtde] = useState('')
    const [preco, setPreco] = useState('')
    const [imgum, setImgUm] = useState('')
    const [modalVisibility, setModalVisibility] = useState(false)
    const [returnModalVisibility, setReturnModalVisibility] = useState(false)

    const { user } = useContext(UserContext)
    const codempree = user.uid
    const accountType = user.tipoConta

    const navigation = useNavigation();

    useEffect(() => {
        accountType !== 'empreendedor' ? setReturnModalVisibility(true) : setReturnModalVisibility(false)
        console.log('useEffect lido')
    }, [])


    const showImageSelection = () => {
        setModalVisibility(true)
    }
    const imageSelection = () => {
        return (
            <Modal
                isVisible={modalVisibility}
                onBackdropPress={() => setModalVisibility(false)}
                backdropOpacity={0.85}
                style={{ margin: 0, height: '100%', width: '100%' }}
                propagateSwipe={true}
            >
                <ScrollView>
                    <Text style={styles.titleModal}>Escolha a imagem para seu produto</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {illustrativeImages.map((img, i) => (
                            <TouchableOpacity key={i} onPress={() => { setImgUm(img); setModalVisibility(false); console.log(img) }}>
                                <Image style={styles.ProductImageExample} source={img} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => setModalVisibility(false)} style={styles.cancelbtn}>
                        <Text>Cancelar</Text>
                    </TouchableOpacity>
                </ScrollView>
            </Modal>
        )
    }

    const ProductRegistrationFunction = async () => {   // Cadastrar produto no banco de dados
        if (nome.trim() === '') {
            console.error('Nome é uma variável vazia')
            return;
        } else if (descricao.trim() === '') {                               // {/* productImg */}
            console.error('Descrição é uma variável vazia')
            return;
        } else if (qtde.trim() === '') {
            console.error('Quantidade é uma variável vazia')
            return;
        } else if (preco.trim() === '') {
            console.error('Preço é uma variável vazia')
            return;
        } else if (!imgum) {
            console.error('Imagem é uma variável vazia')
            return;
        } else if (!codempree) {
            console.error('Imagem é uma variável vazia')
            return;
        }

        const newProduct = {
            nome: nome,
            descricao: descricao,
            qtde: qtde,
            preco: preco,
            imgum: imgum,
            codempre: codempree,
        }

        await addDoc(collection(database, 'produto'), newProduct)
        alert('Cadastro efetuado com SUCESSO')
        replace('Home', { itensnumber, shouldUpdate: true })
    }


    return (
        <View style={styles.container}>
            <Modal
                isVisible={returnModalVisibility}
                backdropOpacity={0.85}
                style={{ margin: 0, height: '100%', width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}
                propagateSwipe={true}
            >
                <Text style={{ color: 'white', marginBottom: 10 }}>Você não tem permissão para estar nessa tela</Text>
                <TouchableOpacity onPress={() => navigate('Home', { itensnumber })} style={styles.btnModal}>
                    <Text>Voltar para Home</Text>
                </TouchableOpacity>
            </Modal>
            <Text style={styles.title}>YouCook</Text>

            {imgum ? (
                <Image source={imgum} style={styles.productImg} />
            ) : (
                <Image source={require('../../assets/ProductPictures/vazioFotoProduto.png')} style={styles.productImg} />
            )}

            <TextInput placeholder='Digite o nome do produto...' style={styles.input} onChangeText={text => setNome(text)} value={nome}></TextInput>
            <TextInput placeholder='Apresente uma breve descrição do produto...' style={styles.textArea} onChangeText={text => setDescricao(text)} value={descricao} multiline numberOfLines={5}></TextInput>
            <TextInput placeholder='Quantidade em estoque' style={styles.input} onChangeText={text => setQtde(text)} value={qtde}></TextInput>
            <TextInput placeholder='Preço' style={styles.input} onChangeText={text => setPreco(text)} value={preco}></TextInput>
            <TouchableOpacity style={styles.btnImg} onPress={showImageSelection}>
                <Text style={styles.txtBtnImg}>Selecione uma imagem ao produto</Text>
            </TouchableOpacity>

            {imageSelection()}

            <TouchableOpacity style={styles.buyBtn} onPress={() => { ProductRegistrationFunction() }}>
                <Text style={{ color: '#fff' }}>Cadastrar produto</Text>
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
        fontWeight: '500',
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
        backgroundColor: '#1A4FE6',
        padding: 5,
    },
    title: {
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
        color: '#000',
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleModal: {
        marginTop: 25,
        marginBottom: 25,
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 40
    },
    input: {
        height: 58,
        width: 313,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        padding: 5,
    },
    textArea: {
        width: 313,
        height: 133,
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 10,
        padding: 5,
    },
    btnImg: {
        height: 58,
        width: 313,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 35,
        justifyContent: 'center'
    },
    txtBtnImg: {
        color: '#9E8E9E',
    },
    productImg: {
        height: 80,
        width: 80,
        borderRadius: 180,
        marginBottom: 10,
    },
    ProductImageExample: {
        flex: 2,
        height: 100,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '30%',
        marginBottom: 10,
    },
    cancelbtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 5,
        backgroundColor: '#ff0000',
        padding: 15,
        marginHorizontal: 10,
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
})
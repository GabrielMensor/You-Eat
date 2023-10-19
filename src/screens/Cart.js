import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'

export default function Cart({ navigation: {navigate}}) {
    let nrelementos = 0
    return(
        <View style={styles.container}>
            <Text style={styles.txt}>{nrelementos===0?'O carrinho está vazio!':'Veja os elementos do seu carrinho'}</Text>
            <TouchableOpacity style={styles.buyBtn} onPress={() => navigate('ModelRequests')}>
                <Text>FAZER PEDIDO</Text>
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
        backgroundColor: '#0BDE6E',
    },
})
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function ModelRequests( { navigation: {navigate}} ) {
    function finalizarPedido() {
        alert('Seu pedido foi enviado para análise do empreendedor.\nEspera estima 1 hora')
        navigate('Home')
    }

    return(
        <ScrollView>
            <View style={styles.boxContainer}>
        <View style={styles.textEachRequest}>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Nome do cliente: </Text>
                <Text style={styles.fieldData}>Rui Barbosa</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Empreendedor pedido: </Text>
                <Text style={styles.fieldData}>Machado Doces</Text>
            </View>
            <Image
            source={{ uri: 'https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/1a884bcbc5b04d71476d2995d51d0140.webp?itok=CfXWZnyK'}} style={styles.imgcar}></Image>
            <Text>Brigadeiro</Text>
            <Text>R$ 0,85 /cada</Text>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Valor total: </Text>
                <Text style={styles.fieldData}>109,54</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Quantidade: </Text>
                <Text style={styles.fieldData}>95</Text>
            </View>
        </View>
        <View style={styles.textEachRequest}>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Nome do cliente: </Text>
                <Text style={styles.fieldData}>Rui Barbosa</Text>
            </View>
            <Image
            source={{ uri: 'https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/1a884bcbc5b04d71476d2995d51d0140.webp?itok=CfXWZnyK'}} style={styles.imgcar}></Image>
            <Text>Brigadeiro</Text>
            <Text>R$ 0,85 /cada</Text>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Valor total: </Text>
                <Text style={styles.fieldData}>109,54</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Quantidade: </Text>
                <Text style={styles.fieldData}>95</Text>
            </View>
        </View>
        <View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Entregador Encontrado: </Text>
                <Text style={styles.fieldData}>Neymar Messi</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Placa do veículo: </Text>
                <Text style={styles.fieldData}>*************</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Idade: </Text>
                <Text style={styles.fieldData}>98</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>E-mail: </Text>
                <Text style={styles.fieldData}>cr7@cr7.com</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.buyBtn} onPress={() => finalizarPedido()}>
                <Text>FINALIZAR PEDIDO</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    boxContainer: {
        alignItens: 'center',
    },
    textBody: {
        width: 350,
        alignItems: 'center',
    },
    imgcar: {
        height: 100,
        width: 100,
        borderRadius: 180,
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
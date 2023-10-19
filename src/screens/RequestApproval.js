import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'

export default function RequestApproval({ navigation: {navigate}}) {
    function recusarPedido() {
        alert('Pedido recusado com sucesso')
        navigate('Home')
    }
    function aceitarPedido() {
        alert('Pedido aceito com sucesso')
        navigate('Home')
    }
    return(
        <ScrollView>
            <SafeAreaView>
                <View style={styles.requestBody}>
            <Image
            source={{ uri: 'https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/1a884bcbc5b04d71476d2995d51d0140.webp?itok=CfXWZnyK'}} style={styles.imgcar}></Image>
            <View style={styles.two}>
            <View style={styles.nameAndData}>
                <Text>Brigadeiro</Text>
                <Text style={styles.fieldName}>Nome do cliente: Rui Barbosa</Text>
                {/* <Text style={styles.fieldData}>Rui Barbosa</Text> */}
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Valor total: 109,54</Text>
                {/* <Text style={styles.fieldData}>109,54</Text> */}
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Quantidade: 95</Text>
                {/* <Text style={styles.fieldData}>95</Text> */}
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Entregador: Neymar Messi</Text>
                {/* <Text style={styles.fieldData}>Neymar Messi</Text> */}
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Placa do veículo: ********</Text>
                {/* <Text style={styles.fieldData}>********</Text> */}
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Idade: 98</Text>
                {/* <Text style={styles.fieldData}>98</Text> */}
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>E-mail: cr7@messi.com</Text>{/* 
                <Text style={styles.fieldData}>cr7@messi.com</Text> */}
            </View>
            </View>
            </View>
            </SafeAreaView>
            <Text></Text><Text></Text>
            <SafeAreaView>
                <View style={styles.requestBody}>
            <Image
            source={{ uri: 'https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/1a884bcbc5b04d71476d2995d51d0140.webp?itok=CfXWZnyK'}} style={styles.imgcar}></Image>
            <View style={styles.two}>
            <View style={styles.nameAndData}>
                <Text>Brigadeiro</Text>
                <Text style={styles.fieldName}>Nome do cliente: Rui Barbosa</Text>
                {/* <Text style={styles.fieldData}>Rui Barbosa</Text> */}
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Valor total: 109,54</Text>
                {/* <Text style={styles.fieldData}>109,54</Text> */}
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Quantidade: 95</Text>
                {/* <Text style={styles.fieldData}>95</Text> */}
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Entregador: Neymar Messi</Text>
                {/* <Text style={styles.fieldData}>Neymar Messi</Text> */}
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Placa do veículo: ********</Text>
                {/* <Text style={styles.fieldData}>********</Text> */}
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Idade: 98</Text>
                {/* <Text style={styles.fieldData}>98</Text> */}
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>E-mail: cr7@messi.com</Text>{/* 
                <Text style={styles.fieldData}>cr7@messi.com</Text> */}
            </View>
            </View>
            </View>
            </SafeAreaView>
            <TouchableOpacity style={styles.acceptBtn} onPress={() => aceitarPedido()}>
                <Text>ACEITAR PEDIDO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.refuseBtn} onPress={() => recusarPedido()}>
                <Text>RECUSAR PEDIDO</Text>
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
        backgroundColor: '#0BDE6E',
    },
    refuseBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        width: '100%',
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 5,
        backgroundColor: '#F01D06',
    },
    requestBody: {
        flexDirection: 'row'
    }
})
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'

export default function DeliveryNotice({ navigation: {navigate}}) {
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
                <Text style={styles.dePara}>
                De: Machado Doces - Rua da Gente - Próspera - Criciúma
                </Text>
                <Text style={styles.dePara}>
                Para: Rui Barbosa - Rua da Satc - Pinheirinho - Criciúma
                </Text>
            </View>
            </View>
            </SafeAreaView>
            <Text></Text><Text></Text>
            <SafeAreaView>
            <View style={styles.requestBody}>
            <Image
            source={{ uri: 'https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/1a884bcbc5b04d71476d2995d51d0140.webp?itok=CfXWZnyK'}} style={styles.imgcar}></Image>
            <View style={styles.two}>
                <Text style={styles.dePara}>
                De: Machado Doces - Rua da Gente - Próspera - Criciúma
                </Text>
                <Text style={styles.dePara}>
                Para: Rui Barbosa - Rua da Satc - Pinheirinho - Criciúma
                </Text>
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
    },
    dePara: {
        width: 250,
        marginLeft: 10,
        marginTop: 10,
    }
})
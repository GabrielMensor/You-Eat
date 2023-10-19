import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native'

export default function ModelProductEntrepreneur({navigation: {navigate} }) {
    return(
        <ScrollView style={styles.container}>
            <View style={styles.productHead}>
                <Image
                    source={{ uri: 'https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/1a884bcbc5b04d71476d2995d51d0140.webp?itok=CfXWZnyK'}} style={styles.imgcar}></Image>
                <Text style={styles.title}>Brigadeiros de chocolate</Text>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1860/1860115.png'}} style={styles.imgpen}></Image>
            </View>
            <Text style={styles.title}>R$ 0,85</Text>
            <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1860/1860115.png'}} style={styles.imgpen}></Image>
            <View style={styles.descriptionNameAndData}>
                    <Text style={styles.descriptionName}>Descrição do produto: </Text><Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1860/1860115.png'}} style={styles.imgpen}></Image>
                    <Text style={styles.descriptionDataFront}>A tradicional receita brasileira, feita por de forma artesal, a partir de uma receita familiar
Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate rem aperiam, at magnam ex explicabo cumque fuga eius pariatur veniam inventore deleniti laudantium officiis, dicta amet eum facere quod libero.</Text>
            </View>
            <View style={styles.entrepreneurData}>
            <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1860/1860115.png'}} style={styles.imgpen}></Image>
            <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>Produzidos: </Text>
                    <Text style={styles.fieldData}>800</Text>
                </View>
                <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>Encomendados: </Text>
                    <Text style={styles.fieldData}>150</Text>
                </View>
                <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>Saldo do estoque: </Text>
                    <Text style={styles.fieldData}>+650</Text>
                </View>
                <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>Necessário: </Text>
                    <Text style={styles.fieldData}>0</Text>
                </View>
                </View>
                <TouchableOpacity style={styles.buyBtn} onPress={() => navigate('Cart')}>
                    <Text>ADICIONAR AO CARRINHO</Text>
            </TouchableOpacity>
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
        backgroundColor: '#0BDE6E',
    },
    entrepreneurData: {
        flexDirection: 'column',
        height: 200,
        borderWidth: 2,
        marginTop: 5,
        padding: 9,
    },
    imgpen: {
        height: 30,
        width: 30,
    }
})
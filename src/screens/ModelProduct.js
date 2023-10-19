import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native'

export default function ModelProduct({navigation: {navigate} }) {
    return(
        <ScrollView style={styles.container}>
            <View style={styles.productHead}>
                <Image
                    source={{ uri: 'https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/1a884bcbc5b04d71476d2995d51d0140.webp?itok=CfXWZnyK'}} style={styles.imgcar}></Image>
                <Text style={styles.title}>Brigadeiros de chocolate</Text>
            </View>
            <Text style={styles.title}>R$ 0,85</Text>
            <TouchableOpacity style={styles.buyBtn} onPress={() => navigate('Cart')}>
                    <Text>ADICIONAR AO CARRINHO</Text>
            </TouchableOpacity>
            <View style={styles.descriptionNameAndData}>
                    <Text style={styles.descriptionName}>Descrição do produto: </Text>
                    <Text style={styles.descriptionDataFront}>A tradicional receita brasileira, feita por de forma artesal, a partir de uma receita familiar
Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate rem aperiam, at magnam ex explicabo cumque fuga eius pariatur veniam inventore deleniti laudantium officiis, dicta amet eum facere quod libero.</Text>
            </View>
            <View style={styles.entrepreneurData}>
            <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>Empreendedor: </Text>
                    <Text style={styles.fieldData}>José Maria Machado de Assis</Text>
                </View>
                <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>E-mail: </Text>
                    <Text style={styles.fieldData}>machado@machado.com</Text>
                </View>
                <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>Bairro: </Text>
                    <Text style={styles.fieldData}>Brasilia</Text>
                </View>
                <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>Cidade: </Text>
                    <Text style={styles.fieldData}>Criciuma</Text>
                </View>
                <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>Estado: </Text>
                    <Text style={styles.fieldData}>SC</Text>
                </View>
                <View style={styles.nameAndData}>
                    <Text style={styles.fieldName}>Há: </Text>
                    <Text style={styles.fieldData}>6 anos no YouCook</Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => navigate('ModelEntrepreneur')}>
                    <Text>Ver empreendedor</Text>
                </TouchableOpacity>
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
        backgroundColor: '#0BDE6E',
    },
    entrepreneurData: {
        flexDirection: 'column',
        height: 300,
        borderWidth: 2,
        marginTop: 5,
        padding: 9,
    }
})
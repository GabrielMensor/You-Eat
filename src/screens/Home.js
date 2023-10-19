import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default function Home({ navigation: { navigate } }) {
    return(
    <View style={styles.container}>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
            <TouchableOpacity style={styles.btnicon}>
                <Icon name="cart" size={38} style={{marginRight: 12}} onPress={() => navigate('Cart')}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnicon} onPress={() => navigate('ModelDeliveryman')}>
                <Icon name="person-circle" size={38} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnicon} onPress={() => navigate('ProductRegistration')}>
                <Icon name="ios-add" size={38} />
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.elemento} onPress={() => navigate('ModelProduct')}>
            <Image
            source={{ uri: 'https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/1a884bcbc5b04d71476d2995d51d0140.webp?itok=CfXWZnyK'}} style={styles.imgcar}></Image>
            <Text>Brigadeiro</Text>
            <Text>R$ 0,85 /cada</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.elemento} onPress={() => navigate('ModelProduct')}>
            <Image
            source={{ uri: 'https://www.estadao.com.br/resizer/zjfGdDFfV39WAkH3VZU0VfbOr1w=/720x503/filters:format(jpg):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/estadao/OYMESDUUBVJJDBXTFC4YD253O4.jpg'}} style={styles.imgcar}></Image>
            <Text>Pastel</Text>
            <Text>R$ 6,00 /cada</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.elemento} onPress={() => navigate('ModelProduct')}>
            <Image
            source={{ uri: 'https://cocina-casera.com/wp-content/uploads/2018/03/torta-de-chocolate.jpg'}} style={styles.imgcar}></Image>
            <Text>Bolos caseiros</Text>
            <Text>R$ 45,00 /kg</Text>
        </TouchableOpacity>
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
        height: 100,
        width: 100,
    },
    elemento: {
        flex: 1,
        justifyContent: 'center',
        width: 120,
        height: 190,
    },
    btnicon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 38,
        width: 38,
        borderWidth: 1,
    }
});
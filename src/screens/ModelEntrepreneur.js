import { View, StyleSheet, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'  // tirar posteriormente

export default function ModelEmtrepreneur({ navigation: { navigate } }) {
    return(
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Icon name="person-circle" size={250} style={styles.imgperfil}/>
        </View>
        <View style={styles.textBody}>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Nome: </Text>
                <Text style={styles.fieldData}>Machado Doces</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Descrição: </Text>
                <Text style={styles.fieldData}>Vendemos doces, desde de simples e tortas e deixamos um livro por mais R$5,00</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>CNPJ: </Text>
                <Text style={styles.fieldData}>************</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>E-mail: </Text>
                <Text style={styles.fieldData}>machado@machado.com</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Senha: </Text>
                <Text style={styles.fieldData}>FAZER ALTERAR SENHA</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Rua: </Text>
                <Text style={styles.fieldData}>Rua da Gente</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Bairro: </Text>
                <Text style={styles.fieldData}>Próspera</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Cidade: </Text>
                <Text style={styles.fieldData}>Criciúma(select)</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Estado: </Text>
                <Text style={styles.fieldData}>SC(select)</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>País: </Text>
                <Text style={styles.fieldData}>Brasil(select)</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Desde: </Text>
                <Text style={styles.fieldData}>31/09/2021</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Número do cartão: </Text>
                <Text style={styles.fieldData}>***************</Text>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 100,
        borderWidth: 1,
    },
    iconContainer: {
        width: 250,
        marginLeft: 14,
        justifyContent: "space-between",
    },
    nameAndData: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: 200,
        marginRight: 20,
    }
});
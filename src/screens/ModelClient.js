import { View, StyleSheet, Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'  // tirar posteriormente

export default function ModelClient({ navigation: { navigate } }) {
    return(
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Icon name="person-circle" size={250} style={styles.imgperfil}/>
        </View>
        <View style={styles.textBody}>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Nome: </Text>
                <Text style={styles.fieldData}>Rui Barbosa</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>CPF: </Text>
                <Text style={styles.fieldData}>************</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>E-mail: </Text>
                <Text style={styles.fieldData}>rui@rui.com</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Senha: </Text>
                <Text style={styles.fieldData}>FAZER ALTERAR SENHA</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Rua: </Text>
                <Text style={styles.fieldData}>Rua da Satc</Text>
            </View>
            <View style={styles.nameAndData}>
                <Text style={styles.fieldName}>Bairro: </Text>
                <Text style={styles.fieldData}>Universitário</Text>
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
                <Text style={styles.fieldName}>Data de Nascimento: </Text>
                <Text style={styles.fieldData}>31/02/2023</Text>
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
    }
});
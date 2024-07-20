import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'

export default function Verification({ navigation: {navigate}}) {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Insira o código de verificação</Text>
            <Text style={styles.txt}>
            Verifique a caixa de entrada de seu e-mail e insira o código de verificação no espaço abaixo para a criação da sua conta
            </Text>
            <TextInput placeholder='Insira o código' style={styles.input}></TextInput>
            <TouchableOpacity style={styles.buyBtn}>
                <Text>Verificar código de confirmação</Text>
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
        fontSize: 15,
        width: 300,
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
        height: 58,
        width: 313,
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 150,
    },
})
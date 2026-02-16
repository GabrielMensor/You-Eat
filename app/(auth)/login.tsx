import { View, Text, StyleSheet } from "react-native"
import Screen from "@/components/layout/Screen";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input"
import { colors } from "@/constants/colors"
import React from "react";

export default function Login() {
    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.title}>Entrar</Text>

                <Input placeholder="Email" />
                <Input placeholder="Senha" secureTextEntry />

                <Button title="Entrar" />
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: colors.text,
    }
})
import { View, Text, StyleSheet } from "react-native"
import Screen from "@/components/layout/Screen"
import Input from "@/components/ui/Input"
import React from "react"
import Button from "@/components/ui/Button"
import TextLink from "@/components/ui/TextLink";
import { colors } from "@/constants/colors"

export default function Register() {
    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.title}>Criar conta</Text>

                <Input placeholder="Email" />
                <Input placeholder="Senha" secureTextEntry />

                <Button title="Criar conta" />

                <TextLink href="/(auth)/login">
                    Já tem conta? Faça login!
                </TextLink>
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
    },
})
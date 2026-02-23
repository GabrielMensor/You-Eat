import { View, Text, StyleSheet } from "react-native"
import Screen from "@/components/layout/Screen";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input"
import TextLink from "@/components/ui/TextLink";
import { colors } from "@/constants/colors"
import { useState } from "react";
import React from "react"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function handleLogin() {
        if (!email || !password) {
            setError('Preencha todos os campos')
            return
        }

        if (!email.includes('@')) {
            setError('Email inválido')
            return
        }

        setError('')
        console.log('Login válido')
    }
    return (
        <Screen>
            <View style={styles.container}>
                <Text style={styles.title}>Entrar</Text>

                <Input placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    />

                <Input placeholder="Senha"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                />

                {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

                <Button title="Entrar" />

                <TextLink href="/(auth)/register">
                    Não possui conta? Crie agora!
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
import { TextInput, StyleSheet } from "react-native"
import { colors } from "@/constants/colors"
import React from "react"

type Props = {
    placeholder?: string
    secureTextEntry?: boolean
}

export default function Input({ placeholder, secureTextEntry }: Props) {
    return (
        <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.card,
        padding: 14,
        borderRadius: 12,
        color: colors.text,
    }
})